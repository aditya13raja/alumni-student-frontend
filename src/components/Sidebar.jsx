import { useState, useRef, useEffect } from "react";
import { FaCircleUser, FaRoad, FaTrophy } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaSearch, FaDatabase, FaSuitcase } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../utils/user/userSlice";
import Logo from "../assets/logo.svg";

export default function Sidebar() {  
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const first_name = currentUser?.first_name || "Guest";
    const last_name = currentUser?.last_name || "User";
    const username = currentUser?.username || "guest";

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch("/api/auth/signout");
            const data = await res.json();

            if (!data.message) {
                dispatch(signOutUserFailure("Not able to sign out"));
                return;
            }

            dispatch(signOutUserSuccess());
            navigate("/signin");
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };

    return (
        <div className="left-sidebar flex flex-col relative rounded-2xl w-60 h-[98vh] my-[1vh] py-[5vh] px-5">
            {/* Logo */}
            <div className="absolute top-4 flex gap-2">
                <img src={Logo} alt="Logo" className="h-15 w-auto inline" />
                <div className="flex-col items-center">
                    <p className="font-bold text-2xl">Alumni</p>
                    <p className="font-bold text-2xl">Connect</p>
                </div>
            </div>

            {/* Sections */}
            <div className="py-20 text-2xl">
                {[
                    { to: "/", icon: <IoMdHome className="text-primary text-3xl" />, label: "Home" },
                    { to: "/topics", icon: <FaSearch className="text-primary" />, label: "Topics" },
                    { to: "/resources", icon: <FaDatabase className="text-primary" />, label: "Resources" },
                    { to: "/stories", icon: <FaTrophy className="text-primary" />, label: "Stories" },
                    { to: "/roadmaps", icon: <FaRoad className="text-primary text-3xl" />, label: "Roadmap" },
                    { to: "/jobs", icon: <FaSuitcase className="text-primary text-3xl" />, label: "Jobs" },
                    { to: `/${username}`, icon: <FaCircleUser className="text-primary text-3xl" />, label: "Profile" },
                ].map(({ to, icon, label }) => (
                    <div key={to} className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                        <Link to={to} className="flex items-center space-x-2">
                            {icon}
                            <p>{label}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* User Section */}
            <div className="absolute bottom-4 left-5 flex items-center gap-3 p-3 rounded-lg bg-transparent hover:bg-gray-700 cursor-pointer relative">
                <FaCircleUser className="text-primary text-3xl" />
                <div className="flex flex-col">
                    <p className="text-lg font-semibold">{first_name} {last_name}</p>
                    <p className="text-sm text-gray-400">@{username}</p>
                </div>

                {/* Triple dots for menu */}
                <PiDotsThreeOutlineVerticalFill 
                    className="text-primary text-xl ml-auto cursor-pointer" 
                    onClick={() => setMenuOpen(!menuOpen)}
                />

                {/* Dropdown Menu */}
                {menuOpen && (
                    <div ref={menuRef} className="absolute right-0 bottom-14 w-40 bg-white shadow-md rounded-lg p-2 z-10">
                        {currentUser ? (
                            <button 
                                onClick={handleSignOut} 
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={() => navigate("/signin")} 
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Sign In
                                </button>
                                <button 
                                    onClick={() => navigate("/signup")} 
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
