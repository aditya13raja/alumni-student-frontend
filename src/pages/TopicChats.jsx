import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TopicChats = () => {
    const { category } = useParams();
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await fetch(`/api/topics?category=${category}`);
            const data = await response.json();
            setTopics(data.topics);
        };
        fetchTopics();
    }, [category]);

    useEffect(() => {
        if (topics.length > 0) {
            navigate(`/topics/${category}/${topics[0].topic_name}`, { replace: true });
        }
    }, [topics, category, navigate]);

    return (
    <div className="flex justify-center w-full" style={{ height: "calc(100vh - 6rem)" }}>
      <div className="flex w-full max-w-[960px] h-full">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
          <div className="px-4 py-5 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
            <h2 className="text-2xl font-bold text-center">Topics</h2>
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
                  <div className="text-xl font-normal px-4">{topic.topic_fullname}</div>
                </Link>
              ))
            )}
          </div>
        </aside>

        {/* Mobile Toggle */}
        <div className="md:hidden fixed top-20 left-4 z-10">
          <details className="relative">
            <summary className="cursor-pointer mt-2 p-2 bg-blue-100 rounded-md text-sm font-semibold text-foreground shadow">
              Topics
            </summary>
            <div className="absolute top-full mt-2 bg-blue-50 border border-blue-100 rounded-lg shadow-lg w-64 max-h-[60vh] overflow-y-auto">
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

        {/* Chat Section */}
        <main className="flex flex-col w-full md:w-[80%] h-full overflow-hidden">
          <div className="flex-1 h-full w-full overflow-hidden ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    );
};

export default TopicChats;

