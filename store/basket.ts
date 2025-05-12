import { create } from 'zustand';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { BasketProduct } from '@/types/basket';
import { persist } from 'zustand/middleware';

interface BasketStore {
  items: BasketProduct[];
  isLoading: boolean;
  error: string | null;
  currentBasketId: number | null;

  addToBasket: (productId: number) => Promise<ApiReturn<BasketProduct>>;
  updateBasketItem: (
    id: number,
    count: number,
  ) => Promise<ApiReturn<{ message: string }>>;
  getBasketItems: (basketId: number) => Promise<ApiReturn<BasketProduct[]>>;
  removeFromBasket: (id: number) => Promise<ApiReturn<{ message: string }>>;
  clearBasket: () => void;
  setBasketItems: (products: BasketProduct[]) => void;

  setCurrentBasketId: (id: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentBasket: (basketId: number) => void;
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      currentBasketId: null,

      setCurrentBasketId: (basketId: number) => {
        set({ currentBasketId: basketId });
      },

      addToBasket: async (productId) => {
        set({ isLoading: true, error: null });
        const { currentBasketId } = get();

        if (!currentBasketId) {
          set({ error: 'Не авторизован', isLoading: false });
          return { success: false, error: 'Не авторизован' };
        }

        const { success, data, error } = await apiInstance<BasketProduct>(
          '/basket',
          {
            method: 'POST',
            body: { productId, basketId: currentBasketId },
          },
        );

        if (success && data) {
          set((state) => ({
            items: [...state.items, data],
            isLoading: false,
          }));
          return { success, data };
        }

        set({ error: error?.message, isLoading: false });
        return { success, error };
      },

      updateBasketItem: async (id, count) => {
        set({ isLoading: true, error: null });

        const { success, error } = await apiInstance<{ message: string }>(
          `/basket/${id}`,
          {
            method: 'PATCH',
            body: { count },
          },
        );

        if (success) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, count } : item,
            ),
            isLoading: false,
          }));
          return { success, data: { message: 'Количество обновлено' }, error };
        }

        set({ error: error?.message, isLoading: false });
        return { success, error };
      },

      getBasketItems: async (basketId) => {
        set({ isLoading: true, error: null });

        const { success, data, error } = await apiInstance<BasketProduct[]>(
          `/basket/${basketId}`,
          {
            method: 'GET',
          },
        );

        if (success && data) {
          set({
            items: data,
            currentBasketId: basketId,
            isLoading: false,
          });
          return { success, data };
        }

        set({ error: error?.message, isLoading: false });
        return { success, error };
      },

      setBasketItems: (products: BasketProduct[]) => {
        set({ items: products });
      },

      removeFromBasket: async (id) => {
        set({ isLoading: true, error: null });

        const { success, error } = await apiInstance<{ message: string }>(
          `/basket/${id}`,
          {
            method: 'DELETE',
          },
        );

        if (success) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
            isLoading: false,
          }));
          return { success, data: { message: 'Товар удален' } };
        }

        set({ error: error?.message, isLoading: false });
        return { success, error };
      },

      clearBasket: () => set({ items: [] }),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setCurrentBasket: (basketId) => set({ currentBasketId: basketId }),
    }),
    {
      name: 'basket-storage',
      partialize: (state) => ({
        items: state.items,
        currentBasketId: state.currentBasketId,
      }),
    },
  ),
);
