import { create } from 'zustand';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { OrderType } from '@/types/order';

interface OrderStore {
  orderTypes: OrderType[] | null;
  isLoading: boolean;
  error: string | null;

  getAllOrderTypes: () => Promise<ApiReturn<OrderType[]>>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderStore>()((set) => ({
  orderTypes: null,
  isLoading: true,
  error: null,

  getAllOrderTypes: async () => {
    set({ isLoading: true, error: null });

    const { success, data, error } = await apiInstance<OrderType[]>(
      `/order-type`,
      {
        method: 'GET',
      },
    );

    if (success && data) {
      set({
        orderTypes: data,
        isLoading: false,
      });
      return { success, data, error };
    }

    set({ error: error?.message, isLoading: false });
    return { success, data, error };
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
