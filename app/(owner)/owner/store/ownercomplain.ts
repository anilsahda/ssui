// store/ownerComplainStore.ts
import { create } from "zustand";

interface Owner {
  id: number;
  name: string;
}

interface OwnerComplain {
  id: number;
  ownerId: number;
  content: string;
  createdAt?: string;
  owner?: Owner;
}

interface OwnerComplainStore {
  complains: OwnerComplain[];
  owners: Owner[];
  loading: boolean;
  error: string | null;
  form: Partial<OwnerComplain>;
  isEditing: boolean;

  setComplains: (complains: OwnerComplain[]) => void;
  setOwners: (owners: Owner[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setForm: (form: Partial<OwnerComplain>) => void;
  setIsEditing: (editing: boolean) => void;
  resetForm: () => void;
}

export const useOwnerComplainStore = create<OwnerComplainStore>((set) => ({
  complains: [],
  owners: [],
  loading: true,
  error: null,
  form: {},
  isEditing: false,

  setComplains: (complains) => set({ complains }),
  setOwners: (owners) => set({ owners }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setForm: (form) => set({ form }),
  setIsEditing: (isEditing) => set({ isEditing }),
  resetForm: () => set({ form: {}, isEditing: false, error: null }),
}));
