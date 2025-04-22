import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    FaSearch,
    FaDatabase,
    FaTrophy,
    FaRoad,
    FaSuitcase,
    FaUserFriends,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
    signOutUserFailure,
    signOutUserStart,
    signOutUserSuccess,
} from "../utils/user/userSlice";
import Logo from "../assets/logo.svg";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const first_name = currentUser?.first_name || "Guest";
    const last_name = currentUser?.last_name || "User";
    const username = currentUser?.username || "guest";

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

    const navLinks = [
        { to: "/topics", label: "Topic", icon: <FaSearch size={24} /> },
        { to: "/resources", label: "Resources", icon: <FaDatabase size={24} /> },
        { to: "/stories", label: "Stories", icon: <FaTrophy size={24} /> },
        { to: "/roadmaps", label: "Roadmap", icon: <FaRoad size={24} /> },
        { to: "/jobs", label: "Jobs", icon: <FaSuitcase size={24} /> },
    ];

    const NavItem = ({ to, label, icon }) => (
        <Link
            to={to}
            className="flex flex-col items-center justify-center px-2 py-2 text-base font-medium text-gray-700 hover:text-primary transition group"
        >
            <div className="group-hover:scale-110 transition duration-200">{icon}</div>
            <span className="mt-1 text-sm">{label}</span>
        </Link>
    );

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200">
            <div className="mx-auto max-w-[960px] px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to={"/"}>
                    <div className="flex items-center gap-3">
                        <img src={Logo} alt="Logo" className="h-10 w-auto" />
                        <span className="font-bold text-xl">Alumni Connect</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-1">
                    {navLinks.map(({ to, label, icon }) => (
                        <NavItem key={to} to={to} label={label} icon={icon} />
                    ))}
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="hidden md:flex items-center gap-2">
                            <FaCircleUser className="text-xl" />
                            <span>{first_name}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Hamburger */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 backdrop-blur-md bg-white/70 border-t border-gray-200">
                    {navLinks.map(({ to, label, icon }) => (
                        <NavItem key={to} to={to} label={label} icon={icon} />
                    ))}
                    <div className="mt-2 border-t pt-2 flex flex-col gap-2">
                        {currentUser ? (
                            <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
                        ) : (
                                <>
                                    <Button variant="ghost" onClick={() => navigate("/signin")}>Sign In</Button>
                                    <Button variant="ghost" onClick={() => navigate("/signup")}>Sign Up</Button>
                                </>
                            )}
                    </div>
                </div>
            )}
        </nav>
    );
}

