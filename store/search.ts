import { create } from 'zustand';


interface SearchStore {
  term?: string;

  setSearchTerm(term: string): void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  term: '',

  setSearchTerm: (term: string) => {
    set({ term });
  },
}));
