import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-sky-50 mb-5"><Navbar/> </header>
      <main className="grow mycontainer ">
        <Outlet/>
      </main>
      <footer><Footer/> </footer>
    </div>
  )
}

export default MainLayout
