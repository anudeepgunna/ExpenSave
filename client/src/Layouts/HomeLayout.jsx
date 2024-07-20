import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"

 
const HomeLayout = () => {
  return (
     <>
     <Header />
     <Outlet />
     </>
  )
}

export default HomeLayout
