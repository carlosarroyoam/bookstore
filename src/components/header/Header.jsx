import { LogoutIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

export default function Header() {
  const { logOut, isAuthenticated } = useContext(AuthContext);

  const handleLogOutButtonClick = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100">
      <header className="container h-16 flex items-center">
        <Link href={'/'} className="text-lg uppercase font-medium text-gray-800">
          e-commerce dashboard
        </Link>

        {isAuthenticated && (
          <button
            className="ml-auto flex items-center px-6 py-2 rounded font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 ease-in border border-gray-300"
            onClick={handleLogOutButtonClick}
          >
            <span className="uppercase">Log out</span>
            <LogoutIcon className="h-5 w-5 ml-3 text-current" />
          </button>
        )}
      </header>
    </div>
  );
}
