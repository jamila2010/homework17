import { create } from "zustand";

export const userApp = create((set) => ({
  user: null,
  usersData: null,

  setLogReg: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
}));
