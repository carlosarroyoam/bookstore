"use client";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/lib/axios";
import { formatToDate } from "@/lib/dates";
import { User, UsersResponse } from "@/types/User";

const getUsersFn = async () => {
  try {
    const {
      data: { users },
    } = await axios.get<UsersResponse>("/users");

    return users;
  } catch (error) {
    throw error;
  }
};

export default function Home() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsersFn(),
  });

  if (isLoading)
    return (
      <div>
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-2 h-5 w-96" />
        <Skeleton className="mt-6 h-96 w-full" />
      </div>
    );

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight">Users</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        A list of all the users registered including their name, email, and
        role.
      </p>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-8">
                <span className="sr-only">Profile picture</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Registered at</TableHead>
              <TableHead>Updated at</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length ? (
              users!.map((user: User) => (
                <TableRow key={user.user_id}>
                  <TableCell>
                    <Avatar className="size-8">
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${user.first_name}%20${user.last_name}`}
                        alt={`${user.first_name}'s profile picture`}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {user.first_name}&nbsp;{user.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.user_role.replace("App/", "")}</TableCell>
                  <TableCell>{formatToDate(user.created_at)}</TableCell>
                  <TableCell>{formatToDate(user.updated_at)}</TableCell>
                  <TableCell>
                    {user.deleted_at === null ? (
                      <Badge variant="secondary">Active</Badge>
                    ) : (
                      <Badge variant="destructive">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant={"secondary"} size={"icon"}>
                      <Pencil2Icon />
                    </Button>
                    <Button variant={"destructive"} size={"icon"}>
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
