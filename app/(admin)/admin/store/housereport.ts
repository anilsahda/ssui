// store/houseReportStore.ts
import { create } from "zustand";

export interface House {
  id: number;
  houseNumber: string;
  address: string;
  isAllocated: boolean;
}

export interface HouseReport {
  id: number;
  houseId: number;
  house?: House;
  reportDetails: string;
  reportDate: string;
}

interface HouseReportStore {
  reports: HouseReport[];
  loading: boolean;
  error: string | null;
  form: Partial<HouseReport>;
  isEditing: boolean;

  setReports: (reports: HouseReport[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setForm: (form: Partial<HouseReport>) => void;
  setIsEditing: (editing: boolean) => void;
  resetForm: () => void;
}

export const useHouseReportStore = create<HouseReportStore>((set) => ({
  reports: [],
  loading: false,
  error: null,
  isEditing: false,
  form: {
    houseId: undefined,
    reportDetails: "",
    reportDate: new Date().toISOString(),
  },
  setReports: (reports) => set({ reports }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setForm: (form) => set({ form }),
  setIsEditing: (isEditing) => set({ isEditing }),
  resetForm: () =>
    set({
      form: {
        houseId: undefined,
        reportDetails: "",
        reportDate: new Date().toISOString(),
      },
      isEditing: false,
    }),
}));
