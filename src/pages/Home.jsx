import { FaUsers, FaComments, FaBriefcase } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-black-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Alumni Connect</h1>
          <div>

            <button className="mr-4 bg-white text-blue-600 px-4 py-2 rounded">Login</button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded">Register</button>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-blue-500 text-white">
        <h2 className="text-4xl font-bold mb-4">Reconnect, Collaborate, and Grow</h2>
        <p className="text-lg mb-6">
          Join our platform to connect with alumni, explore opportunities, and build relationships.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded">Get Started</button>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <FaUsers className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Connect</h3>
          <p className="text-gray-600">Find and connect with alumni from your institution.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md text-center">
          <FaComments className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Engage</h3>
          <p className="text-gray-600">Join discussions and share your experiences.</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md text-center">
          <FaBriefcase className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-xl font-semibold">Opportunities</h3>
          <p className="text-gray-600">Explore job opportunities and mentorship programs.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
