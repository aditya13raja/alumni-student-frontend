import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobDescription = () => {
    const [job, setJob] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/jobs/${id}`);
                const data = await response.json();
                setJob(data.job);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };

        fetchJob();
    }, [id]);

    if (!job) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

    return (
        <div className="mx-auto w-full p-6 my-10 space-y-6">
            <div className="flex justify-between items-start gap-6">
                <h1 className="text-3xl font-bold text-blue-800">{job.job_role}</h1>
                {job.job_link && (
                    <a
                        href={job.job_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 border border-blue-400 hover:text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
                    >
                        Apply Now
                    </a>
                )}
            </div>

            <div className="text-gray-600 space-y-2">
                <p><strong>Company:</strong> {job.company_name}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Job Type:</strong> {job.job_type.replace('_', ' ')}</p>
                <p><strong>Job Mode:</strong> {job.job_mode}</p>
                <p><strong>Posted By:</strong> {job.username}</p>
                <p><strong>Valid Till:</strong> {new Date(job.validity).toLocaleString()}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.job_description}
                </p>
            </div>
        </div>
    );
};

export default JobDescription;

