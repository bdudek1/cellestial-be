export const formatNumber = (value: any, decimalPlaces: number): number => {
  return parseFloat(value.toFixed(decimalPlaces));
};

export const formatDateTimestamp = (dateTimestamp: number): string => {
  const date = new Date(dateTimestamp);

  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return year + '-' + month + '-' + day;
};

export const findFirstGreaterDateIndex = (
  timeStamp: number,
  dates: string[],
): number | null => {
  for (let i = 0; i < dates.length; i++) {
    if (timeStamp < new Date(dates[i]).getTime()) {
      return i;
    }
  }

  return null;
};
