import { Outlet } from "react-router-dom"
// import UserHeader from "../components/user/header/UserHeader"
import FloatingButton from "../components/user/floatingButton/FloatingButton"
import Header from "../components/header/Header.jsx"


 
const UserLayout = () => {
  return (
    <>
    {/* <UserHeader /> */}
    <Header/>
    
    <Outlet />
    <FloatingButton />
    </>
  )
}

export default UserLayout
 

 





