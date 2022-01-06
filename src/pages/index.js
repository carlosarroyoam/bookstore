import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAll } from '../modules/users/user.service';
import { formatToDate, formatToTime } from '../shared/utils/dates.util';
import {
  Table,
  TableBody,
  TableHead,
  TableData,
  TableRow,
  TableHeader,
} from '../shared/components/table/Table';
import styled from 'styled-components';

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  vertical-align: middle;
  width: 50px;
  height: 50px;
`;

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
      return 'no users in system';
    }

    return (
      <>
        <Head>
          <title>Users</title>
        </Head>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>
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
              </TableHeader>
              <TableHeader>
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
              </TableHeader>
              <TableHeader>ROLE</TableHeader>
              <TableHeader>REGISTERED</TableHeader>
              <TableHeader>STATUS</TableHeader>
              <TableHeader>EDIT</TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableData>
                    <ProfilePicture
                      height="48px"
                      width="48px"
                      src={`https://ui-avatars.com/api/?name=${
                        user.first_name + ' ' + user.last_name
                      }&format=svg`}
                      alt={`${user.first_name}'s profile picture'`}
                    ></ProfilePicture>
                    {user.first_name} {user.last_name}
                  </TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.user_role.replace('App/', '')}</TableData>
                  <TableData>
                    {formatToDate(user.created_at)} a las {formatToTime(user.created_at)}
                  </TableData>
                  <TableData>{user.deleted_at !== null ? 'Inactive' : 'Active'}</TableData>
                  <TableData>
                    <Link href={`/users/${user.id}`}>Edit</Link>
                  </TableData>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default UserList;
