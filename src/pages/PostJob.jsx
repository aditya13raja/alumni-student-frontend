import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [formData, setFormData] = useState({
        job_role: '',
        company_name: '',
        salary: '',
        location: '',
        job_type: 'full_time',
        job_mode: 'onsite',
        validity: new Date().toISOString(),
        job_link: '',
        job_description: ''
    });

    const navigate = useNavigate();

    // Get job post creater username
    const currentUser = useSelector((state) => state.user.currentUser);
    const username = currentUser?.username;

    const boxStyle = 'tiptap w-full border border-blue-100 p-4 shadow-lg rounded-md mt-6 bg-white';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobData = {
            ...formData,
            username: username,
        };

        try {
            const response = await fetch('/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });

            const data = await response.json();
            navigate(`/jobs/${data.id}`)
        } catch (error) {
            console.error('Error submitting job:', error);
        }
    };

    return (
        <div className='mt-5 mb-8'>
            <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-6 text-center tracking-tight">
                Post Job
            </h1>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <input type="text" name="job_role" value={formData.job_role} onChange={handleChange} placeholder="Job Role" className={boxStyle} />

                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company Name" className={boxStyle} />

                <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" className={boxStyle} />

                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className={boxStyle} />

                <select name="job_type" value={formData.job_type} onChange={handleChange} className={boxStyle}>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="internship">Internship</option>
                </select>

                <select name="job_mode" value={formData.job_mode} onChange={handleChange} className={boxStyle}>
                    <option value="onsite">Onsite</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                </select>

                <input
                    type="datetime-local"
                    name="validity"
                    value={formData.validity.slice(0, 16)}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            validity: new Date(e.target.value).toISOString()
                        }))
                    }
                    className={boxStyle}
                />

                <input type="text" name="job_link" value={formData.job_link} onChange={handleChange} placeholder="Job Link" className={boxStyle} />

                <textarea name="job_description" value={formData.job_description} onChange={handleChange} placeholder="Job Description" className={boxStyle} />

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700 transition">
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default PostJob;

