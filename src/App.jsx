import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage"; 
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import Jobs from "./pages/Jobs";
import Topics from "./pages/Topics";
import RightSidebar from "./components/RightSidebar";
import Stories from "./pages/Stories";
import Resources from "./pages/Resources";
import Roadmap from "./pages/Roadmap";

function App() {
    return (
        <Router>
            <div className="flex min-h-screen bg-gray-900 text-white">
                
                {/* Left Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/topics" element={<Topics />} />
                        <Route path="/stories" element={<Stories />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/roadmap" element={<Roadmap />} />
                    </Routes>
                </div>

                {/* Right Sidebar */}
                <RightSidebar />
            </div>
        </Router>
    );
}

export default App;
