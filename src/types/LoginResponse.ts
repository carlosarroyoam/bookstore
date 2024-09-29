import { User } from "@/types/User";

export interface LoginResponse {
  message: string;
  user: Pick<
    User,
    "id" | "email" | "first_name" | "last_name" | "user_role_id" | "user_role"
  >;
}
