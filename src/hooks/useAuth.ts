import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_role_id?: number;
  user_role?: string;
};

type AuthState = {
  session: User & { isAuth: boolean };
  saveSession: (user: User) => void;
  destroySession: () => void;
};

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
