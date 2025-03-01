import { useState } from "react";
{/*import { FaLock } from "react-icons/fa";*/}
import { Link, useNavigate } from "react-router-dom";

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
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

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
            setLoading(true);
            
            // Making post request
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
            if (data.error != "") {
                setLoading(false)
                setError(data.error)
            }

            setLoading(false)
            setError(null)

            // redirect to home after signup
            navigate('/')
        }
        // catch if error occor
        catch (error) {
            setLoading(false)
            setError(error.message)
        }
    };

    return (
        <div className="min-h-screen bg-black-100 flex items-center justify-center py-10 px-5">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-whie-600 mb-6">Sign Up</h2>
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
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? "Loading.." : "Create Account"}
                    </button>
                </form>
                {error ? error : ""}
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
