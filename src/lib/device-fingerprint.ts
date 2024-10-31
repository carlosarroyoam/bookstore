import { v4 as uuidv4 } from "uuid";

import { getItem, setItem } from "@/lib/local-storage";

const DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME = "device-fingerprint";

export function getDevicefingerprint() {
  if (!getItem(DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME)) {
    setItem(DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME, uuidv4());
  }

  return getItem(DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME) as string;
};
