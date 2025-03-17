import { Outlet } from "react-router-dom"
import PanelNavbar from "../components/PanelNavbar"
import Sidebar from "../components/Sidebar"

const Layout = () => {
  return (
   <div className="flex w-full min-h-screen justify-center items-center bg-[#121826] p-4 md:p-10">
      <Sidebar />
      <div className="flex flex-col w-full gap-10 xl:pl-10">
         <PanelNavbar />
         <Outlet />
      </div>
   </div>
  )
}

export default Layout
