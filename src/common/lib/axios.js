import axios from 'axios';
import { parseCookies } from 'nookies';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  withCredentials: true,
  baseURL,
});

apiClient.interceptors.request.use(createAxiosResponseInterceptor());

function createAxiosResponseInterceptor() {
  const interceptor = apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { device_fingerprint } = parseCookies();

      //TODO add validation for error with no response and request different of login
      // Reject promise if usual error
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      apiClient.interceptors.response.eject(interceptor);

      return apiClient
        .post('/auth/refresh-token', {
          device_fingerprint,
        })
        .then((response) => {
          return apiClient(error.response.config);
        })
        .catch((error) => {
          this.router.push('/login');
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
}

export default apiClient;
