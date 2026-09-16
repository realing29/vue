export default {
  app: {
    title: "Заказы",
  },
  header: {
    allOrders: "Все заказы",
    addOrder: "Добавить заказ",
    logout: "Выйти",
    language: "Язык",
  },
  login: {
    loginPlaceholder: "Логин",
    passwordPlaceholder: "Пароль",
    submit: "Войти",
    authError: "Неверный логин\\пароль",
    passwordMinLength: "Пароль должен содержать не менее {min} символов",
  },
  orders: {
    loading: "Загрузка заказов...",
    empty: "Заказы не найдены",
    columns: {
      id: "ID",
      name: "Имя",
      address: "Адрес",
      date: "Дата",
      status: "Статус",
      comment: "Комментарий",
    },
    status: {
      new: "Новый",
      completed: "Выполнен",
    },
    actions: {
      complete: "Выполнить заказ",
      delete: "Удалить заказ",
    },
    messages: {
      completed: "Заказ выполнен",
      completeFailed: "Не удалось выполнить заказ",
      deleted: "Заказ удалён",
      deleteFailed: "Не удалось удалить заказ",
    },
    deleteConfirm: {
      title: "Удаление заказа",
      text: "Удалить этот заказ?",
      confirm: "Удалить",
    },
  },
  createOrder: {
    name: "Имя",
    address: "Адрес",
    comment: "Комментарий",
    submit: "Добавить заказ",
    required: "Обязательное поле",
    success: "Заказ добавлен",
    failed: "Не удалось добавить заказ",
  },
  confirm: {
    title: "Подтверждение",
    confirm: "Подтвердить",
    cancel: "Отмена",
  },
};
