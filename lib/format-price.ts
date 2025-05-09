export const formatPrice = (price: number) => {
  const numberPrice = Number(price);
  if (Number.isNaN(numberPrice)) return undefined;

  return numberPrice.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  });
};
