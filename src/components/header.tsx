import Link from "next/link";

import UserNav from "@/components/user-nav";

const Header = async () => {
  return (
    <header className="border-b bg-muted py-4">
      <div className="container flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xl font-medium tracking-tight text-foreground hover:text-foreground/70"
        >
          e-commerce
        </Link>

        <UserNav />
      </div>
    </header>
  );
};

export default Header;
