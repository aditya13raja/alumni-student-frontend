import { FaBell, FaEnvelope, FaUsers, FaChartBar } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function RightSidebar() {
  const theme = useSelector((state) => state.theme); // Access theme from Redux store

  const darkModeStyles = "bg-black dark:bg-gray-900 text-white";
  const lightModeStyles = "bg-white dark:bg-gray-200 text-black";

  return (
    <div className={`right-sidebar flex flex-col relative rounded-2xl w-60 h-[98vh] my-[1vh] py-[5vh] px-5 fixed right-0 top-0 ${theme === "dark" ? darkModeStyles : lightModeStyles}`}>
      {/* Title */}
      <div className="text-2xl font-semibold mb-4">Activity</div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Activity Section */}
      <div className="text-lg space-y-4">
        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-full cursor-pointer">
          <FaBell className="text-primary text-2xl" />
          <p>Notifications</p>
        </div>

        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-full cursor-pointer">
          <FaEnvelope className="text-primary text-2xl" />
          <p>Messages</p>
        </div>

        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-full cursor-pointer">
          <FaUsers className="text-primary text-2xl" />
          <p>Connections</p>
        </div>

        <div className="flex items-center gap-3 hover:bg-secondary p-3 rounded-full cursor-pointer">
          <FaChartBar className="text-primary text-2xl" />
          <p>History</p>
        </div>
      </div>
    </div>
  );
}