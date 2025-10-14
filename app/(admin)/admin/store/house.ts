// store/houseStore.ts
import { create } from "zustand";

export interface Society {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface House {
  id: number;
  houseNumber: string;
  societyId: number;
  address: string;
  isAllocated: boolean;
  society?: Society;
}

interface HouseStore {
  houses: House[];
  loading: boolean;
  error: string | null;
  form: Partial<House>;
  isEditing: boolean;

  setHouses: (houses: House[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setForm: (form: Partial<House>) => void;
  setIsEditing: (editing: boolean) => void;
  resetForm: () => void;
}

export const useHouseStore = create<HouseStore>((set) => ({
  houses: [],
  loading: false,
  error: null,
  isEditing: false,
  form: {
    houseNumber: "",
    societyId: undefined,
    address: "",
    isAllocated: false,
  },
  setHouses: (houses) => set({ houses }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setForm: (form) => set({ form }),
  setIsEditing: (isEditing) => set({ isEditing }),
  resetForm: () =>
    set({
      form: {
        houseNumber: "",
        societyId: undefined,
        address: "",
        isAllocated: false,
      },
      isEditing: false,
    }),
}));
