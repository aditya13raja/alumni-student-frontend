import { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { 
    authFailure, 
    authStart, 
    authSuccess 
} from "../utils/user/userSlice";

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { loading, error } = useSelector((state) => state.user);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        try {
            dispatch(authStart())

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json()
            console.log(data)
            
            if (data.error) {
                dispatch(authFailure(data.error))
                return;
            }

            dispatch(authSuccess(data.user))
            navigate('/')
        } catch (error) {
            dispatch(authFailure(error.message))
        }
    };

    return (
        <div className="min-h-screen bg-black-100 flex items-center justify-center py-10 px-5"
        style={{ backgroundImage: "url('./src/assets/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "100vh",
            }}
        >
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-transparent bg-opacity-100 backdrop-blur-sm">
                <h2 className="text-3xl font-semibold text-center mb-6 italic ">Sign In</h2>
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
                    {error && <p className="text-red-700">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
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