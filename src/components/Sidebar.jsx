import { useState, useRef, useEffect } from "react";
import { FaCircleUser, FaRoad, FaTrophy } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaSearch, FaDatabase, FaSuitcase } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../utils/user/userSlice";

export default function Sidebar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.user.currentUser)

    // TODO: remove this with destructured one, after protecting routes
    // Save with optional chaining, to allow going home when not logged in
    const first_name = currentUser?.first_name || "Guest"
    const last_name = currentUser?.last_name || "User"
    const username = currentUser?.username || "guest"

    // Close dropdown when clicking outside
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
            dispatch(signOutUserStart);
            const res = await fetch('/api/auth/signout');
            const data = await res.json();

            if (!data.message) {
                dispatch(signOutUserFailure("Not able to signout"))
                return;
            }

            dispatch(signOutUserSuccess());
            navigate("/signin")
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }

    }

    return (
        <div className="left-sidebar flex flex-col relative rounded-2xl w-60 h-[98vh] bg-black my-[1vh] py-[5vh] px-5">

            {/* Logo */}
            <div className="text-5xl absolute top-4">  <img src="./src/assets/logo.jpeg" alt="Logo" className="h-15 w-auto" />
            </div>

            {/* Sections */}
            <div className="py-20 text-2xl">
                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <Link to="/" className="flex items-center space-x-2">
                        <IoMdHome className="text-primary text-3xl" />
                        <p>Home</p>
                    </Link>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <Link to="/topics" className="flex items-center space-x-2">
                        <FaSearch className="text-primary" />
                        <p>Topics</p>
                    </Link>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <Link to="/resources" className="flex items-center space-x-2">
                        <FaDatabase className="text-primary" />
                        <p>Resources</p>
                    </Link>
                </div>
                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <Link to="/stories" className="flex items-center space-x-2">
                        <FaTrophy className="text-primary" />
                        <p>Stories</p>
                    </Link>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <Link to="/roadmaps" className="flex items-center space-x-2">
                        <FaRoad className="text-primary text-3xl" />
                        <p>Roadmap</p>
                    </Link>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <Link to="/jobs" className="flex items-center space-x-2">
                        <FaSuitcase className="text-primary text-3xl" />
                        <p>Jobs</p>
                    </Link>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <Link to="/profile" className="flex items-center space-x-2">
                        <FaCircleUser className="text-primary text-3xl" />
                        <p>Profile</p>
                    </Link>
                </div>

            </div>

            {/* Account Section - Fixed at the Absolute Bottom */}
            <div ref={menuRef} className="absolute bottom-4 right-4 left-4">
                {/* Drop-Up Menu */}
                {menuOpen && (
                    <div className="absolute bottom-16 right-4 bg-black shadow-lg rounded-md p-3 w-40 text-center">
                        <p onClick={handleSignOut} className="cursor-pointer">
                            Sign out
                        </p>
                    </div>
                )}

                {/* Username Section */}
                <div
                    className="flex gap-4 items-center rounded-full hover:bg-secondary p-3 cursor-pointer w-full justify-between"
                    onClick={() => setMenuOpen((prev) => !prev)} // Toggle dropdown
                >
                    <FaCircleUser className="text-primary text-5xl" />
                    <div>
                        <p>
                            {first_name && <span>{first_name} </span>}
                            {last_name && <span>{last_name}</span>}
                        </p>

                        {username && <p>{username}</p>}
                    </div>
                    <PiDotsThreeOutlineVerticalFill />
                </div>
            </div>
        </div>
    );
}
