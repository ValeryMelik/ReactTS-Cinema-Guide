export default function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let result = '';
  if (hours > 0) {
    result += `${hours}\u00A0ч`;
  }
  if (remainingMinutes > 0) {
    result += `${hours > 0 ? '\u00A0' : ''}${remainingMinutes}\u00A0мин`;
  }

  return result || '0\u00A0мин';
}
