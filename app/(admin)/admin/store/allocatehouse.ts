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

export interface AllocateHouse {
  id: number;
  houseId: number;
  memberId: number;
  allocationDate: string;
  releaseDate?: string;
  house?: House;
  member?: Member;
}

interface AllocateHouseStore {
  allocations: AllocateHouse[];
  houses: House[];
  members: Member[];
  formData: AllocateHouse;
  editingId: number | null;
  loading: boolean;

  setAllocations: (allocations: AllocateHouse[]) => void;
  setHouses: (houses: House[]) => void;
  setMembers: (members: Member[]) => void;
  setFormData: (form: AllocateHouse) => void;
  setEditingId: (id: number | null) => void;
  setLoading: (loading: boolean) => void;
  resetForm: () => void;
}

export const useAllocateHouseStore = create<AllocateHouseStore>((set) => ({
  allocations: [],
  houses: [],
  members: [],
  formData: {
    id: 0,
    houseId: 0,
    memberId: 0,
    allocationDate: new Date().toISOString().substring(0, 10),
    releaseDate: "",
  },
  editingId: null,
  loading: false,

  setAllocations: (allocations) => set({ allocations }),
  setHouses: (houses) => set({ houses }),
  setMembers: (members) => set({ members }),
  setFormData: (formData) => set({ formData }),
  setEditingId: (editingId) => set({ editingId }),
  setLoading: (loading) => set({ loading }),
  resetForm: () =>
    set({
      formData: {
        id: 0,
        houseId: 0,
        memberId: 0,
        allocationDate: new Date().toISOString().substring(0, 10),
        releaseDate: "",
      },
      editingId: null,
    }),
}));
