import { create } from "zustand";

interface AdminStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activePath: string;
  setActivePath: (path: string) => void;
  notifications: number;
  setNotifications: (count: number) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  activePath: "",
  setActivePath: (path) => set({ activePath: path }),
  notifications: 5,
  setNotifications: (count) => set({ notifications: count }),
}));
