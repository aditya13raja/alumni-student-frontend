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
        <div className="relative flex flex-col w-full min-h-[calc(100vh-5rem)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            {/* Header */}
            <header className="px-6 py-4 border-b border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--muted))]">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-center uppercase">
                    {topic}
                </h1>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 mb-10 space-y-4 scrollbar-hide">
                {chats.length === 0 ? (
                    <div className="text-center text-muted-foreground text-lg">
                        Loading...
                    </div>
                ) : (
                        chats.map((chat) => {
                            const dateLabel = formatDateLabel(chat.Timestamp);
                            const showDate = dateLabel !== lastDate;
                            lastDate = dateLabel;

                            return (
                                <div key={chat.id}>
                                    {showDate && (
                                        <div className="text-center text-xs text-muted-foreground my-4">
                                            <span className="bg-[hsl(var(--muted))] px-4 py-1 rounded-full">
                                                {dateLabel}
                                            </span>
                                        </div>
                                    )}
                                    <ChatMessage chat={chat} currentUsername={username} />
                                </div>
                            );
                        })
                    )}
                <div ref={bottomRef}></div>
            </div>

            {/* Chat Input */}
            <form
                onSubmit={handleSendMessage}
                className="w-full absolute bottom-0 px-4 md:px-8 py-4 bg-[hsl(var(--muted))] border-t border-[hsl(var(--border))] flex items-center gap-3"
            >
                <input
                    type="text"
                    className="flex-1 px-4 py-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="p-3 rounded-xl bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/90] text-white transition"
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
};

export default Chats;

