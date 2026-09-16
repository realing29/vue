const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const formatOrderDate = (date = new Date()) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS_GENITIVE[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
