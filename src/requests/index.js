import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { userApp } from "../zustand";

const setUser = userApp((state) => {
  state.setuser;
});
 useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      });
  }, []);
