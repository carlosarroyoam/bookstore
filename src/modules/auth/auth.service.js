import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1/auth',
});

export async function login({ email, password }) {
  try {
    const response = await apiClient.post('/login', {
      body: {
        email,
        password,
      },
    });

    const userDetails = response.data.data;

    return userDetails;
  } catch (err) {
    return err.response;
  }
}
