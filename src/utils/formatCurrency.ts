export default function formatCurrency(
  value: string | undefined | null
): string {
  if (!value) return 'Неизвестно';
  const numberValue = parseFloat(value.replace(/\D/g, ''));

  if (isNaN(numberValue)) return 'Неизвестно';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(numberValue);
}
