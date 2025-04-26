import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AlumniBlogs = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [blogsList, setBlogsList] = useState([]);

    useEffect(() => {
        const fetchBlogsList = async () => {
            setLoading(true);
            const response = await fetch("/api/blog/list/blogs");
            const data = await response.json();

            setBlogsList(data);
            setLoading(false);
        }

        fetchBlogsList()
    }, [])

    const filteredBlogs = blogsList.filter(blog =>
        blog.heading.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mt-5">
            <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center tracking-tight">
                Alumni Blogs
            </h1>

            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search blog heading"
                    className="w-full p-3 border border-blue-300 shadow-md rounded-md"
                />
            </div>

            {loading && <div>Loading...</div>}

            {!loading && filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mt-5">
                    {filteredBlogs.map((blog) => (
                        <Link
                            to={`/blogs/${blog.id}`}
                            key={blog.id}
                            className="border border-blue-100 bg-[hsl(var(--background))]/70 backdrop-blur-md shadow-sm rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition"
                        >
                            <img src={blog.cover_image} alt="cover" className="w-full h-48 object-cover" />
                            <div className="p-4 space-y-2">
                                <h2 className="text-lg font-bold line-clamp-2">{blog.heading}</h2>
                                <p className="text-sm text-[hsl(var(--muted-foreground))] ">By {blog.username}</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))] ">
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                    !loading && <div>No blogs found</div>
                )}
        </div>
    );
};

export default AlumniBlogs;
