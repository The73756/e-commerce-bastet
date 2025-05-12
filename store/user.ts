import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { apiInstance } from '@/api/api-instance';
import { deleteCookie, setCookie } from '@/lib/cookie';

interface UserStore {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;

  registration: (userData: Omit<User, 'id' | 'role'>) => Promise<void>;

  login: (credentials: { email: string; password: string }) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => void;
  updateUser: (id: number, updateData: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;

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
        try {
          set({ isLoading: true, error: null });
          const { success, data, error } = await apiInstance<{
            token: string;
            user: User;
          }>('/user/registration', {
            method: 'POST',
            body: userData,
          });
          if (success && data) {
            set({ user: data.user, isAuth: true });
            await setCookie('token', data.token);
          }
          if (error) {
            set({
              error: error.message,
            });
          }
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'failed' });
        } finally {
          set({ isLoading: false });
        }
      },

      login: async ({ email, password }) => {
        try {
          set({ isLoading: true, error: null });
          const { success, data, error } = await apiInstance<{
            token: string;
            user: User;
          }>('/user/login', {
            method: 'POST',
            body: { email, password },
          });
          if (success && data) {
            set({ user: data.user, isAuth: true });
            await setCookie('token', data.token);
          }
          if (error) {
            set({
              error: error.message,
            });
          }
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Login failed' });
        } finally {
          set({ isLoading: false });
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true, error: null });

          const { success, data, error } = await apiInstance<{
            token: string;
            user: User;
          }>('/user/auth', {
            method: 'GET',
          });

          if (success && data) {
            set({ user: data.user, isAuth: true });
            await setCookie('token', data.token);
          }
          if (error) {
            set({
              error: error.message,
            });
          }
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'failed' });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ user: null, isAuth: false });
        await deleteCookie('token');
      },

      updateUser: async (id, updateData) => {
        try {
          set({ isLoading: true, error: null });
          const { success, data, error } = await apiInstance<{
            token: string;
            user: User;
          }>(`/user/${id}`, {
            method: 'PATCH',
            body: updateData,
          });
          if (success && data) {
            set({ user: data.user, isAuth: true });
            await setCookie('token', data.token);
          }
          if (error) {
            set({
              error: error.message,
            });
          }
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'failed' });
        } finally {
          set({ isLoading: false });
        }
      },

      deleteUser: async (id) => {
        try {
          set({ isLoading: true, error: null });
          const { success, error } = await apiInstance<{
            token: string;
            user: User;
          }>(`/user/${id}`, {
            method: 'DELETE',
          });
          if (success) {
            set({ user: null, isAuth: false });
            await deleteCookie('token');
          }
          if (error) {
            set({
              error: error.message,
            });
          }
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'failed' });
        } finally {
          set({ isLoading: false });
        }
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
