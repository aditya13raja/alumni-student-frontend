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
    const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768);
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

    useEffect(() => {
        function handleResize() {
            setIsExpanded(window.innerWidth >= 768);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
        <div className={`left-sidebar flex flex-col relative h-[98vh] my-[1vh] py-[5vh] px-3 transition-all duration-300 ${isExpanded ? "w-60" : "w-16"}`}>
            {/* Logo */}
            <div className="absolute top-4 flex gap-2 items-center cursor-pointer md:pointer-events-none" onClick={() => setIsExpanded(!isExpanded)}>
                <img src={Logo} alt="Logo" className="h-10 w-auto" />
                {isExpanded && (
                    <div className="flex-col">
                        <p className="font-bold text-2xl">Alumni</p>
                        <p className="font-bold text-2xl">Connect</p>
                    </div>
                )}
            </div>

            {/* Sections */}
            <div className="py-20 text-2xl flex flex-col gap-4">
                {[ 
                    { to: "/", icon: <IoMdHome className="text-primary text-3xl" />, label: "Home" },
                    { to: "/topics", icon: <FaSearch className="text-primary" />, label: "Topics" },
                    { to: "/resources", icon: <FaDatabase className="text-primary" />, label: "Resources" },
                    { to: "/stories", icon: <FaTrophy className="text-primary" />, label: "Stories" },
                    { to: "/roadmaps", icon: <FaRoad className="text-primary" />, label: "Roadmap" },
                    { to: "/jobs", icon: <FaSuitcase className="text-primary" />, label: "Jobs" },
                    { to: `/${username}`, icon: <FaCircleUser className="text-primary" />, label: "Profile" },
                ].map(({ to, icon, label }) => (
                    <Link key={to} to={to} className="flex items-center gap-3 hover:bg-secondary p-3 rounded-full transition-all duration-300">
                        {icon}
                        <span className={`block ${isExpanded ? "inline" : "hidden"}`}>{label}</span>
                    </Link>
                ))}
            </div>

            {/* User Section */}
            <div className="absolute bottom-1 left-0 flex items-center gap-3 p-3 rounded-2xl cursor-pointer relative" onClick={() => setMenuOpen(!menuOpen)}>
                <FaCircleUser className="text-primary text-3xl" />
                {isExpanded && (
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">{first_name} {last_name}</p>
                        <p className="text-sm text-gray-400">@{username}</p>
                    </div>
                )}
                <PiDotsThreeOutlineVerticalFill className="text-primary text-xl ml-auto" />
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
                <div ref={menuRef} className="absolute bottom-14 left-0 w-40 bg-white shadow-md rounded-lg p-2 z-10">
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
    );
}
