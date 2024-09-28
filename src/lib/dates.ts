export function formatToDate(date: string | number | Date) {
  const formatOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("es-MX", formatOptions).format(new Date(date));
}

export function formatToTime(date: string | number | Date) {
  const formatOptions = {
    timeStyle: "short",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("es-MX", formatOptions).format(new Date(date));
}
