import apiClient from '../../shared/lib/axios';

export async function login({ email, password, device_fingerprint }) {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
      device_fingerprint,
    });

    const userDetails = response.data.data;

    return userDetails;
  } catch (err) {
    throw err;
  }
}

export async function refreshToken({ device_fingerprint }) {
  try {
    const response = await apiClient.post('/auth/refresh-token', {
      device_fingerprint,
    });

    const userDetails = response.data.data;

    return userDetails;
  } catch (err) {
    throw err;
  }
}

export async function logout({ device_fingerprint }) {
  try {
    await apiClient.post('/auth/logout', {
      device_fingerprint,
    });
  } catch (err) {
    throw err;
  }
}
