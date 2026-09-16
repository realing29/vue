<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useOrderStore } from "@entities/order/model/store";

const orderStore = useOrderStore();
const { getOrdersList, getIsLoading } = storeToRefs(orderStore);

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
          <th>Адрес</th>
          <th>Дата</th>
          <th>Статус</th>
          <th>Комментарий</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in getOrdersList" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.comment }}</td>
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

.orders__table tbody tr:nth-child(even) td {
  background: #f7f7f7;
}
</style>
