<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@entities/auth";
import {
  COMPLETED_ORDER_STATUS,
  formatOrderDateDisplay,
  parseOrderDate,
  useOrderStore,
} from "@entities/order";
import { useConfirm } from "@shared/ui/confirm";
import { useMessage } from "@shared/ui/message";
import { CheckIcon, CloseIcon } from "@shared/icons";

type SortKey = "address" | "date";
type SortDir = "asc" | "desc";

const { t, locale } = useI18n();
const orderStore = useOrderStore();
const authStore = useAuthStore();
const { getOrdersList, getIsLoading } = storeToRefs(orderStore);
const { getCurrentUserIsAdmin } = storeToRefs(authStore);
const { confirm } = useConfirm();
const { showMessage } = useMessage();

const sortKey = ref<SortKey | null>(null);
const sortDir = ref<SortDir>("asc");

watch(
  () => t("app.title"),
  (title) => {
    document.title = title;
  },
  { immediate: true },
);

const compareOrders = (left: string, right: string, key: SortKey) => {
  if (key === "address") {
    return left.localeCompare(right, locale.value);
  }

  const leftDate = parseOrderDate(left);
  const rightDate = parseOrderDate(right);

  if (Number.isNaN(leftDate) || Number.isNaN(rightDate)) {
    return left.localeCompare(right, locale.value);
  }

  return leftDate - rightDate;
};

const sortedOrders = computed(() => {
  const orders = [...getOrdersList.value];
  const currentKey = sortKey.value;

  if (!currentKey) {
    return orders;
  }

  const direction = sortDir.value === "asc" ? 1 : -1;

  return orders.sort((a, b) => {
    return compareOrders(a[currentKey], b[currentKey], currentKey) * direction;
  });
});

const toggleSort = (key: SortKey) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
    return;
  }

  sortKey.value = key;
  sortDir.value = "asc";
};

const sortIndicator = (key: SortKey) => {
  if (sortKey.value !== key) {
    return "";
  }

  return sortDir.value === "asc" ? "▲" : "▼";
};

const isCompleted = (status: string) => status === COMPLETED_ORDER_STATUS;

const statusLabel = (status: string) => {
  if (status === "new" || status === "completed") {
    return t(`orders.status.${status}`);
  }
  return status;
};

const displayDate = (value: string) => {
  return formatOrderDateDisplay(value, locale.value);
};

const completeOrder = async (id: number) => {
  if (!getCurrentUserIsAdmin.value) {
    return;
  }

  const isSuccess = await orderStore.completeOrder(id);
  showMessage(
    isSuccess
      ? t("orders.messages.completed")
      : t("orders.messages.completeFailed"),
  );
};

const deleteOrder = async (id: number) => {
  if (!getCurrentUserIsAdmin.value) {
    return;
  }

  const isConfirmed = await confirm({
    title: t("orders.deleteConfirm.title"),
    text: t("orders.deleteConfirm.text"),
    confirmText: t("orders.deleteConfirm.confirm"),
  });

  if (!isConfirmed) {
    return;
  }

  const isSuccess = await orderStore.deleteOrder(id);
  showMessage(
    isSuccess
      ? t("orders.messages.deleted")
      : t("orders.messages.deleteFailed"),
  );
};

onMounted(() => {
  orderStore.fetchOrders();
});
</script>

<template>
  <section class="orders">
    <p v-if="getIsLoading" class="orders__status">
      {{ t("orders.loading") }}
    </p>
    <p v-else-if="!getOrdersList.length" class="orders__status">
      {{ t("orders.empty") }}
    </p>
    <table v-else class="orders__table">
      <thead>
        <tr>
          <th>{{ t("orders.columns.id") }}</th>
          <th>{{ t("orders.columns.name") }}</th>
          <th>
            <button
              class="orders__sort"
              type="button"
              @click="toggleSort('address')"
            >
              {{ t("orders.columns.address") }}
              <span v-if="sortIndicator('address')" class="orders__sort-icon">{{
                sortIndicator("address")
              }}</span>
            </button>
          </th>
          <th>
            <button
              class="orders__sort"
              type="button"
              @click="toggleSort('date')"
            >
              {{ t("orders.columns.date") }}
              <span v-if="sortIndicator('date')" class="orders__sort-icon">{{
                sortIndicator("date")
              }}</span>
            </button>
          </th>
          <th>{{ t("orders.columns.status") }}</th>
          <th>{{ t("orders.columns.comment") }}</th>
          <th v-if="getCurrentUserIsAdmin" class="orders__actions-col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in sortedOrders"
          :key="order.id"
          :class="{ 'orders__row--done': isCompleted(order.status) }"
        >
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.address }}</td>
          <td>{{ displayDate(order.date) }}</td>
          <td>{{ statusLabel(order.status) }}</td>
          <td>{{ order.comment }}</td>
          <td v-if="getCurrentUserIsAdmin" class="orders__actions-col">
            <div class="orders__actions">
              <button
                v-if="!isCompleted(order.status)"
                class="orders__action orders__action--complete"
                type="button"
                :aria-label="t('orders.actions.complete')"
                @click="completeOrder(order.id)"
              >
                <CheckIcon />
              </button>
              <button
                class="orders__action orders__action--delete"
                type="button"
                :aria-label="t('orders.actions.delete')"
                @click="deleteOrder(order.id)"
              >
                <CloseIcon />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.orders__status {
  color: #555;
}

.orders__table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  color: #222;
}

.orders__table th,
.orders__table td {
  padding: 10px 12px;
  border: 1px solid #d0d0d0;
  text-align: left;
  background: #fff;
  color: #222;
}

.orders__table th {
  background: #f3f3f3;
  font-weight: 600;
}

.orders__sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.orders__sort-icon {
  font-size: 12px;
}

.orders__table tbody tr.orders__row--done td:not(.orders__actions-col) {
  background: #ececec;
  color: #888;
}

.orders__table th.orders__actions-col,
.orders__table td.orders__actions-col {
  width: 84px;
  padding: 0 8px;
  border: 0;
  background: transparent;
}

.orders__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  transition: opacity 0.15s ease;
}

.orders__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.orders__action :deep(svg) {
  width: 16px;
  height: 16px;
}

.orders__action--complete {
  color: #1f7a3a;
}

.orders__action--delete {
  color: #c0392b;
}

.orders__action:hover {
  background: #ececec;
}
</style>
