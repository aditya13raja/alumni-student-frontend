import { useParams, Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CategoryLayout = () => {
    const { category } = useParams();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        // Fetch topics for the category
        const fetchTopics = async () => {
            const response = await fetch(`/api/topics?category=${category}`);
            const data = await response.json();
            setTopics(data.topics);
        };

        fetchTopics();
    }, [category]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="hidden md:block md:w-64 bg-background border-r p-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Topics</h2>
                <div className="space-y-2">
                    {topics.length === 0 ? (
                        <div className="text-center text-muted-foreground">Loading...</div>
                    ) : (
                            topics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    to={`/topics/${category}/${topic.topic_name}`}
                                    className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition"
                                >
                                    {topic.topic_fullname}
                                </Link>
                            ))
                        )}
                </div>
            </aside>

            {/* Mobile Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <details className="relative">
                    <summary className="cursor-pointer bg-muted p-2 rounded-md text-sm font-semibold text-foreground shadow">
                        Topics
                    </summary>
                    <div className="absolute top-full mt-2 bg-background border rounded-lg shadow-lg w-64 max-h-[60vh] overflow-y-auto">
                        {topics.map((topic) => (
                            <Link
                                key={topic.id}
                                to={`/topics/${category}/${topic.topic_name}`}
                                className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                            >
                                {topic.topic_fullname}
                            </Link>
                        ))}
                    </div>
                </details>
            </div>

            {/* Chat Outlet */}
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>

    );
};

export default CategoryLayout;

