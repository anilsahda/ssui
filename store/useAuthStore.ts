import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {  //class
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {  //interface
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(  //repositories
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;