import { create } from "zustand";

export interface House {
  id: number;
  houseNumber: string;
  address: string;
  isAllocated: boolean;
}

export interface SellHouseReport {
  id: number;
  houseId: number;
  sellPrice: number;
  buyerName: string;
  sellDate?: string;
  house?: House;
}

interface SellHouseStore {
  reports: SellHouseReport[];
  houses: House[];
  form: Partial<SellHouseReport>;
  editing: boolean;
  loading: boolean;
  error: string | null;

  setReports: (reports: SellHouseReport[]) => void;
  setHouses: (houses: House[]) => void;
  setForm: (form: Partial<SellHouseReport>) => void;
  setEditing: (editing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useSellHouseStore = create<SellHouseStore>((set) => ({
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
