export const getReadableDate = (date: string | null) => {
  if (!date) return "Not started yet";
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}