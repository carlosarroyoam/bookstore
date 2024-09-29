import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types/User";

type SessionData = Partial<User> & {
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
