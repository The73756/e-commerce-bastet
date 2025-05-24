import { create } from 'zustand';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { persist } from 'zustand/middleware';
import { FavoriteProduct } from '@/types/favorite';

interface FavoriteStore {
  items: FavoriteProduct[];
  isLoading: boolean;
  error: string | null;
  currentFavoriteId: number | null;

  addToFavorite: (productId: number) => Promise<ApiReturn<FavoriteProduct>>;
  getFavoriteItems: (
    favoriteId: number,
  ) => Promise<ApiReturn<FavoriteProduct[]>>;
  removeFromFavorite: (id: number) => Promise<ApiReturn<{ message: string }>>;
  setFavoriteItems: (products: FavoriteProduct[]) => void;

  setCurrentFavoriteId: (id: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  clearFavorite: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      currentFavoriteId: null,

      setCurrentFavoriteId: (id) => {
        set({ currentFavoriteId: id });
      },

      addToFavorite: async (productId) => {
        set({ isLoading: true, error: null });
        const { currentFavoriteId } = get();

        if (!currentFavoriteId) {
          set({ error: 'Не авторизован', isLoading: false });
          return { success: false, error: 'Не авторизован' };
        }

        const { success, data, error } = await apiInstance<FavoriteProduct>(
          '/favorite',
          {
            method: 'POST',
            body: { productId, favoriteId: currentFavoriteId },
          },
        );

        if (success && data) {
          set((state) => ({
            items: [...state.items, data],
            isLoading: false,
          }));
          return { success, data, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, data, error };
      },

      getFavoriteItems: async (favoriteId) => {
        set({ isLoading: true, error: null });

        const { success, data, error } = await apiInstance<FavoriteProduct[]>(
          `/favorite/${favoriteId}`,
          {
            method: 'GET',
          },
        );

        if (success && data) {
          set({
            items: data,
            currentFavoriteId: favoriteId,
            isLoading: false,
          });
          return { success, data, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, data, error };
      },

      setFavoriteItems: (products: FavoriteProduct[]) => {
        set({ items: products });
      },

      removeFromFavorite: async (id) => {
        set({ isLoading: true, error: null });

        const { success, error } = await apiInstance<{ message: string }>(
          `/favorite/${id}`,
          {
            method: 'DELETE',
          },
        );

        if (success) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            isLoading: false,
          }));
          return { success, data: { message: 'Товар удален' }, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, data: null, error };
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      clearFavorite: () => set({ items: [], currentFavoriteId: null }),
    }),
    {
      name: 'favorite-storage',
      partialize: (state) => ({
        items: state.items,
        currentFavoriteId: state.currentFavoriteId,
      }),
    },
  ),
);
