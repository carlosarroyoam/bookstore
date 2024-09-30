import { v4 as uuidv4 } from "uuid";

const DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME = "device-fingerprint";

export function getDevicefingerprint() {
  if (!localStorage.getItem(DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME)) {
    localStorage.setItem(DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME, uuidv4());
  }

  return localStorage.getItem(DEVICE_FINGERPRINT_LOCAL_STORAGE_KEY_NAME);
}
