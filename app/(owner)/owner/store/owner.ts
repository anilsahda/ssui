// store/ownerStore.ts
import { create } from "zustand";

export interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface OwnerStore {
  owners: Owner[];
  form: Partial<Owner>;
  isEditing: boolean;
  loading: boolean;
  error: string | null;

  setOwners: (owners: Owner[]) => void;
  setForm: (form: Partial<Owner>) => void;
  setEditing: (editing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useOwnerStore = create<OwnerStore>((set) => ({
  owners: [],
  form: {},
  isEditing: false,
  loading: true,
  error: null,

  setOwners: (owners) => set({ owners }),
  setForm: (form) => set({ form }),
  setEditing: (isEditing) => set({ isEditing }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetForm: () => set({ form: {}, isEditing: false, error: null }),
}));
