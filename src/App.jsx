import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            {/* Full screen container */}
            <div className="flex min-h-screen bg-background text-white">
                
                {/* Left Sidebar (Extreme Left) */}
                <Sidebar />

                {/* Main content (Expands to fill available space) */}
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/topics" element={<Topics />} />
                            <Route path="/stories" element={<Stories />} />
                            <Route path="/resources" element={<Resources />} />
                        </Route>
                    </Routes>
                </div>

                {/* Right Sidebar (Extreme Right) */}
                <RightSidebar />
            </div>
        </BrowserRouter>
    );
}

export default App;
