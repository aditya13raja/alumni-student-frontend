import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Create instance of useNavigate hook
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        // Make post request to authenticate
        try {
            setLoading(true)

            // Send form Data
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            // Save recieved data from backend
            const data = await res.json()
            console.log(data)
            
            // If data gives error
            if (data.error != "") {
                setLoading(false)
                setError(data.error)
            }

            setLoading(false)
            setError(null)

            // Navigate to home page after signin
            navigate('/')
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    };

    return (
        <div className="min-h-screen bg-black-100 flex items-center justify-center py-10 px-5">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-white-600 mb-6">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border rounded-lg p-2">
                        <FaUser className="text-gray-600 text-xl mr-2" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 outline-none border-none"
                        />
                    </div>
                    <div className="flex items-center border rounded-lg p-2">
                        <FaLock className="text-gray-600 text-xl mr-2" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 outline-none border-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
                {error ? error : ""}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don`t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
