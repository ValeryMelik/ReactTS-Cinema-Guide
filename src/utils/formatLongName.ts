export default function formatLongName(
  str: string,
  maxLength: number = 10
): string {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 1) + '...';
  }
  return str;
}
