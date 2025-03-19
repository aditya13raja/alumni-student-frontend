import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import Jobs from "./pages/Jobs";
import Topics from "./pages/Topics";
import RightSidebar from "./components/RightSidebar";
import Stories from "./pages/Stories";
import Resources from "./pages/Resources";
import Roadmap from "./pages/Roadmap";
import PrivateRoute from "./components/PrivateRoute";

// Layout for authenticated pages (with sidebars)
function MainLayout() {
    return (
        <div className="flex min-h-screen bg-background text-white">
            <Sidebar />
            <div className="flex-1 p-6">
                <Outlet /> {/* Nested routes will render here */}
            </div>
            <RightSidebar />
        </div>
    );
}

// Layout for authentication pages (without sidebars)
function AuthLayout() {
    return (
        <div className="flex min-h-screen bg-background text-white justify-center items-center">
            <Outlet /> {/* Nested routes will render here */}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Authentication Layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>

                {/* Protected Routes Layout */}
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/:username" element={<Profile />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/topics" element={<Topics />} />
                        <Route path="/stories" element={<Stories />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/roadmaps" element={<Roadmap />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

