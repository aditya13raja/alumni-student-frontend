import { useState } from "react";
import { Link } from "react-router-dom";
import AvatarSelector from "../components/AvatarSelector"; // Import the avatar selector

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Aman Kumar Verma",
    email: "aman@example.com",
    bio: "Aspiring Software Engineer",
    avatar: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (avatarUrl) => {
    setUser({ ...user, avatar: avatarUrl });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      console.log("Account deleted");
      setUser(null);
    }
  };

  if (!user) return <p className="text-center text-red-500">Account deleted.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-black shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Profile Page</h2>

      <div className="flex flex-col items-center gap-4 p-4 border rounded-lg">
        <AvatarSelector avatar={user.avatar} onAvatarChange={handleAvatarChange} />

        <div className="w-full">
          <label className="block text-gray-700">Name</label>
          <input name="name" value={user.name} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div className="w-full">
          <label className="block text-gray-700">Email</label>
          <input name="email" type="email" value={user.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div className="w-full">
          <label className="block text-gray-700">Bio</label>
          <input name="bio" value={user.bio} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Profile</button>
        <button className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-500 hover:underline">Go Home</Link>
      </div>
    </div>
  );
}
