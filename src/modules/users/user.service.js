import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
    throw 'Error while retrieving users list';
  }
}

export async function getById({ userId }) {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    const userById = response.data.data;

    return userById;
  } catch (err) {
    throw 'Error while retrieving user';
  }
}
