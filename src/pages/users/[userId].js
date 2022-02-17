import Head from 'next/head';
import Link from 'next/link';
import { getById } from '../../modules/users/user.service';

function UserDetails({ user }) {
  return (
    <>
      <Head>
        <title>User details</title>
      </Head>
      <Link href={'/'}>
        <a className="text-sm font-medium text-blue-400 hover:text-blue-700">Volver atras</a>
      </Link>

      <h1 className="text-2xl tracking-wide text-gray-900">
        {user.first_name} {user.last_name}
      </h1>

      <p className="text-base text-gray-700">{user.email}</p>
      <p className="text-base text-gray-700">{user.user_role.replace('App/', '')}</p>
    </>
  );
}

UserDetails.getInitialProps = async (context) => {
  const { userId } = context.query;

  const user = await getById({ userId });

  return { user };
};

export default UserDetails;
