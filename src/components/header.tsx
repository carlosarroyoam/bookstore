import Link from "next/link";

import UserNav from "@/components/user-nav";

const Header = async () => {
  return (
    <header className="bg-gray-100 py-4">
      <div className="container flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xl font-medium tracking-tight text-gray-900 hover:text-gray-700"
        >
          e-commerce
        </Link>

        <UserNav />
      </div>
    </header>
  );
};

export default Header;
