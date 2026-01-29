import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"


function ProtectedRoutes({children, user}) {
  const {loading,}= useAuth()

 if(loading){
  return null
 }

 if(!loading&&!user){
   return <Navigate to={"/register"} />
 }

  return  children
  
}

export default ProtectedRoutes
