import { getById } from '../../modules/users/user.service';

function UserDetails({ userById }) {
  return (
    <>
      <h2>User Details</h2>
      <p>
        {userById.first_name} {userById.last_name}
      </p>
      <p>{userById.email}</p>
      <p>{userById.user_role.replace('App/', '')}</p>
    </>
  );
}

UserDetails.getInitialProps = async (context) => {
  const { userId } = context.query;

  const userById = await getById({ userId });

  return { userById };
};

export default UserDetails;
