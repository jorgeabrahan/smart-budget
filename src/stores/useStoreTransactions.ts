import { REQUEST_STATUS } from '@/lib/constants/requests';
import { TypeRequestStatus } from '@/lib/types/Request';
import { TypeTransactionsRegistry } from '@/lib/types/Tables';
import { create } from 'zustand';

export interface TypeTransactionsFilters {
  idAccount: number | null;
  idTags: number[];
  year: number | null;
}

interface Store {
  transactions: TypeTransactionsRegistry[];
  requestStatus: TypeRequestStatus;
  filters: {
    idAccount: number | null;
    idTags: number[];
    year: number | null;
  };
  setTransactions: (transactions: TypeTransactionsRegistry[]) => void;
  addTransaction: (transaction: TypeTransactionsRegistry) => void;
  updateTransaction: (transaction: TypeTransactionsRegistry) => void;
  removeTransaction: (id: number) => void;
  setRequestStatus: (requestStatus: TypeRequestStatus) => void;
  setFilters: (filters: Partial<TypeTransactionsFilters>) => void;
}
const INITIAL_STATE = {
  transactions: [],
  filters: {
    idAccount: null,
    idTags: [],
    year: null
  },
  currentYear: new Date().getFullYear(),
  requestStatus: REQUEST_STATUS.notStarted
};
export const useStoreTransactions = create<Store>((set) => ({
  ...INITIAL_STATE,
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateTransaction: (transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      )
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id)
    })),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    }),
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters
      }
    }))
}));
