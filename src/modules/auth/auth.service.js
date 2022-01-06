import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function login({ email, password }) {
  try {
    const response = await apiClient.post('/auth/login', {
      body: {
        email,
        password,
      },
    });

    const userDetails = response.data.data;

    return userDetails;
  } catch (err) {
    throw err;
  }
}
