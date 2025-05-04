import { useEffect, useState } from "react";
import { BlogsCarousel } from "../components/BlogsCarousel";
import JobsGrid from "../components/JobsGrid";
import { Link } from "react-router-dom";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [jobsLoading, setJobsLoading] = useState(false);
    const [blogsList, setBlogsList] = useState([]);
    const [jobsList, setJobsList] = useState([]);

    useEffect(() => {
        const fetchBlogsList = async () => {
            setLoading(true);
            const response = await fetch("/api/blog/latest/blogs");
            const data = await response.json();

            setBlogsList(data);
            setLoading(false);
        };

        fetchBlogsList();
    }, []);

    useEffect(() => {
        const fetchJobsList = async () => {
            setJobsLoading(true);
            const response = await fetch("/api/jobs/latest/jobs");
            const data = await response.json();

            setJobsList(data);
            setJobsLoading(false);
        };

        fetchJobsList();
    }, []);

    return (
        <div className="mt-5 px-4">
            {!loading && blogsList.length > 0 && (
                <BlogsCarousel blogs={blogsList} />
            )}
            
            {/* Jobs Section with Heading */}
            {!jobsLoading && jobsList.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">See Latest Job Postings</h2>
                    <JobsGrid jobs={jobsList} />
                    
                    {/* Button to See More Jobs */}
                    <div className="mt-5 text-center">
                        <Link
                            to="/jobs"
                            className="px-4 py-2 border text-md border-blue-200 shadow-md hover:shadow-xl rounded-md hover:scale-110 transition"
                        >
                            See More Jobs
                        </Link>
                    </div>
                </div>
            )}

            <footer className=" py-4 mt-10">
                <div className="text-center">
                    <p>&copy; {new Date().getFullYear()} Alumni Connect. All Rights Reserved.</p>
                    <Link
                        to="/about"
                        className="text-blue-400 hover:text-blue-600 transition"
                    >
                        Know More About Us
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default Home;

