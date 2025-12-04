
import { NavLink, useNavigate } from "react-router";
import { LOGOUT, selectMail, } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


const SideBar = () => {
  const user = useSelector(selectMail);
  const dispatch = useDispatch()
  const nav = useNavigate()

  console.log(user)
  const menu = [
    { title: "Dashboard", to: "/admin", icon: <i className="fa-regular fa-house"></i> },
    { title: "Movies", to: "/admin/movies", icon: <i className="fa-solid fa-video"></i> },
    { title: "Categories", to: "/admin/categories", icon: <i className="fa-regular fa-folder-open"></i> },
    { title: "Users", to: "/admin/users", icon: <i className="fa-regular fa-user"></i> },
    { title: "Settings", to: "/admin/settings", icon: <i className="fa-solid fa-gear"></i> },
  ];

  const logout = ()=>{
    if(window.confirm("You want to logout.")){
      dispatch(LOGOUT());
      nav("/")
    }
  }

  return (
    <div className="animate__animated animate__fadeInLeft w-64 flex flex-col justify-between sticky top-0 left-0  min-h-screen bg-gray-900 text-gray-200 px-4 py-6  shadow-xl shadow-slate-400">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-white">🎬 Movie Admin</h2>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => ( 
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all
              ${isActive ? "bg-orange-500 text-white" : "hover:bg-gray-700 hover:text-white"}`
              } 
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
      <div>
          <h3 className="text-sm text-right"> <i className="fa-solid fa-right-from-bracket cursor-pointer hover:text-orange-500" onClick={()=>logout()}></i> {user}</h3>
      </div>
    </div>
  );
}

export default SideBar;