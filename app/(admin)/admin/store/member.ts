import { create } from "zustand";

export interface Member {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface MemberStore {
  members: Member[];
  form: Partial<Member>;
  isEditing: boolean;
  loading: boolean;
  error: string | null;

  setMembers: (members: Member[]) => void;
  setForm: (form: Partial<Member>) => void;
  setIsEditing: (editing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  members: [],
  form: {},
  isEditing: false,
  loading: true,
  error: null,

  setMembers: (members) => set({ members }),
  setForm: (form) => set({ form }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetForm: () => set({ form: {}, isEditing: false, error: null }),
}));
