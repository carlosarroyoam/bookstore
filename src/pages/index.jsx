import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { formatToDate, formatToTime } from '../common/utils/dates.util';
import * as userService from '../services/user.service';

export default function UserList() {
  const [orderBy, setOrderBy] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleNameButtonClick = () => {
    setOrderBy((currentValue) => {
      if (currentValue === 'first_name') setOrderBy('-first_name');
      else setOrderBy('first_name');
    });
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        setStatus('idle');
        const users = await userService.getAll({ sort: orderBy, status: userStatus });

        setUsers(users);
        setStatus('resolved');
      } catch (err) {
        setError(err);
        setStatus('rejected');
      }
    }

    fetchUsers();
  }, [orderBy, userStatus]);

  if (status === 'idle') {
    return (
      <>
        <Head>
          <title>Users</title>
        </Head>

        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">Loading...</h1>
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Head>
          <title>Users</title>
        </Head>

        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">Error: {error}</h1>
      </>
    );
  }

  if (status === 'resolved') {
    if (users?.length === 0) {
      return (
        <>
          <Head>
            <title>Users</title>
          </Head>

          <h1 className="text-2xl font-semibold tracking-wide text-gray-900">There is no users</h1>
        </>
      );
    }

    return (
      <>
        <Head>
          <title>Users</title>
        </Head>

        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">Users</h1>

        <div className="flex flex-col mt-8">
          <div className="-my-2 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="flex px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase align-middle">
                        NAME
                        <button className="ml-auto" onClick={handleNameButtonClick}>
                          {orderBy === 'first_name' ? (
                            <ArrowNarrowUpIcon className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ArrowNarrowDownIcon className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        EMAIL
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        ROLE
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        REGISTERED
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase">
                        STATUS
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {users?.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <Image
                                  className="w-10 h-10 rounded-full"
                                  height={48}
                                  width={48}
                                  src={`https://ui-avatars.com/api/?name=${user.first_name}\s${user.last_name}`}
                                  alt={`${user.first_name}'s profile picture'`}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-700">
                                  {user.first_name} {user.last_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              <Link
                                href={`mailto:${user.email}`}
                                className="text-sm font-medium text-blue-400 hover:text-blue-700"
                              >
                                {user.email}
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 ">
                              {user.user_role.replace('App/', '')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 ">
                              {formatToDate(user.created_at)} a las {formatToTime(user.created_at)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.deleted_at !== null
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {user.deleted_at !== null ? 'Inactive' : 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              href={`/users/${user.id}`}
                              className="text-sm font-medium text-blue-400 hover:text-blue-700"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const getServerSideProps = async (context) => {
  const { refresh_token } = parseCookies(context);

  if (!refresh_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
