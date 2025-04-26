import { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";

const Topics = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories= async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/categories/get-categories`)
                const data = await response.json();

                setCategories(data.categories)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError("Error fetching user data: ", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="mt-5">
            <h1 className="text-4xl text-blue-900 font-bold mb-6 text-center tracking-tight">
                Topic Categories
            </h1>
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
                {categories && !loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {categories.map((cat) => (
                            <CategoryCard key={cat.category} {...cat} />
                        ))}
                    </div>                
                )}
            </div>
        </div>

    )
};

export default Topics;
