import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import UsersTable from "@/components/users-table";

export default function Home() {
  return (
    <section>
      <div className="flex gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A list of all the users registered including their name, email, and
            role.
          </p>
        </div>

        <Button>
          Add user
          <PlusIcon className="ml-2 size-4" />
        </Button>
      </div>

      <div className="mt-6">
        <UsersTable />
      </div>
    </section>
  );
}
