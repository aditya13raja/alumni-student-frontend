import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "TCS Ltd.", location: "Remote", buttonText: "Apply Now" },
  { id: 2, title: "Backend Developer", company: "Infonatice Ltd", location: "New York", buttonText: "Apply Now" },
  { id: 3, title: "UI/UX Designer", company: "DesignCo", location: "Remote", buttonText: "Apply Now" }
];

const upcomingJobs = [
  { id: 4, title: "Frontend Developer", company: "XYZ Corp", location: "Remote", buttonText: "Apply Now" },
  { id: 5, title: "Backend Developer", company: "ABC Ltd", location: "New York", buttonText: "Apply Now" },
  { id: 6, title: "UI/UX Designer", company: "DesignCo", location: "Remote", buttonText: "Apply Now" }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filterJobs = (jobList) => 
    jobList.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-transparent text-black"} py-10 px-5`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <FaBriefcase className="text-blue-600 text-4xl mr-3" />
          <h1 className="text-4xl font-semibold">Job Portal</h1>
        </div>
        <input
          type="text"
          placeholder="Search Jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-blue-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <JobSection title="Available Jobs" jobs={filterJobs(jobs)} theme={theme} />
      <JobSection title="Upcoming Jobs" jobs={filterJobs(upcomingJobs)} theme={theme} />
    </div>
  );
};

const JobSection = ({ title, jobs, theme }) => (
  <div className={`bg-${theme === "dark" ? "gray-800" : "white"} rounded-lg shadow-md p-6 mt-6`}>
    <h2 className="text-2xl font-semibold text-blue-600 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.length > 0 ? (
        jobs.map(job => (
          <div key={job.id} className={`bg-${theme === "dark" ? "gray-700" : "gray-100"} p-4 rounded-md hover:bg-blue-100 cursor-pointer transition duration-300`}>
            <h3 className="text-xl font-medium text-blue-600">{job.title}</h3>
            <p className="text-gray-600">Company: {job.company}</p>
            <p className="text-gray-500">Location: {job.location}</p>
            <div className="mt-2">
              <Link to={`/jobs/${job.id}`} className="text-blue-600">
                <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-200">
                  {job.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No jobs found matching your search criteria.</p>
      )}
    </div>
  </div>
);

export default Jobs;
