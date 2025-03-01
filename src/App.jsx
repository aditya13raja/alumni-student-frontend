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
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/topics" element={<Topics />} />
                        <Route path="/stories" element={<Stories />} /> {/* Added Stories Route */}
                        <Route path="/resources" element={<Resources />} /> {/* Added Resources Route" */}
                    </Routes>
                </div>

                {/* Right Sidebar (Extreme Right) */}
                <RightSidebar />
            </div>
        </BrowserRouter>
    );
}

export default App;
