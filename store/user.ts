import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { apiInstance } from '@/api/api-instance';
import { setCookie } from '@/lib/cookie';

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
    (set, get) => ({
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
        // set({ isLoading: true });
        // try {
        //   const { token } = get();
        //   if (!token) throw new Error('No token');
        //
        //   const response = await fetch('/api/user/check', {
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        //
        //   if (!response.ok) throw new Error('Not authorized');
        //
        //   const { token: newToken, user }: AuthResponse = await response.json();
        //   set({ user, isAuth: true, token: newToken });
        // } catch (err) {
        //   set({ user: null, isAuth: false, token: null });
        // } finally {
        //   set({ isLoading: false });
        // }
      },

      logout: () => {
        // set({ user: null, isAuth: false, token: null });
      },

      updateUser: async (id, updateData) => {
        // set({ isLoading: true, error: null });
        // try {
        //   const { token } = get();
        //   const response = await fetch(`/api/user/${id}`, {
        //     method: 'PATCH',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: `Bearer ${token}`,
        //     },
        //     body: JSON.stringify(updateData),
        //   });
        //
        //   if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(errorData.message || 'Update failed');
        //   }
        //
        //   const { token: newToken, user }: AuthResponse = await response.json();
        //   set({ user, token: newToken });
        // } catch (err) {
        //   set({ error: err instanceof Error ? err.message : 'Update error' });
        // } finally {
        //   set({ isLoading: false });
        // }
      },

      // Удаление аккаунта
      deleteUser: async (id) => {
        // set({ isLoading: true, error: null });
        // try {
        //   const { token } = get();
        //   const response = await fetch(`/api/user/${id}`, {
        //     method: 'DELETE',
        //     headers: { Authorization: `Bearer ${token}` },
        //   });
        //
        //   if (!response.ok) throw new Error('Delete failed');
        //
        //   set({ user: null, isAuth: false, token: null });
        // } catch (err) {
        //   set({ error: err instanceof Error ? err.message : 'Delete error' });
        // } finally {
        //   set({ isLoading: false });
        // }
      },

      // Вспомогательные методы
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
