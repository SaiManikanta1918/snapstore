import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user-info')),
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));

export default useAuthStore;
