import { create } from "zustand";
import { ReactNode } from "react";

export type Stat = {
  title: string;
  count: number;
  icon: ReactNode;
  color?: string; // optional color for icon
};

interface DashboardStore {
  stats: Stat[];
  setStats: (data: Stat[]) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: [],
  setStats: (data: Stat[]) => set({ stats: data }),
}));
