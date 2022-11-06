import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { getById } from '../../services/user.service';

export default function UserDetails() {
  const { query } = useRouter();
  const [user, setUser] = useState(undefined);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        setStatus('idle');
        const user = await getById({ userId: query.userId });

        setUser(user);
        setStatus('resolved');
      } catch (err) {
        setError(err);
        setStatus('rejected');
      }
    }

    fetchUser();
  }, [query.userId]);

  if (status === 'idle') {
    return (
      <>
        <Head>
          <title>User details</title>
        </Head>

        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">Loading...</h1>
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Head>
          <title>User details</title>
        </Head>

        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">Error: {error}</h1>
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Head>
          <title>User details</title>
        </Head>

        <Link href={'/'} className="text-sm font-medium text-blue-400 hover:text-blue-700">
          Volver atras
        </Link>

        <h1 className="mt-8 text-2xl font-semibold tracking-wide text-gray-900">
          {user.first_name} {user.last_name}
        </h1>

        <p className="text-base text-gray-700">{user.email}</p>
        <p className="text-base text-gray-700">{user.user_role.replace('App/', '')}</p>
      </>
    );
  }
}

export const getServerSideProps = async (context) => {
  const { access_token } = parseCookies(context);

  if (!access_token) {
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
