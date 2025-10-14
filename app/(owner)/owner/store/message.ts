import { create } from "zustand";

interface Owner {
  id: number;
  name: string;
}

interface Message {
  id: number;
  ownerId: number;
  text: string;
  sentAt?: string;
  owner?: Owner;
}

interface MessageStore {
  messages: Message[];
  owners: Owner[];
  loading: boolean;
  error: string | null;
  form: Partial<Message>;
  isEditing: boolean;

  setMessages: (messages: Message[]) => void;
  setOwners: (owners: Owner[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setForm: (form: Partial<Message>) => void;
  setIsEditing: (editing: boolean) => void;
  resetForm: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  owners: [],
  loading: true,
  error: null,
  form: {},
  isEditing: false,

  setMessages: (messages) => set({ messages }),
  setOwners: (owners) => set({ owners }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setForm: (form) => set({ form }),
  setIsEditing: (isEditing) => set({ isEditing }),
  resetForm: () => set({ form: {}, isEditing: false, error: null }),
}));
