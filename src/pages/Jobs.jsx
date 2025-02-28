import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom"; // To link to specific job detail pages

const Jobs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 py-10 px-5">
      {/* Header */}
      <div className="flex items-center mb-8">
        <FaBriefcase className="text-blue-600 text-4xl mr-3" />
        <h1 className="text-4xl font-semibold text-blue-600">Job Portal</h1>
      </div>

      {/* Job Listings Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Available Jobs</h2>
        
        {/* Example Job Listings */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">Frontend Developer</h3>
            <p className="text-gray-600">Company: TCS Ltd.</p>
            <p className="text-gray-500">Location: Remote</p>
            <Link to="/jobs/1" className="text-blue-600 mt-2 border-b-0 border-blue-600">
            <button className="mr-4 bg-white text-blue-600 px-4 py-2 rounded">View Job</button>
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">Backend Developer</h3>
            <p className="text-gray-600">Company: Infonatice Ltd</p>
            <p className="text-gray-500">Location: New York</p>
            <Link to="/jobs/2" className="text-blue-600 mt-2 border-b-0 border-blue-600">
            <button className="mr-4 bg-white text-blue-600 px-4 py-2 rounded">View Job</button>
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">UI/UX Designer</h3>
            <p className="text-gray-600">Company: DesignCo</p>
            <p className="text-gray-500">Location: Remote</p>
            <Link to="/jobs/3" className="text-blue-600 mt-2 border-b-0 border-blue-600">
            <button className="mr-4 bg-white text-blue-600 px-4 py-2 rounded">View Job</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Upcoming Jobs</h2>
        
        {/* Example Job Listings */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">Frontend Developer</h3>
            <p className="text-gray-600">Company: XYZ Corp</p>
            <p className="text-gray-500">Location: Remote</p>
            <Link to="/jobs/1" className="text-blue-600 mt-2 border-b-0 border-blue-600">
            <button className="mr-4 bg-white text-blue-600 px-4 py-2 rounded">View Job</button>
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">Backend Developer</h3>
            <p className="text-gray-600">Company: ABC Ltd</p>
            <p className="text-gray-500">Location: New York</p>
            <Link to="/jobs/2" className="text-blue-600 mt-2 border-b-0 border-blue-600">
            <button className="mr-4 bg-white text-blue-600 px-4 py-2 rounded">View Job</button>
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">UI/UX Designer</h3>
            <p className="text-gray-600">Company: DesignCo</p>
            <p className="text-gray-500">Location: Remote</p>
            <Link to="/jobs/3" className="text-blue-600 mt-2 border-b-2 border-blue-600">
              View Job
            </Link>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default Jobs;
