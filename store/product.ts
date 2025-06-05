import { create } from 'zustand';
import { apiInstance, ApiReturn } from '@/api/api-instance';
import { Product, ProductInfo, Rating } from '@/types/product';

export interface ProductGroup {
  id: number;
  name: string;
  products: Product[];
}

export interface ProductResponse {
  rows: Product[];
  count: number;
}

export interface SingleProductResponse extends Product {
  info: ProductInfo[];
  ratings: Rating[];
}

interface ProductStore {
  products: Product[];
  productGroups: ProductGroup[];
  currentProduct: SingleProductResponse | null;
  count: number;
  isLoading: boolean;
  error: string | null;
  activeTypeId?: string | null;

  getAllProducts: (params?: {
    brandId?: string | number | null;
    typeId?: string | number | null;
    limit?: number;
    page?: number;
    search?: string | null;
    sort?: string;
    order?: 'ASC' | 'DESC';
  }) => Promise<ApiReturn<ProductResponse>>;

  setProducts: (products: Product[]) => void;

  getOneProduct: (id: number) => Promise<ApiReturn<SingleProductResponse>>;
  setProductGroups: (products: ProductGroup[]) => void;

  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setActiveTypeId: (id?: string | null) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  productGroups: [],
  currentProduct: null,
  count: 0,
  isLoading: true,
  error: null,
  activeTypeId: null,

  getAllProducts: async (params = {}) => {
    set({ isLoading: true, error: null });

    const queryString = Object.entries(params)
      .filter(([_, value]) => value != null)
      .reduce((params, [key, value]) => {
        params.append(key, value!.toString());
        return params;
      }, new URLSearchParams());

    if (!params.hasOwnProperty('limit')) {
      queryString.append('limit', '40');
    }

    const { success, data, error } = await apiInstance<ProductResponse>(
      `/product?${queryString.toString()}`,
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

  setProductGroups: (productGroups: ProductGroup[]) => {
    set({ productGroups });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setActiveTypeId: (activeTypeId?: string | null) => set({ activeTypeId }),
}));
