import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const { username } = useParams();

    const fileRef = useRef(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({});
    const [profilePic, setProfilePic] = useState(null);

    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/user/${username}`);
            const data = await response.json();
            setUser(data.user);
            setFormData(data.user);
            setProfilePic(data.user.profile_picture || null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Error fetching user data.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [username]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const alumniButtons = "border border-blue-600 w-full text-black px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200";

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/user/${username}/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData }),
            });

            if (response.ok) {
                alert("Profile updated successfully.");
                fetchUser();
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/user/${username}/delete`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("User deleted successfully!");
                setUser(null);
                navigate('/signin');
            } else {
                alert("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen w-full mt-4  items-center justify-center p-1">
            <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">User Profile</h1>
            <div className="w-full max-w-4xl p-10 rounded-3xl shadow-2xl border border-blue-100 bg-[hsl(var(--background))]/70 backdrop-blur-md ">
                {loading && <p className="text-center text-gray-600 text-lg">Loading...</p>}
                {error && <p className="text-center text-red-500 text-lg">{error}</p>}

                {user && !loading && !error && (
                    <div>
                        <p className="text-center text-gray-500 text-lg mb-6 capitalize">
                            Role: {user.role}
                        </p>

                        <div className="flex flex-col items-center mb-8">
                            <img
                                src={profilePic || "./src/assets/placeholder.png"}
                                onClick={() => fileRef.current.click()}
                                className="w-32 h-32 rounded-full cursor-pointer border-4 border-blue-300 object-cover shadow-md"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                                ref={fileRef}
                                className="mt-4 text-sm items-center"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
                            {["first_name", "last_name", "age", "degree", "major", "passing_year", "username", "email"].map((field) => (
                                <div key={field}>
                                    <label className="block font-semibold capitalize mb-1">
                                        {field.replace("_", " ")}:
                                    </label>
                                    <input
                                        type={field === "age" || field === "passing_year" ? "number" : "text"}
                                        name={field}
                                        value={formData[field] || ""}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-between ">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>

                        {user.role === "alumni" && (
                            <div className="flex flex-col my-4 space-y-2">
                                <hr className="my-8 border-gray-300" />
                                <h2 className="text-center mb-2 text-xl">Alumni Options</h2>
                                <Link to="/write-blog">
                                    <button className={alumniButtons}>
                                        Write a blog
                                    </button>
                                </Link>
                                <Link to="/post-job">
                                    <button className={alumniButtons}>
                                        Create job posting
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

