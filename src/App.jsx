import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Jobs from "./pages/Jobs";
import Topics from "./pages/Topics";
import Stories from "./pages/Stories";
import Resources from "./pages/Resources";
import Roadmap from "./pages/Roadmap";
import Chats from "./pages/Chats";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import CategoryLayout from "./pages/CategoryLayout";
import BlogEditor from "./pages/BlogEditor";

// Layout for authenticated pages (with sidebar)
function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
            <Navbar />
            <div className="flex-1 p-1 max-w-[960px] px-5 mx-auto ">
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
                        <Route path="/stories" element={<Stories />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/roadmaps" element={<Roadmap />} />

                        <Route path="/topics" element={<Topics />} />
                        <Route path="/topics/:category" element={<CategoryLayout />}>
                            <Route path=":topic" element={<Chats />} />
                        </Route>                       

                        <Route path="/write-blog" element={<BlogEditor />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
