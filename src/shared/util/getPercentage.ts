export const getPercentage = (current: number, total: number) => {
  return Math.min((current / total) * 100, 100).toFixed(0);
}