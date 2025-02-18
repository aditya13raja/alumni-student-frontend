import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <BrowserRouter>
        <Header />
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
        </Routes>

        <Footer />
    </BrowserRouter>
  ) 
}

export default App
