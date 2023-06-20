import dayjs from 'dayjs';

export function formatLongDate(date: Date): string {
  return dayjs(date).format('MMM D, YYYY h:mm A');
}