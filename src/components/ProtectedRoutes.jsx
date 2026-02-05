import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Atom } from "react-loading-indicators"


function ProtectedRoutes({children, user}) {
  const {authLoading}= useAuth()

 if(authLoading){
  return <div>
    <h1 className="flex h-screen items-center justify-center gap-5 text-6xl font-black "></h1>
    <span className="animate-spin">
   <Atom color={["#007699", "#009ecc", "#00c5ff", "#33d1ff"]} />
    </span>
  </div>
 }

 if(!user){
   return <Navigate to={"/register"} />
 }

  return  children
  
}

export default ProtectedRoutes
