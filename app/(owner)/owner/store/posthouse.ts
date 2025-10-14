// store/postHouseStore.ts
import { create } from "zustand";

interface Owner {
  id: number;
  name: string;
}

interface PostHouse {
  id: number;
  title: string;
  address: string;
  ownerId: number;
  owner?: Owner;
}

interface PostHouseStore {
  postHouses: PostHouse[];
  owners: Owner[];
  form: Partial<PostHouse>;
  editing: boolean;
  loading: boolean;

  setPostHouses: (data: PostHouse[]) => void;
  setOwners: (data: Owner[]) => void;
  setForm: (form: Partial<PostHouse>) => void;
  setEditing: (editing: boolean) => void;
  setLoading: (loading: boolean) => void;
  resetForm: () => void;
}

export const usePostHouseStore = create<PostHouseStore>((set) => ({
  postHouses: [],
  owners: [],
  form: { title: "", address: "", ownerId: 0 },
  editing: false,
  loading: true,

  setPostHouses: (data) => set({ postHouses: data }),
  setOwners: (data) => set({ owners: data }),
  setForm: (form) => set({ form }),
  setEditing: (editing) => set({ editing }),
  setLoading: (loading) => set({ loading }),
  resetForm: () =>
    set({ form: { title: "", address: "", ownerId: 0 }, editing: false }),
}));
