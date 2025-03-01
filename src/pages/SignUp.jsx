import { useState } from "react";
{/*import { FaLock } from "react-icons/fa";*/}
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Alumni",
    age: "",
    degree: "",
    major: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-black-100 flex items-center justify-center py-10 px-5">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-whie-600 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
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
