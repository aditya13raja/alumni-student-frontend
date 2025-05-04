import { Link } from 'react-router-dom';

const JobGrid = ({ jobs }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
                <div key={job.id} className="glass-card p-4 hover:scale-103">
                    <Link to={`/jobs/${job.id}`} className='space-y-2'>
                        <h2 className="text-lg truncate font-bold  text-[hsl(var(--foreground))]">
                            {job.job_role}
                        </h2>
                        <p className="text-md font-semibold text-[hsl(var(--muted-foreground))]">
                            {job.company_name}
                        </p>

                        <div className="flex gap-2 text-xs">
                            <span className="bg-blue-100 px-2 py-1 rounded-full">
                                {job.job_type}
                            </span>
                            <span className="bg-green-100 px-2 py-1 rounded-full">
                                {job.job_mode}
                            </span>
                        </div>

                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                            Posted on {new Date(job.created_at).toLocaleDateString()}
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default JobGrid;

