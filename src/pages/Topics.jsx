import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const topics = [
  { id: 1, title: "Web Development", description: "Learn front-end, back-end, and full-stack development." },
  { id: 2, title: "Data Science", description: "Dive into machine learning, AI, and data analysis." },
  { id: 3, title: "UX/UI Design", description: "Learn the principles of designing great user experiences." }
];

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-black-100 py-10 px-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Left Side - Title */}
        <div className="flex items-center">
          <FaSearch className="text-blue-600 text-4xl mr-3" />
          <h1 className="text-4xl font-semibold text-white-600">Topics</h1>
        </div>

        {/* Right Side - Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-blue-300 rounded-full px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white-600"
          />
          <FaSearch className="absolute left-3 top-3 text-blue-500" />
        </div>
      </div>

      {/* Topics Section */}
      <div className="bg-black rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-white-600 mb-4">Explore Topics</h2>

        <div className="space-y-4">
          {filteredTopics.length > 0 ? (
            filteredTopics.map(topic => (
              <div key={topic.id} className="bg-black-100 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
                <h3 className="text-xl font-medium text-blue-600">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
                <Link to={`/topics/${topic.id}`} className="text-blue-600 mt-2 border-b-2 border-blue-600">
                  Explore Topic
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No topics found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topics;