import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


const AdminLayout = () => {
  return (
    <div className="flex gap-8 bg-gray-800">
            <SideBar/>
        <div className="w-full min-h-screen overflow-auto">
            <Outlet /> {/* Render các route con */}
        </div>
    </div>
  );
};

export default AdminLayout;