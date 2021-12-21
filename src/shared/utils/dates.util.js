import { DateTime } from 'luxon';

export function formatToDate(date) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE);
}

export function formatToTime(date) {
  const formatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h12',
  };

  return DateTime.fromISO(date).toLocaleString(formatOptions);
}
