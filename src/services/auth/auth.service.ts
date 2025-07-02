import { AuthApi } from '@/api/auth/auth.api.ts';

export const AuthService = {
  getMe() {
    return AuthApi.getMe();
  },
};
