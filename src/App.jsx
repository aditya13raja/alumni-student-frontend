import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Sidebar from "./components/Sidebar"

function App() {
    return (
        <BrowserRouter>
            {/* Wrapper to center content and limit width */}
            <div className="flex min-h-screen justify-center bg-background text-white px-4">
                {/* Content container */}
                <div className="flex w-full max-w-6xl min-w-[20rem] overflow-hidden">
                    
                    {/* Sidebar (fixed width, full height) */}
                    <Sidebar />

                    {/* Main content (flexible width) */}
                    <div className="flex-1 p-6">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </div>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

