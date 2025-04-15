import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import Jobs from "./pages/Jobs";
import Topics from "./pages/Topics";
import Stories from "./pages/Stories";
import Resources from "./pages/Resources";
import Roadmap from "./pages/Roadmap";
import Chats from "./pages/Chats";
import PrivateRoute from "./components/PrivateRoute";

// Layout for authenticated pages (with sidebar)
function MainLayout() {
    return (
        <div className="flex min-h-screen  bg-[var(--bg-color)] text-[var(--text-color)]">
            <Sidebar />
            <div className="flex-1 p-1">
                <Outlet /> {/* Nested routes will render here */}
            </div>
        </div>
    );
}

// Layout for authentication pages (without sidebar)
function AuthLayout() {
    return (
        <div className="flex min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] justify-center items-center">
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
                        <Route path="/topics/:topic" element={<Chats />}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
