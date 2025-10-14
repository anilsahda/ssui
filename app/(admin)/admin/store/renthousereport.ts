// store/rentHouseStore.ts
import { create } from "zustand";

export interface House {
  id: number;
  houseNumber: string;
  address: string;
  isAllocated: boolean;
}

export interface RentHouseReport {
  id: number;
  houseId: number;
  rentAmount: number;
  tenantName: string;
  duration: string;
  rentStartDate: string;
  rentEndDate: string;
  renterName: string;
  house?: House;
}

interface RentHouseStore {
  reports: RentHouseReport[];
  houses: House[];
  form: Partial<RentHouseReport>;
  editing: boolean;
  loading: boolean;
  error: string | null;

  setReports: (reports: RentHouseReport[]) => void;
  setHouses: (houses: House[]) => void;
  setForm: (form: Partial<RentHouseReport>) => void;
  setEditing: (editing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useRentHouseStore = create<RentHouseStore>((set) => ({
  reports: [],
  houses: [],
  form: {},
  editing: false,
  loading: true,
  error: null,

  setReports: (reports) => set({ reports }),
  setHouses: (houses) => set({ houses }),
  setForm: (form) => set({ form }),
  setEditing: (editing) => set({ editing }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetForm: () => set({ form: {}, editing: false, error: null }),
}));
