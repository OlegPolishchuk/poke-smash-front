export interface User {
  id: string;
  username?: string;
  email?: string;
  avatar?: string;
  password: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}
