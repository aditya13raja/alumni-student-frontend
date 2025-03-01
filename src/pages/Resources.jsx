import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const resources = [
  { title: "Alumni Directory", description: "Search and connect with alumni based on your field, location, and interests.", link: "/resources/alumni-directory" },
  { title: "Mentorship Program", description: "Find a mentor who can guide you through your academic and career journey.", link: "/resources/mentorship" },
  { title: "Job & Internship Listings", description: "Explore job and internship opportunities posted by alumni.", link: "/resources/jobs-internships" },
  { title: "Alumni Webinars & Workshops", description: "Learn from alumni experts through webinars and workshops.", link: "./resources/webinars" },
  { title: "Networking Events & Socials", description: "Attend networking events to connect with alumni and fellow students.", link: "/resources/networking-events" },
  { title: "Alumni Scholarships & Funding", description: "Explore scholarships funded by alumni to support students.", link: "/resources/scholarships" },
  { title: "Exclusive Alumni Resources", description: "Access career resources and tools available exclusively for alumni and students.", link: "/resources/exclusive" },
];

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-black-100 py-10 px-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Left Side - Title */}
        <div className="flex items-center">
          <FaSearch className="text-blue-600 text-4xl mr-3" />
          <h1 className="text-4xl font-semibold text-white-600">Alumni-Student Connection Portal</h1>
        </div>

        {/* Right Side - Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-blue-300 rounded-full px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white-600"
          />
          <FaSearch className="absolute left-3 top-3 text-blue-500" />
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-black rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-white-600 mb-4">Explore Resources</h2>

        {/* Resource Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-black-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
              <h3 className="text-xl font-medium text-blue-600">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
              <Link to={resource.link} className="text-white-600 mt-2 border-b-2 border-blue-600">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;