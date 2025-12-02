import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const auth = getAuth();
  const nav = useNavigate();
  const location = useLocation(); // để biết URL hiện tại
  const [hasChildRoute, setHasChildRoute] = useState(false);
  

  useEffect(() => {
    if (!auth.currentUser) {
      nav("/login");
    }
    setHasChildRoute(location.pathname !== "/admin");
  }, [auth, nav, location.pathname]);

  // Nếu chưa login -> không render layout
  if (!auth.currentUser) return null;

  return (
    <div className="flex gap-8 bg-gray-800">
      <SideBar />
      <div className="w-full min-h-screen overflow-auto">
         {!hasChildRoute ? (
          <Outlet />
        ) : (
          <div className="flex items-center justify-center min-h-screen text-gray-200 text-center text-xl">
            <div><h2 className="text-2xl">Welcome to Admin Dashboard</h2></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
