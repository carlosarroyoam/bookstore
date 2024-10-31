import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: string | number | Date) => {
  const formatOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("es-MX", formatOptions).format(new Date(date));
};

export const formatTime = (date: string | number | Date) => {
  const formatOptions = {
    timeStyle: "short",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("es-MX", formatOptions).format(new Date(date));
};
