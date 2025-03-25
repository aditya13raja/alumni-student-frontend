import { useState, useEffect } from "react";
import { FaUsers, FaComments, FaBriefcase, FaMoon, FaSun } from "react-icons/fa";


const Home = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            {/* Dark Mode Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}`}
            >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            {/* Hero Section */}
            <header className={`text-center py-20 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
                <h2 className="text-4xl font-bold mb-4">Reconnect, Collaborate, and Grow</h2>
                <p className="text-lg mb-6">
                    Join our platform to connect with alumni, explore opportunities, and build relationships.
                </p>
                <button className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} px-6 py-2 rounded`}>Get Started</button>
            </header>
            {/* Features Section */}
      <section className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" p-6 rounded shadow-md text-center ">
          <FaUsers className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Connect</h3>
          <p className="text-gray-600">Find and connect with alumni from your institution.</p>
        </div>
        <div className="p-6 rounded shadow-md text-center">
          <FaComments className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Engage</h3>
          <p className="text-gray-600">Join discussions and share your experiences.</p>
        </div>
        <div className="p-6 rounded shadow-md text-center">
          <FaBriefcase className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Opportunities</h3>
          <p className="text-gray-600">Explore job opportunities and mentorship programs.</p>
        </div>
      </section>
        </div>
    );
};

export default Home;