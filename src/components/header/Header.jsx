import { LogoutIcon } from '@heroicons/react/solid';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
export default function Header() {
  const { logOut, isAuthenticated } = useContext(AuthContext);

  const handleLogOutButtonClick = async () => {
    await logOut();
  };

  return (
    <header className="container">
      {isAuthenticated && (
        <button
          className="ml-auto flex items-center px-8 py-2 rounded font-medium text-sm bg-gray-200 text-gray-700"
          onClick={handleLogOutButtonClick}
        >
          <span className="uppercase">Log out</span>
          <LogoutIcon className="h-5 w-5 ml-3 text-current" />
        </button>
      )}
    </header>
  );
}
