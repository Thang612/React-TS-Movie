import { Outlet } from "react-router-dom"
import Header from "../User/Layout/Header"

const UserLayout = ()=>{
    return (<>
        <Header/>
        <Outlet/>
    </>)
}

export default UserLayout;