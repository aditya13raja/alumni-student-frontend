import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
{/*import { FaLock } from "react-icons/fa";*/}
import { Link, useNavigate } from "react-router-dom";
import { 
    authFailure, 
    authStart, 
    authSuccess 
} from "../utils/user/userSlice";

const SignUp = () => {
    // Usestate to store form data with initial values
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: "Alumni",
        age: 22,
        degree: "",
        major: "",
        passing_year: 2025,
        username: "",
        password: "",
    });

    // State variable for error and loading
    const { loading, error } = useSelector((state) => state.user);

    // Create dispatch variable
    const dispatch = useDispatch();

    // Create instance of useNavigate hook
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        // Prevent default, i.e. prevent reload after submitting form
        e.preventDefault();

        // TODO: remove console after testing
        console.log("Form Data:", formData);

        // Post(send) form data to backend
        try {
            dispatch(authStart());
            
            // Making post request
            // axios use
            const res = await fetch("api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            // Change recieved data to json
            const data = await res.json()
            console.log(data)
            
            // If unsuccessful to get data
            if (data.error) {
                dispatch(authFailure(data.error));
                return;
            }

            dispatch(authSuccess(data.user))
            // redirect to home after signup
            navigate('/')
        }
        // catch if error occor
        catch (error) {
            dispatch(authFailure(error.message))
        }
    };

    return (
        <div className="min-h-screen bg-black-100 flex items-center justify-center py-10 px-5">
            <div className="bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-whie-600 mb-6 italic">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-lg"
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex space-x-4">
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-lg"
                        >
                            <option value="Alumni">Alumni</option>
                            <option value="Student">Student</option>
                        </select>
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-lg"
                        />
                    </div>
                    <input
                        type="text"
                        name="degree"
                        placeholder="Degree (e.g., Btech.)"
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="major"
                        placeholder="Major (e.g., CSE)"
                        value={formData.major}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="passing_year"
                        placeholder="2028"
                        value={formData.passing_year}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Create Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {error && <p className="text-red-700">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Loading.." : "Create Account"}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account? {" "}
                        <Link to="/signin" className="text-blue-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
