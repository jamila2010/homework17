import { Navigate } from "react-router-dom"


function ProtectedRoutes({children, user}) {
 if(!user){
   return <Navigate to={"/register"} />
 }

  return  children
  
}

export default ProtectedRoutes
