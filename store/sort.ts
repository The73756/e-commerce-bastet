import { create } from 'zustand';

export interface SortSchema {
  sort: string;
  order: 'ASC' | 'DESC';
  title: string;
}

interface SortStore {
  selectedSort?: SortSchema | null;
  selectedSortIndex: string;

  setSort(selectedSort?: SortSchema | null, selectedSortIndex?: string): void;
}

export const useSortStore = create<SortStore>()((set) => ({
  selectedSort: null,
  selectedSortIndex: '',

  setSort: (selectedSort?: SortSchema | null, selectedSortIndex?: string) => {
    set({ selectedSort, selectedSortIndex: selectedSortIndex || '' });
  },
}));
