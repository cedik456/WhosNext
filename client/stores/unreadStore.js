import { create } from "zustand";

export const useUnreadStore = create((set, get) => ({
  byMatch: {},
  increment(matchId) {
    const cur = get().byMatch[matchId] || 0;
    set({ byMatch: { ...get().byMatch, [matchId]: cur + 1 } });
  },
  clear(matchId) {
    const next = { ...get().byMatch };
    delete next[matchId];
    set({ byMatch: next });
  },
  total() {
    return Object.values(get().byMatch).reduce((a, b) => a + b, 0);
  },
}));
