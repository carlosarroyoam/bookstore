import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Header() {
  const { logOut } = useContext(AuthContext);

  const handleLogOutButtonClick = async () => {
    await logOut();
  };

  return (
    <header className="container mx-auto">
      <button className="ml-auto" onClick={handleLogOutButtonClick}>
        Log out
      </button>
    </header>
  );
}
