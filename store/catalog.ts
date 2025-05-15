import { create } from 'zustand';
import { CatalogTypesResponse } from '@/api/catalog';

export interface BrandSchema {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TypeSchema {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  brands: BrandSchema[];
}

interface CatalogStore {
  catalog?: CatalogTypesResponse | null;
  selectedBrand?: BrandSchema | null;

  setCatalogTypes(types?: CatalogTypesResponse | null): void;
  getType(typeId: string): TypeSchema | undefined;
  setSelectedBrand(brand?: BrandSchema | null): void;
}

export const useCatalogStore = create<CatalogStore>()((set, get) => ({
  catalog: null,

  setCatalogTypes: (catalog?: null | CatalogTypesResponse) => {
    set({ catalog });
  },

  getType: (typeId: string) => {
    return get().catalog?.rows.find((item) => item.id === Number(typeId));
  },

  setSelectedBrand: async (brand?: BrandSchema | null) => {
    set({ selectedBrand: brand });
  },
}));
