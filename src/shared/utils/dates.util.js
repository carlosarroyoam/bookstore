export function formatToDate(date) {
  const formatOptions = {
    dateStyle: 'long',
  };

  return new Intl.DateTimeFormat('es-MX', formatOptions).format(new Date(date));
}

export function formatToTime(date) {
  const formatOptions = {
    timeStyle: 'short',
    hour12: true,
  };

  return new Intl.DateTimeFormat('es-MX', formatOptions).format(new Date(date));
}
