export interface UsersResponse {
  message: string;
  users: User[];
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_role_id: number;
  user_role: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
