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
    FaRoad,
    FaSuitcase,
    FaBars,
    FaTimes,
    FaBookOpen,
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
    const username = currentUser?.username || "user";

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
        { to: "/topics", label: "Topics", icon: <FaSearch /> },
        { to: "/resources", label: "Resources", icon: <FaDatabase /> },
        { to: "/blogs", label: "Blogs", icon: <FaBookOpen/> },
        { to: "/roadmaps", label: "Roadmap", icon: <FaRoad /> },
        { to: "/jobs", label: "Jobs", icon: <FaSuitcase /> },
    ];

    const NavItem = ({ to, label, icon }) => (
        <Link
            to={to}
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition group"
        >
            {/* Desktop: icon above label */}
            <div className="hidden md:flex flex-col items-center justify-center px-3 py-2">
                <div className="group-hover:scale-110 transition duration-200 text-[hsl(var(--foreground))]">
                    {icon}
                </div>
                <span className="mt-1 text-base">{label}</span>
            </div>

            {/* Mobile: icon left of label */}
            <div className="flex md:hidden items-center gap-3 px-3 py-2">
                <div className="text-[hsl(var(--foreground))] text-lg">{icon}</div>
                <span className="text-base">{label}</span>
            </div>
        </Link>
    );

    return (
        <nav className="sticky top-0 h-20 z-50 w-full bg-[hsl(var(--background))]/40 backdrop-blur-xl text-[hsl(var(--foreground))] border-b border-[hsl(var(--border))]">
            <div className="mx-auto max-w-[960px] px-5 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to={"/"}>
                    <div className="flex items-center gap-3">
                        <img src={Logo} alt="Logo" className="h-10 w-auto" />
                        <span className="font-bold text-xl text-[hsl(var(--foreground))]">
                            Alumni Connect
                        </span>
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
                        <div className="hidden md:flex items-center gap-2 text-[hsl(var(--foreground))] cursor-pointer">
                            <FaCircleUser className="text-xl" />
                            <span>{first_name}</span>
                            <span>{last_name}</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] border border-[hsl(var(--border))]"
                    >
                        <DropdownMenuItem>
                            <Link to={`/${username}`}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut}>
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Hamburger */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-[hsl(var(--foreground))]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-[hsl(var(--background))] border-t border-[hsl(var(--border))]">
                    {navLinks.map(({ to, label, icon }) => (
                        <NavItem key={to} to={to} label={label} icon={icon} />
                    ))}
                    <div className="mt-2 border-t border-[hsl(var(--border))] pt-2 flex flex-col gap-2">
                        <Button
                            variant="secondary"
                            className="text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] hover:bg-[hsl(var(--accent))]"
                        >
                            <Link to={`/${username}`}>Profile</Link>
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleSignOut}
                            className="text-[hsl(var(--destructive))]"
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>
            )}
        </nav>

    );
}

