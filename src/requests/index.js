import { axiosInstance } from "../lib/axios";

export const deleteUser=async(id)=>{
const res= await axiosInstance.delete(`/users/${id}`)
return res.data
}
