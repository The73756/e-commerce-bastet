import { create } from 'zustand';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { Product, ProductInfo, Rating } from '@/types/product';

export interface ProductResponse {
  rows: Product[];
  count: number;
}

interface SingleProductResponse extends Product {
  info: ProductInfo[];
  ratings: Rating[];
}

interface ProductStore {
  products: Product[];
  currentProduct: SingleProductResponse | null;
  count: number;
  isLoading: boolean;
  error: string | null;

  getAllProducts: (params?: {
    brandId?: number;
    typeId?: number;
    limit?: number;
    page?: number;
    search?: string;
    sort?: string;
    order?: 'ASC' | 'DESC';
  }) => Promise<ApiReturn<ProductResponse>>;

  setProducts: (products: Product[]) => void;

  getOneProduct: (id: number) => Promise<ApiReturn<SingleProductResponse>>;

  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  currentProduct: null,
  count: 0,
  isLoading: false,
  error: null,

  getAllProducts: async (params = {}) => {
    set({ isLoading: true, error: null });

    const queryString = Object.entries(params)
      .filter(([_, value]) => value != null)
      .reduce((params, [key, value]) => {
        params.append(key, value!.toString());
        return params;
      }, new URLSearchParams());

    const { success, data, error } = await apiInstance<ProductResponse>(
      `/product${queryString.toString()}`,
      {
        method: 'GET',
      },
    );

    if (success && data) {
      set({
        products: data.rows,
        count: data.count,
        isLoading: false,
      });
      return { success, data, error };
    }

    set({ error: error?.message, isLoading: false });
    return { success, data, error };
  },

  getOneProduct: async (id) => {
    set({ isLoading: true, error: null });
    const { success, data, error } = await apiInstance<SingleProductResponse>(
      `/product/${id}`,
      {
        method: 'GET',
      },
    );

    if (success && data) {
      set({
        currentProduct: data,
        isLoading: false,
      });
      return { success, data, error };
    }

    set({ error: error?.message, isLoading: false });
    return { success, data, error };
  },

  setProducts: (products: Product[]) => {
    set({ products });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
