import { create } from "zustand";

export interface House {
  id: number;
  houseNumber: string;
  address: string;
  isAllocated: boolean;
}

export interface Society {
  id: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  location: string;
  houses?: House[];
}

interface SocietyStore {
  societies: Society[];
  form: Partial<Society>;
  editing: boolean;
  loading: boolean;
  error: string | null;

  setSocieties: (societies: Society[]) => void;
  setForm: (form: Partial<Society>) => void;
  setEditing: (editing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useSocietyStore = create<SocietyStore>((set) => ({
  societies: [],
  form: {},
  editing: false,
  loading: true,
  error: null,

  setSocieties: (societies) => set({ societies }),
  setForm: (form) => set({ form }),
  setEditing: (editing) => set({ editing }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetForm: () => set({ form: {}, editing: false, error: null }),
}));
