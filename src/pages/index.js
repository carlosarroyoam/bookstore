import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAll } from '../modules/users/user.service';
import { formatToDate, formatToTime } from '../shared/utils/dates.util';

function UserList() {
  const [orderBy, setOrderBy] = useState('first_name');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleNameButtonClick = () => {
    setOrderBy((currentValue) => {
      if (currentValue === 'first_name') setOrderBy('-first_name');
      else setOrderBy('first_name');
    });
  };

  const handleEmailButtonClick = () => {
    setOrderBy((currentValue) => {
      if (currentValue === 'email') setOrderBy('-email');
      else setOrderBy('email');
    });
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        setStatus('idle');
        const users = await getAll({ sort: orderBy });

        setTimeout(() => {
          setUsers(users);
          setStatus('resolved');
        }, 100);
      } catch (err) {
        setError(err);
        setStatus('rejected');
      }
    }

    fetchUsers();
  }, [orderBy]);

  if (status === 'idle') {
    return 'loading...';
  }

  if (status === 'rejected') {
    return error;
  }

  if (status === 'resolved') {
    if (users?.length === 0) {
      return "there's no users";
    }

    return (
      <>
        <Head>
          <title>Users</title>
        </Head>

        <table>
          <tr>
            <th />
            <th>
              NAME
              <button onClick={handleNameButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                  />
                </svg>
              </button>
            </th>
            <th>
              EMAIL
              <button onClick={handleEmailButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                  />
                </svg>
              </button>
            </th>
            <th>ROLE</th>
            <th>REGISTERED</th>
            <th>STATUS</th>
            <th>EDIT</th>
          </tr>

          <tbody>
            {users?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Image
                      height="48px"
                      width="48px"
                      src={`https://ui-avatars.com/api/?name=${user.first_name}\s${user.last_name}&format=svg`}
                      alt={`${user.first_name}'s profile picture'`}
                    ></Image>
                  </td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.user_role.replace('App/', '')}</td>
                  <td>
                    {formatToDate(user.created_at)} a las {formatToTime(user.created_at)}
                  </td>
                  <td>{user.deleted_at !== null ? 'Inactive' : 'Active'}</td>
                  <td>
                    <Link href={`/users/${user.id}`}>Edit</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default UserList;
