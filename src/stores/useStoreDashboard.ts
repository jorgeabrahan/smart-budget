import { create } from 'zustand';

interface Store {
  idSelectedAccount: number | null;
  filters: {
    idTags: number[];
    year: number | null;
  };
  setIdSelectedAccount: (idSelectedAccount: number | null) => void;
  setFilters: (filters: { idTags?: number[]; year?: number | null }) => void;
}

export const useStoreDashboard = create<Store>((set) => ({
  idSelectedAccount: null,
  filters: {
    idTags: [],
    year: null
  },
  setIdSelectedAccount: (idSelectedAccount) => set({ idSelectedAccount }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } }))
}));
