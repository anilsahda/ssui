import { create } from "zustand";

export interface House {
  id: number;
  houseNumber: string;
  address: string;
  isAllocated: boolean;
}

export interface Member {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Complain {
  id: number;
  houseId: number;
  memberId?: number | null;
  description: string;
  complainDate: string;
  isResolved: boolean;
  house?: House;
  member?: Member;
}

interface ComplainStore {
  complains: Complain[];
  loading: boolean;
  error: string | null;
  form: Partial<Complain>;
  isEditing: boolean;

  setComplains: (data: Complain[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string | null) => void;
  setForm: (form: Partial<Complain>) => void;
  setIsEditing: (edit: boolean) => void;
  resetForm: () => void;
}

export const useComplainStore = create<ComplainStore>((set) => ({
  complains: [],
  loading: true,
  error: null,
  isEditing: false,
  form: {
    houseId: undefined,
    memberId: undefined,
    description: "",
    complainDate: new Date().toISOString(),
    isResolved: false,
  },
  setComplains: (complains) => set({ complains }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setForm: (form) => set({ form }),
  setIsEditing: (isEditing) => set({ isEditing }),
  resetForm: () =>
    set({
      form: {
        houseId: undefined,
        memberId: undefined,
        description: "",
        complainDate: new Date().toISOString(),
        isResolved: false,
      },
      isEditing: false,
    }),
}));
