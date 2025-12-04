import { NavLink, useNavigate } from "react-router-dom";
import LogoNgang from "../../Assets/Thng Film Logo Ngang.png";
import { useEffect, useState } from "react";

const Header = () => {
    const nav = useNavigate();
    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        const handleWindowScroll = () => {
            const canScroll =
                document.documentElement.scrollHeight >
                document.documentElement.clientHeight;

            if (!canScroll) {
                // Trang quá ngắn -> auto show
                setShowHeader(true);
                return;
            }

            // Trang dài -> dựa vào scroll
            if (window.scrollY > 50) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
        };

        // Gọi 1 lần cho trạng thái ban đầu
        handleWindowScroll();

        window.addEventListener("scroll", handleWindowScroll);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, []);

    return (
        <>
            <nav className={`${showHeader ? 'translate-y-0' : 'translate-y-[-100%]'} transition-transform duration-300 top-0 bg-gray-900 py-2 z-10 fixed w-full shadow-md shadow-gray-700`}>
                <div className="container mx-auto flex justify-between items-center ">
                    <div className="cursor-pointer" onClick={() => nav('/')}>
                        <img className="object-cover w-36" src={LogoNgang} alt="logo" />
                    </div>
                    <div className="flex gap-10 items-center" >
                        <div className="flex gap-6 font-thin text-white">
                            <NavLink className="header__link hover:text-orange-500" to="/">Trang Chủ</NavLink>
                            <NavLink className="header__link hover:text-orange-500" to="/phim">Xem Gì</NavLink>
                            <NavLink className="header__link hover:text-orange-500" to="/tin-tuc">Tin Tức</NavLink>
                            <NavLink className="header__link hover:text-orange-500" to="/lien-he">Liên hệ</NavLink>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-9 h-9 flex justify-center items-center border rounded-full text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"><i className="fa-brands fa-facebook-f"></i></div>
                            <div className="w-9 h-9 flex justify-center items-center border rounded-full text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"><i className="fa-brands fa-tiktok"></i></div>
                            <div className="w-9 h-9 flex justify-center items-center border rounded-full text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"><i className="fa-brands fa-instagram"></i></div>

                        </div>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default Header;
