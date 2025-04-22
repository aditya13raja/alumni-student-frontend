import { useParams, Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CategoryLayout = () => {
    const { category } = useParams();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await fetch(`/api/topics?category=${category}`);
            const data = await response.json();
            setTopics(data.topics);
        };
        fetchTopics();
    }, [category]);

    return (
        <div className="flex gap-0 w-full overflow-hidden" style={{ height: "calc(100vh - 5rem)" }}>
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] m-2 overflow-hidden shadow-sm">
                <div className="px-4 py-5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] ">
                    <h2 className="text-2xl font-bold ">Topics</h2>
                </div>
                <div className="flex-1 overflow-y-auto py-1">
                    {topics.length === 0 ? (
                        <div className="text-center text-muted-foreground">Loading...</div>
                    ) : (
                            topics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    to={`/topics/${category}/${topic.topic_name}`}
                                    className="block py-3 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted-foreground))]/10 transition font-medium"
                                >
                                    <div className="text-xl font-normal px-4">
                                        {topic.topic_fullname}
                                    </div>
                                </Link>
                            ))
                        )}
                </div>
            </aside>

            {/* Mobile Toggle */}
            <div className="md:hidden fixed top-20 left-4 z-50">
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
            <main className="flex-1 flex flex-col w-full h-full overflow-hidden">
                <div className="flex-1 h-full w-full overflow-y-auto px-2 py-2">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default CategoryLayout;

