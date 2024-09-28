import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  user_id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_role_id?: number;
  user_role?: string;
};

type AuthState = {
  session: User & { isAuth: boolean };
  createSession: (user: User) => void;
  destroySession: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      session: { isAuth: false },
      createSession: (user: User) =>
        set(() => ({ session: { isAuth: true, ...user } })),
      destroySession: () => set(() => ({ session: { isAuth: false } })),
    }),
    {
      name: "e-commerce-session",
    },
  ),
);
