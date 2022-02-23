import Head from 'next/head';
import Link from 'next/link';
import { getById } from '../../modules/users/user.service';

function UserDetails({ user, error }) {
  if (!user)
    return (
      <>
        <h1 className="text-2xl font-semibold tracking-wide text-gray-900">{error}</h1>
      </>
    );

  return (
    <>
      <Head>
        <title>User details</title>
      </Head>

      <Link href={'/'}>
        <a className="text-sm font-medium text-blue-400 hover:text-blue-700">Volver atras</a>
      </Link>

      <h1 className="text-2xl font-semibold tracking-wide text-gray-900">
        {user.first_name} {user.last_name}
      </h1>

      <p className="text-base text-gray-700">{user.email}</p>
      <p className="text-base text-gray-700">{user.user_role.replace('App/', '')}</p>
    </>
  );
}

UserDetails.getInitialProps = async (context) => {
  try {
    const { userId } = context.query;

    const user = await getById({ userId });

    return {
      user,
    };
  } catch (error) {
    return {
      error,
    };
  }
};

export default UserDetails;
