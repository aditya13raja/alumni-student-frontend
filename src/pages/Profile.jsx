import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProfilePage = () => {
    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/user/${username}`);
                const data = await response.json();
                setUser(data.user);
                setFormData(data.user);
                setProfilePic(data.user.profile_picture || null); // image URL
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Error fetching user data.");
                console.error(error);
            }
        };

        fetchUser();
    }, [username]);

    const handleEditToggle = () => setIsEditing(true);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/user/${username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, profile_picture: profilePic }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser.user);
                setIsEditing(false);
                alert("Profile updated successfully.");
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
            const response = await fetch(`/api/user/${username}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("User deleted successfully!");
                setUser(null);
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
                setProfilePic(reader.result); // base64 image string
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen w-full bg-transparent-to-br from-blue-50 to-white flex items-center justify-center p-1">
            <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-2xl">
                {loading && <p className="text-center text-gray-600 text-lg">Loading...</p>}
                {error && <p className="text-center text-red-500 text-lg">{error}</p>}

                {user && !loading && !error && (
                    <div>
                        <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">User Profile</h1>

                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center mb-8">
                            <img
                                src={profilePic || "./src/assets/placeholder.png"}
                                className="w-32 h-32 rounded-full border-4 border-blue-300 object-cover shadow-md"
                            />
                            {isEditing && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-4 text-sm"
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
                            {["first_name", "last_name", "age", "role", "degree", "major", "passing_year", "username", "email"].map((field) => (
                                <div key={field}>
                                    <label className="block font-semibold capitalize mb-1">
                                        {field.replace("_", " ")}:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type={field === "age" || field === "passing_year" ? "number" : "text"}
                                            name={field}
                                            value={formData[field] || ""}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        />
                                    ) : (
                                        <p className="w-full border border-gray-300 rounded-lg px-3 py-2">{user[field]}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-end">
                            {!isEditing ? (
                                <button
                                    onClick={handleEditToggle}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                                >
                                    Save
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>

                        {user.role === "Alumni" ? (
                            <div className="flex flex-col my-4">
                                <Link to="/write-blog">
                                    <button
                                        className="bg-green-600 w-full text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                                    >
                                        Write a blog
                                    </button>
                                </Link>
                            </div>
                        ) : null
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
