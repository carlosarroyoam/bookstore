import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from '@heroicons/react/solid';
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

        setUsers(users);
        setStatus('resolved');
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

        <h1 className="text-2xl text-gray-900 font-semibold mt-10">Users</h1>

        <div className="flex flex-col mt-8">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="flex align-middle px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        NAME
                        <button className="ml-auto" onClick={handleNameButtonClick}>
                          {orderBy === 'first_name' ? (
                            <ArrowNarrowUpIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ArrowNarrowDownIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        EMAIL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        ROLE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        REGISTERED
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                              <div className="flex-shrink-0 h-10 w-10">
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  height="48px"
                                  width="48px"
                                  src={`https://ui-avatars.com/api/?name=${user.first_name}\s${user.last_name}&format=svg`}
                                  alt={`${user.first_name}'s profile picture'`}
                                ></Image>{' '}
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
                              <Link href={`mailto:${user.email}`}>
                                <a className="text-sm font-medium text-blue-400 hover:text-blue-700">
                                  {user.email}
                                </a>
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className=" text-sm text-gray-500">
                              {user.user_role.replace('App/', '')}{' '}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className=" text-sm text-gray-500">
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
                            <Link href={`/users/${user.id}`}>
                              <a className="text-sm font-medium text-blue-400 hover:text-blue-700">
                                Edit
                              </a>
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

export default UserList;
