import { FaCircleUser, FaRoad, FaTrophy } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { FaSearch, FaDatabase, FaSuitcase } from "react-icons/fa";

export default function Sidebar() {
    return (
        <div className="flex flex-col relative rounded-2xl w-60 h-[98vh] bg-lightbg my-[1vh] py-[5vh] px-5"> 
            {/* Logo */}
            <div className="text-5xl absolute top-4">
                Logo
            </div>

            {/*Sections*/}
            <div className="py-20 text-2xl ">
                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <IoMdHome className="text-primary text-3xl" />
                    <p className="">Home</p>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <FaSearch className="text-primary"/>
                    <p className="">Topics</p>
                </div>
                
                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <FaDatabase className="text-primary"/>
                    <p className="">Resources</p>
                </div>
                
                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <FaSuitcase className="text-primary"/>
                    <p className="">Job portal</p>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <FaRoad className="text-primary"/>
                    <p className="">Roadmaps</p>
                </div>

                <div className="flex flex-row gap-3 items-center hover:bg-secondary p-3 mb-4 rounded-full">
                    <FaTrophy className="text-primary"/>
                    <p className="">Stories</p>
                </div>

            </div>
            
            {/* Account option */}
            <div className="account flex absolute bottom-4 righh-4 gap-4 items-center rounded-full hover:bg-secondary p-3">
                <FaCircleUser className="text-primary text-5xl"/>
                <div>
                    <p>Full Name</p>
                    <p className="text-gray-500">Username</p>
                </div>
                <PiDotsThreeOutlineVerticalFill />
            </div>
        </div>
    );
}
