// import { create } from "zustand";

// const captainSignupRenderStore = (set) => {
//   return {
//     captainSignupRender: "Personal",
//     setCaptainSignupRender: (captainSignupRender) =>
//       set((state) => (state.captainSignupRender = captainSignupRender)),
//     removeCaptainSignupRender: () =>
//       set((state) => (state.captainSignupRender = "Personal")),
//   };
// };

// const useCaptainSignupRenderStore = create(captainSignupRenderStore);

// export default useCaptainSignupRenderStore;

import { create } from "zustand";

const captainSignupRenderStore = (set) => ({
  captainSignupRender: "Personal",
  setCaptainSignupRender: (captainSignupRender) =>
    set(() => ({ captainSignupRender })),
  removeCaptainSignupRender: () =>
    set(() => ({ captainSignupRender: "Personal" })),
});

const useCaptainSignupRenderStore = create(captainSignupRenderStore);

export default useCaptainSignupRenderStore;
