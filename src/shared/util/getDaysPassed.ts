export const getDaysPassed = (startDate: Date | null | string, endDate: Date | null | string) => {
  
  if (startDate === null || endDate === null) return "Not started";
  
  if (startDate instanceof Date && endDate instanceof Date) {
    return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  } else {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start instanceof Date && end instanceof Date) {
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    }
  }
}