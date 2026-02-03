import { axiosInstance } from "../lib/axios";

export const deleteUser=async(id)=>{
const res= await axiosInstance.delete(`/users/${id}`)
return res.data
}

export const createUser=async(userData)=>{
    const res=await axiosInstance.post("/users", userData)
    return res.data
}

export const editUser=async({id, editedNewUser})=>{
    const res=await axiosInstance.put(`/users/${id}`, editedNewUser)
    return res.data
}