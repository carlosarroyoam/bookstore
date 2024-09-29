import Axios, { AxiosError } from "axios";

import { getDevicefingerprint } from "@/lib/device-fingerprint";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const deviceFingerprint = getDevicefingerprint();
    const status = error.response?.status;
    const originalRequest = error.config!;

    if (
      status !== 401 ||
      error.config?.url === "/auth/login" ||
      error.config?.url === "/auth/refresh-token"
    ) {
      return Promise.reject(error);
    }

    try {
      await axios.post("/auth/refresh-token", {
        device_fingerprint: deviceFingerprint,
      });

      return axios(originalRequest);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
      }
      window.location.href = "/auth/login";
      return Promise.reject(err);
    }
  },
);

export default axios;
