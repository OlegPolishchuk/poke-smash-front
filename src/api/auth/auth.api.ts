import { api } from '@/api/instance.ts';
import type { User } from '@/entities/user/user.ts';

export const AuthApi = {
  async getMe() {
    try {
      const userRes = await api.get<User>('/api/auth/me');

      return userRes.data;
    } catch (err) {
      console.log('error =>', err);
      throw new Error(err as string);
    }
  },
};
