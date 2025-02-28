import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const topics = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 py-10 px-5">
      {/* Header */}
      <div className="flex items-center mb-8">
        <FaSearch className="text-blue-600 text-4xl mr-3" />
        <h1 className="text-4xl font-semibold text-blue-600">Topics</h1>
      </div>

      {/* Topics Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Explore Topics</h2>

        {/* Example Topic Listings */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">Web Development</h3>
            <p className="text-gray-600">Learn front-end, back-end, and full-stack development.</p>
            <Link to="/topics/1" className="text-blue-600 mt-2 border-b-2 border-blue-600">
              Explore Topic
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">Data Science</h3>
            <p className="text-gray-600">Dive into machine learning, AI, and data analysis.</p>
            <Link to="/topics/2" className="text-blue-600 mt-2 border-b-2 border-blue-600">
              Explore Topic
            </Link>
          </div>

          <div className="bg-gray-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            <h3 className="text-xl font-medium text-blue-600">UX/UI Design</h3>
            <p className="text-gray-600">Learn the principles of designing great user experiences.</p>
            <Link to="/topics/3" className="text-blue-600 mt-2 border-b-2 border-blue-600">
              Explore Topic
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default topics;
