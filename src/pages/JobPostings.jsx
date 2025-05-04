import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobPostings = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [jobModeFilter, setJobModeFilter] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const response = await fetch("/api/jobs/list/jobs");
            const data = await response.json();
            setJobs(data);
            console.log(data)
            setLoading(false);
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const isValid = new Date(job.validity) > new Date();
        const matchesSearch = job.job_role
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        const matchesJobType = jobTypeFilter
            ? job.job_type === jobTypeFilter
            : true;
        const matchesJobMode = jobModeFilter
            ? job.job_mode === jobModeFilter
            : true;

        return isValid && matchesSearch && matchesJobType && matchesJobMode;
    });

    return (
        <div className="mt-5 pb-16 px-4">
            <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center tracking-tight">
                Job Postings
            </h1>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search job role"
                    className="w-full p-3 border border-blue-300 shadow-md rounded-md"
                />

                <select
                    value={jobTypeFilter}
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                    className="w-full p-3 border border-blue-300 shadow-md rounded-md"
                >
                    <option value="">All Job Types</option>
                    <option value="full_time">Full-time</option>
                    <option value="part_time">Part-time</option>
                    <option value="internship">Internship</option>
                </select>

                <select
                    value={jobModeFilter}
                    onChange={(e) => setJobModeFilter(e.target.value)}
                    className="w-full p-3 border border-blue-300 shadow-md rounded-md"
                >
                    <option value="">All Job Modes</option>
                    <option value="onsite">Onsite</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>

            {loading && <div>Loading...</div>}

            {!loading && filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 lg:grid-cols-3 gap-6 auto-rows-fr mt-5">
                    {filteredJobs.map((job) => (
                        <Link
                            to={`/jobs/${job.id}`}
                            key={job.id}
                            className="glass-card p-4 space-y-2 hover:scale-103"
                        >
                            <h2 className="text-lg truncate font-bold text-[hsl(var(--foreground))]">
                                {job.job_role}
                            </h2>
                            <p className="text-md font-semibold text-[hsl(var(--muted-foreground))] ">{job.company_name}</p>

                            <div className="flex gap-2 text-sm">
                                <span className="bg-blue-100 px-2 py-1 rounded-full">
                                    {job.job_type}
                                </span>
                                <span className="bg-teal-100 px-2 py-1 rounded-full">
                                    {job.job_mode}
                                </span>
                            </div>

                            <p className="text-xs text-[hsl(var(--muted-foreground))] ">
                                Posted on {new Date(job.created_at).toLocaleDateString()}
                            </p>

                            <a
                                href={job.job_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-center w-full border border-blue-300 p-2 rounded-md  hover:bg-blue-300"
                            >
                                Apply Now
                            </a>
                        </Link>
                    ))}
                </div>
            ) : (
                    !loading && <div>No job postings found.</div>
                )}
        </div>
    );
};

export default JobPostings;

