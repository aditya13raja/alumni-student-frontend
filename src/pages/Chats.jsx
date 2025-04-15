import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";

const Chats = () => {
    const { topic } = useParams();
    const [chats, setChats] = useState([]);
    const { username } = useSelector((state) => state.user.currentUser);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const bottomRef = useRef(null);

    // Set theme
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Fetch chats
    useEffect(() => {
        const getAllChats = async () => {
            const response = await fetch(`/api/chat/get/${topic}`);
            const data = await response.json();
            setChats(data.chats);
        };

        getAllChats();
    }, [topic]);

    // Auto-scroll to bottom
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

    return (
        <div className="min-h-screen px-4 py-6 bg-secondary" >
            <h1 className="uppercase font-bold text-4xl text-center text-primary tracking-wide mb-6">
                {topic}
            </h1>

            {chats.length === 0 ? (
                <div className="text-white text-center">No chats found</div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedChats).map(([dateKey, messages]) => (
                        <div key={dateKey}>
                            <div className="text-center text-gray-400 text-xs mb-2">
                                <span className="bg-gray-800 p-2 rounded-sm">
                                    {formatDate(dateKey)}
                                </span>
                            </div>
                            {messages.map((chat) => (
                                <ChatMessage
                                    key={chat.id}
                                    chat={chat}
                                    currentUsername={username}
                                />
                            ))}
                        </div>
                    ))}
                    <div ref={bottomRef}></div>
                </div>
            )}
        </div>
    );
};

export default Chats;

