<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@entities/auth/model/store";
import { useOrderStore } from "@entities/order/model/store";
import { COMPLETED_ORDER_STATUS } from "@entities/order/type/type";
import { useConfirm } from "@shared/ui/confirm/useConfirm";
import { useMessage } from "@shared/ui/message/useMessage";

const MONTHS: Record<string, number> = {
  января: 0,
  февраля: 1,
  марта: 2,
  апреля: 3,
  мая: 4,
  июня: 5,
  июля: 6,
  августа: 7,
  сентября: 8,
  октября: 9,
  ноября: 10,
  декабря: 11,
};

type SortKey = "address" | "date";
type SortDir = "asc" | "desc";

const orderStore = useOrderStore();
const authStore = useAuthStore();
const { getOrdersList, getIsLoading } = storeToRefs(orderStore);
const { getCurrentUserIsAdmin } = storeToRefs(authStore);
const { confirm } = useConfirm();
const { showMessage } = useMessage();

const sortKey = ref<SortKey | null>(null);
const sortDir = ref<SortDir>("asc");

const parseOrderDate = (value: string) => {
  const [day, month, year] = value.trim().split(/\s+/);
  const monthIndex = MONTHS[month];
  const parsed = new Date(Number(year), monthIndex, Number(day)).getTime();
  return Number.isFinite(parsed) && monthIndex !== undefined
    ? parsed
    : Number.NaN;
};

const compareOrders = (left: string, right: string, key: SortKey) => {
  if (key === "address") {
    return left.localeCompare(right, "ru");
  }

  const leftDate = parseOrderDate(left);
  const rightDate = parseOrderDate(right);

  if (Number.isNaN(leftDate) || Number.isNaN(rightDate)) {
    return left.localeCompare(right, "ru");
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

const completeOrder = async (id: number) => {
  if (!getCurrentUserIsAdmin.value) {
    return;
  }

  const isSuccess = await orderStore.completeOrder(id);
  showMessage(isSuccess ? "Заказ выполнен" : "Не удалось выполнить заказ");
};

const deleteOrder = async (id: number) => {
  if (!getCurrentUserIsAdmin.value) {
    return;
  }

  const isConfirmed = await confirm({
    title: "Удаление заказа",
    text: "Удалить этот заказ?",
    confirmText: "Удалить",
  });

  if (!isConfirmed) {
    return;
  }

  const isSuccess = await orderStore.deleteOrder(id);
  showMessage(isSuccess ? "Заказ удалён" : "Не удалось удалить заказ");
};

onMounted(() => {
  orderStore.fetchOrders();
});
</script>

<template>
  <section class="orders">
    <p v-if="getIsLoading" class="orders__status">Загрузка заказов...</p>
    <p v-else-if="!getOrdersList.length" class="orders__status">
      Заказы не найдены
    </p>
    <table v-else class="orders__table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>
            <button
              class="orders__sort"
              type="button"
              @click="toggleSort('address')"
            >
              Адрес
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
              Дата
              <span v-if="sortIndicator('date')" class="orders__sort-icon">{{
                sortIndicator("date")
              }}</span>
            </button>
          </th>
          <th>Статус</th>
          <th>Комментарий</th>
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
          <td>{{ order.date }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.comment }}</td>
          <td v-if="getCurrentUserIsAdmin" class="orders__actions-col">
            <div class="orders__actions">
              <button
                v-if="!isCompleted(order.status)"
                class="orders__action orders__action--complete"
                type="button"
                aria-label="Выполнить заказ"
                @click="completeOrder(order.id)"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M6.4 11.2 3.2 8l1.1-1.1 2.1 2.1 5.3-5.3 1.1 1.1z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                class="orders__action orders__action--delete"
                type="button"
                aria-label="Удалить заказ"
                @click="deleteOrder(order.id)"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M4.2 3.1 3.1 4.2 6.9 8l-3.8 3.8 1.1 1.1L8 9.1l3.8 3.8 1.1-1.1L9.1 8l3.8-3.8-1.1-1.1L8 6.9z"
                    fill="currentColor"
                  />
                </svg>
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

.orders__table tbody tr.orders__row--done {
  opacity: 0.65;
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

.orders__action svg {
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
