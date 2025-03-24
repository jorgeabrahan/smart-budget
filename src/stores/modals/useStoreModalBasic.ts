import { BASIC_MODALS } from '@/lib/constants/modals';
import { create } from 'zustand';

interface Store {
  modal: keyof typeof BASIC_MODALS | null;
  open: boolean;
  setOpen: (modal: keyof typeof BASIC_MODALS) => void;
  setClose: () => void;
}
export const useStoreModalBasic = create<Store>((set) => ({
  modal: null,
  open: false,
  setOpen: (modal) => set({ modal, open: true }),
  setClose: () => set({ open: false })
}));
