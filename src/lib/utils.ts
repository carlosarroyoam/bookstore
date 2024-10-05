import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | number | Date) {
  const formatOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("es-MX", formatOptions).format(new Date(date));
}

export function formatTime(date: string | number | Date) {
  const formatOptions = {
    timeStyle: "short",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("es-MX", formatOptions).format(new Date(date));
}
