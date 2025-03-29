import { REQUEST_STATUS } from '@/lib/constants/requests';
import { TypeRequestStatus } from '@/lib/types/Request';
import { TypeTagsRegistry } from '@/lib/types/Tables';
import { create } from 'zustand';

interface Store {
  tags: TypeTagsRegistry[];
  requestStatus: TypeRequestStatus;
  setTags: (tags: TypeTagsRegistry[]) => void;
  addTag: (tag: TypeTagsRegistry) => void;
  removeTag: (id: number) => void;
  setRequestStatus: (requestStatus: TypeRequestStatus) => void;
  reset: () => void;
}
const INITIAL_STATE = {
  tags: [],
  requestStatus: REQUEST_STATUS.notStarted
};
export const useStoreTags = create<Store>((set) => ({
  ...INITIAL_STATE,
  setTags: (tags) =>
    set({
      tags,
      requestStatus: REQUEST_STATUS.success
    }),
  addTag: (tag) =>
    set((state) => ({
      tags: [tag, ...state.tags]
    })),
  removeTag: (id) =>
    set((state) => ({
      tags: state.tags.filter((t) => t.id !== id)
    })),
  setRequestStatus: (requestStatus) =>
    set({
      requestStatus
    }),
  reset: () =>
    set({
      tags: [],
      requestStatus: REQUEST_STATUS.notStarted
    })
}));
