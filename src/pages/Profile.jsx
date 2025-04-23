import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/user/${username}`);
                const data = await response.json();

                setUser(data.user)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Error fetching user data: ", error);
            }
        };

        fetchUser();
    }, [username]);

    return (
        <div>
            <div>
                {loading && (
                    <p className="text-center text-[var(--color-white)]">
                        Loading...
                    </p>    
                )}
                {error && (
                    <p className="text-4xl text-gray-500 text-center mt-5">
                        Something went wrong!
                    </p>
                )}
                {user && !loading && !error && (
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">Profile</h1>
                        <div className="text-left space-y-3">
                            <p><span>Name:</span> {user?.first_name} {user?.last_name}</p>
                            <p><span>Age:</span> {user?.age}</p>
                            <p><span>Role:</span> {user?.role}</p>
                            <p><span>Degree:</span> {user?.degree} ({user?.major})</p>
                            <p><span>Passing Year:</span> {user?.passing_year}</p>
                            <p><span>Username:</span> {user?.username}</p>
                            <p><span>Email:</span> {user?.email}</p>
                        </div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

