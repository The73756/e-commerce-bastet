import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { deleteCookie, setCookie } from '@/lib/cookie';

interface AuthResponse {
  token: string;
  user: User;
}

interface UserStore {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;

  registration: (
    userData: Omit<User, 'id' | 'role'>,
  ) => Promise<ApiReturn<AuthResponse>>;

  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<ApiReturn<AuthResponse>>;
  checkAuth: () => Promise<ApiReturn<AuthResponse>>;
  logout: () => void;
  updateUser: (
    id: number,
    updateData: Partial<User>,
  ) => Promise<ApiReturn<AuthResponse>>;
  deleteUser: (id: number) => Promise<Omit<ApiReturn<AuthResponse>, 'data'>>;

  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      isLoading: false,
      error: null,
      token: null,

      registration: async (userData) => {
        set({ isLoading: true, error: null });
        const { success, data, error } = await apiInstance<AuthResponse>(
          '/user/registration',
          {
            method: 'POST',
            body: userData,
          },
        );

        if (success && data) {
          await setCookie('token', data.token);
          set({ isLoading: false, user: data.user, isAuth: true });
          return { success, data, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, data, error };
      },

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        const { success, data, error } = await apiInstance<AuthResponse>(
          '/user/login',
          {
            method: 'POST',
            body: { email, password },
          },
        );

        if (success && data) {
          await setCookie('token', data.token);
          set({ isLoading: false, user: data.user, isAuth: true });
          return { success, data, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, data, error };
      },

      checkAuth: async () => {
        set({ isLoading: true, error: null });
        const { success, data, error } = await apiInstance<AuthResponse>(
          '/user/auth',
          {
            method: 'GET',
          },
        );

        if (success && data) {
          await setCookie('token', data.token);
          set({ isLoading: false, user: data.user, isAuth: true });
          return { success, data, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, data, error };
      },

      logout: async () => {
        set({ user: null, isAuth: false });
        await deleteCookie('token');
      },

      updateUser: async (id, updateData) => {
        set({ isLoading: true, error: null });
        const { success, data, error } = await apiInstance<AuthResponse>(
          `/user/${id}`,
          {
            method: 'PATCH',
            body: updateData,
          },
        );

        if (success && data) {
          await setCookie('token', data.token);
          set({ isLoading: false, user: data.user, isAuth: true });
          return { success, data, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, data, error };
      },

      deleteUser: async (id) => {
        set({ isLoading: true, error: null });
        const { success, error } = await apiInstance<AuthResponse>(
          `/user/${id}`,
          {
            method: 'DELETE',
          },
        );

        if (success) {
          set({ isLoading: false, user: null, isAuth: false });
          await deleteCookie('token');
          return { success, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, error };
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuth: state.isAuth,
      }),
    },
  ),
);
