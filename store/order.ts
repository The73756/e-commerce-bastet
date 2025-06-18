import { create } from 'zustand';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { Order, OrderType } from '@/types/order';
import { BasketProduct } from '@/types/basket';

interface OrderStore {
  orderTypes: OrderType[] | null;
  orders: Order[] | null;
  isLoading: boolean;
  error: string | null;

  setOrders: (orders: Order[]) => void;
  getAllOrderTypes: () => Promise<ApiReturn<OrderType[]>>;
  getAllOrdersOfUser: (userId: number) => Promise<ApiReturn<Order[]>>;
  createOrder: (orderData: {
    userId: number;
    orderTypeId: number;
    orderStatusId: number;
    price: number;
    street: string;
    house: string;
    appartament: string;
    intercom: boolean;
    phone: string;
    comment?: string;
    date: Date;
    time: string;
    products: BasketProduct[];
  }) => Promise<ApiReturn<Order>>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderStore>()((set) => ({
  orderTypes: null,
  orders: null,
  isLoading: true,
  error: null,

  setOrders: (orders: Order[]) => {
    set({
      orders: orders,
    });
  },

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

  getAllOrdersOfUser: async (userId) => {
    set({ isLoading: true, error: null });

    const { success, data, error } = await apiInstance<Order[]>(
      `/order/user-orders/${userId}`,
      {
        method: 'GET',
      },
    );

    if (success && data) {
      set({
        orders: data,
        isLoading: false,
      });
      return { success, data, error };
    }

    set({ error: error?.message, isLoading: false });
    return { success, data, error };
  },

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });

    const { success, data, error } = await apiInstance<Order>('/order', {
      method: 'POST',
      body: { ...orderData, products: JSON.stringify(orderData.products) },
    });

    if (success && data) {
      set((state) => ({
        orders: [...(state.orders || []), data],
        isLoading: false,
      }));

      return { success, data, error };
    }

    set({ error: error?.message, isLoading: false });
    return { success, data, error };
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
