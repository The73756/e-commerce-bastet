import { create } from 'zustand';

interface CatalogStore {
  loading: boolean;

  setLoading(load: boolean): void;
}

export const useLoadingStore = create<CatalogStore>()((set) => ({
  loading: true,

  setLoading: (load) => {
    set({ loading: load });
  },
}));
