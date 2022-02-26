import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJSb2xlIjoiQXBwL0FkbWluIiwiaWF0IjoxNjQ1ODI0NDY3LCJleHAiOjE2NDU4MjgwNjcsImlzcyI6Im5vZGVqc19hcGkifQ.9mD79l6Nb7IVsrwO_N04r58Hnpqlpc4x7XShVJww-y8';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function getAll({ skip = 0, limit = 100, sort, status, search }) {
  try {
    const response = await apiClient.get('/users', {
      params: {
        skip,
        limit,
        sort,
        status,
        search,
      },
    });

    const users = response.data.data;

    return users;
  } catch (err) {
    if (err.response.status === 401) return Promise.reject(err.response.data.message);

    if (err.response.status === 403) return Promise.reject(err.response.data.message);

    if (err.response.status === 422) return Promise.reject(err.response.data.message);

    if (err.response.status === 500) return Promise.reject(err.response.data.message);

    return Promise.reject('Error while retrieving user');
  }
}

export async function getById({ userId }) {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    const userById = response.data.data;

    return userById;
  } catch (err) {
    if (err.response.status === 401) return Promise.reject(err.response.data.message);

    if (err.response.status === 403) return Promise.reject(err.response.data.message);

    if (err.response.status === 404) return Promise.reject(err.response.data.message);

    if (err.response.status === 422) return Promise.reject(err.response.data.message);

    if (err.response.status === 500) return Promise.reject(err.response.data.message);

    return Promise.reject('Error while retrieving user');
  }
}
