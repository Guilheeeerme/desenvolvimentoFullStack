const moneyFormmater = Intl.NumberFormat("pr-BR", {
  style: "currency",
  currency: "BRL",
});

const formatMoney = (value) => {
  return moneyFormmater.format(value);
};

const formatPercentage = (value) => {
  return `${value.toFixed(2).replace(".", ",")}%`;
};

export { formatMoney, formatPercentage };
