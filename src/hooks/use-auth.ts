import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types/user";

type SessionData = Partial<
  Pick<
    User,
    "id" | "email" | "first_name" | "last_name" | "user_role_id" | "user_role"
  >
> & {
  isAuth: boolean;
};

interface AuthState {
  session: SessionData;
  saveSession: (user: User) => void;
  destroySession: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      session: { isAuth: false },
      saveSession: (user: User) =>
        set(() => ({ session: { ...user, isAuth: true } })),
      destroySession: () => set(() => ({ session: { isAuth: false } })),
    }),
    {
      name: "e-commerce-session",
    },
  ),
);
