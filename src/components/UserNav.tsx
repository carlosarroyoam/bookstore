"use client";

import { useRouter } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const logOutFn = async () => {
  const device_fingerprint = localStorage.getItem("device_fingerprint");

  await axios.post("/auth/logout", {
    device_fingerprint,
  });
};

const UserNav = () => {
  const { session, destroySession } = useAuth();
  const router = useRouter();
  const { mutate: logOut } = useMutation({
    mutationFn: logOutFn,
    onSuccess: () => {
      destroySession();
      router.refresh();
      router.push("/auth/login");
    },
  });

  if (!session.isAuth) return <Skeleton className="size-10 rounded-full" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-10 rounded-full">
          <Avatar className="size-10">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${session.first_name}+${session.last_name}`}
              alt={`${session.first_name}'s profile picture`}
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm leading-none">{session.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
