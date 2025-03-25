import { useState, useEffect } from "react";
import { FaBookOpen, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filteredStories = storiesData.filter(
    (story) =>
      story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} py-10 px-5`}>
      {/* Header with Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <FaBookOpen className="text-blue-600 text-4xl mr-3" />
          <h1 className="text-4xl font-semibold">Stories</h1>
        </div>
        <input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
        />
      </div>

      {/* Stories Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md p-6 flex flex-col items-center transition duration-300 ease-in-out transform hover:bg-blue-100 hover:scale-105 cursor-pointer ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
          >
            <img
              src={story.image}
              alt={story.author}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold text-blue-600">{story.author}</h2>
            <div className="flex space-x-3 mt-2">
              <FaFacebook className="text-gray-500 cursor-pointer hover:text-blue-600 transition duration-300" />
              <FaTwitter className="text-gray-500 cursor-pointer hover:text-blue-400 transition duration-300" />
              <FaLinkedin className="text-gray-500 cursor-pointer hover:text-blue-700 transition duration-300" />
            </div>
            <h3 className="text-xl font-medium mt-3">{story.title}</h3>
            <p className="text-gray-600 text-center">{story.description}</p>
            <Link to={story.link} className="text-blue-600 mt-2 border-b-2 border-blue-600 inline-block">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const storiesData = [
  {
    author: "Aman",
    title: "Data Science Adventures",
    description: "Exploring the world of AI, ML, and Big Data.",
    image: "./src/assets/image.png",
    link: "/stories/1",
  },
  {
    author: "Aditya",
    title: "Journey into Web Development",
    description: "A developer's experience transitioning into full-stack development.",
    image: "./src/assets/image.png",
    link: "/stories/2",
  },
  {
    author: "Riya",
    title: "Data Science Adventures",
    description: "Exploring the world of AI, ML, and Big Data.",
    image: "./src/assets/image.png",
    link: "/stories/3",
  },
  {
    author: "Vishal",
    title: "Journey into Web Development",
    description: "A developer's experience transitioning into full-stack development.",
    image: "./src/assets/image.png",
    link: "/stories/1",
  },
  {
    author: "Nishtha",
    title: "Data Science Adventures",
    description: "Exploring the world of AI, ML, and Big Data.",
    image: "./src/assets/image.png",
    link: "/stories/2",
  },
  {
    author: "Ashutosh",
    title: "From Designer to UX/UI Expert",
    description: "Insights on creating seamless user experiences.",
    image: "./src/assets/image.png",
    link: "/stories/3",
  },
];

export default Stories;
