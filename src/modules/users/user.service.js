import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJSb2xlIjoiQXBwL0FkbWluIiwiaWF0IjoxNjQ1OTI1MDIyLCJleHAiOjE2NDU5Mjg2MjIsImlzcyI6ImUtY29tbWVyY2UifQ.3t9qwwXwutvPk1A2ogpc8BQO94IlSOaxoE4qnEMV3m0';

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
