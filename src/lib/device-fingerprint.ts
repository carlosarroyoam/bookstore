import { v4 as uuidv4 } from "uuid";

const DEVICE_FINGERPRINT_KEY = "device-fingerprint";

export function getDevicefingerprint() {
  let deviceFingerprint = localStorage.getItem(DEVICE_FINGERPRINT_KEY);

  if (!deviceFingerprint) {
    localStorage.setItem(DEVICE_FINGERPRINT_KEY, uuidv4());
    deviceFingerprint = localStorage.getItem(DEVICE_FINGERPRINT_KEY);
  }

  return deviceFingerprint;
}
