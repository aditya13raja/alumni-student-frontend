import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import Pusher from "pusher-js";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { Send, PhoneCall, Video } from "lucide-react";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Chats = () => {
    const { topic } = useParams();
    const [chats, setChats] = useState([]);
    const { username, role } = useSelector((state) => state.user.currentUser);
    const bottomRef = useRef(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [message, setMessage] = useState("");

    // Get all chats from db
    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch(`/api/chat/get/${topic}`);
            const data = await response.json();
            setChats(data.chats);
        };

        fetchChats();
    }, [topic]);

    // Real-time Pusher subscription
    useEffect(() => {
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        });

        const channel = pusher.subscribe(topic);
        channel.bind("new-event", (newChat) => {
            setChats((prevChats) => [...prevChats, newChat]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [topic]);

    // Scroll to bottom when chats update
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    // Format date as Today, Yesterday, or actual date
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();

        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";

        return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    };

    // Group chats by date
    const groupedChats = chats.reduce((groups, chat) => {
        const dateKey = new Date(chat.Timestamp).toDateString();
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(chat);
        return groups;
    }, {});

    // Format Date
    const formatDateLabel = (date) => {
        const d = dayjs(date);
        if (d.isToday()) return "Today";
        if (d.isYesterday()) return "Yesterday";
        return d.format("DD MMM YYYY");
    };

    let lastDate = null;

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (message.trim() === "") return;

        await fetch("/api/chat/send", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: topic,
                username: username,
                role: role,
                msg_content: message,
            }),
        });

        setMessage("")
    }

    return (
        <div className="bg-secondary overflow-hidden">
            <h1
                className="text-4xl font-bold text-center uppercase text-primary tracking-wide mb-8 m-0"
            >
                {topic}
            </h1>
            
            <div className="pb-12 px-2 overflow-y-auto scrollbar-hide">
            {chats.length === 0 ? (
                <div className="text-3xl font-semibold">Loading...</div>
            ) : (
                    chats.map((chat) => {
                        const dateLabel = formatDateLabel(chat.Timestamp);
                        const showDate = dateLabel !== lastDate;
                        lastDate = dateLabel;

                        return (
                            <div key={chat.id}>
                                {showDate && (
                                    <div className="text-center text-xs text-gray-400 my-2">
                                        <span className="bg-gray-800 p-2 rounded-sm">
                                            {dateLabel}
                                        </span>
                                    </div>
                                )}
                                <ChatMessage chat={chat} currentUsername={username} />
                            </div>
                        );
                    })
                )}
            </div>

            <div ref={bottomRef}></div>

            {/* Send Message */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
                <div className="bg-gray-800 text-white rounded-2xl p-4 shadow-lg flex items-center justify-between">
                    <input
                        type="text"
                        className="flex-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Chats;

