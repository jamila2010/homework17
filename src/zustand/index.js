import { create } from "zustand";

export const userApp = create((set) => ({
  user: null,
  usersData: null,
  isUser:null,

  setLogReg: (user) =>
    set((state) => ({
      ...state,
      user,
    })),
    setIsUser:()=>{
      set((state)=>{
   return {
      ...state,
      isUser:true,
    }
    },)
    }
}));
