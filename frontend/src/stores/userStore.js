import { create } from "zustand";

const userStore = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  removeUser: () => set(() => ({ user: null })),
});

const useUserStore = create(userStore);

export default useUserStore;
