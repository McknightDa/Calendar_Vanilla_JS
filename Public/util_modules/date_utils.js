export const getMonth = (month = new Date().getMonth() +1) => new Date(`${month}/1/2021`).toLocaleString('default', { month: 'long' });

export const getMonthDays = (month, year) => new Date(year, month, 0).getDate();