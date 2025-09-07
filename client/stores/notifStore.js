// stores/notifStore.js
import { create } from "zustand";

export const useNotifStore = create((set) => ({
  count: 0,
  increment: (n = 1) => set((s) => ({ count: s.count + n })),
  reset: () => set({ count: 0 }),
}));
