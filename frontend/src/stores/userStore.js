import { create } from "zustand";

const userStore = (set) => {
  return {
    user: null,
    setUser: (user) => set((state) => (state.user = user)),
    removeUser: () => set((state) => (state.user = null)),
  };
};

const useUserStore = create(userStore);

export default useUserStore;
