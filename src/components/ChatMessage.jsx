const ChatMessage = ({ chat, currentUsername }) => {
    const isOwnMessage = chat.username === currentUsername;

    // alignment & background
    const alignmentClass = isOwnMessage ? "justify-end" : "justify-start";
    const backgroundColor = isOwnMessage
        ? "#b6e4e8" // more saturated light green-blue
        : chat.role === "alumni"
            ? "#cddaf6" // more saturated soft blue
            : "#ececec"; // light slate/gray (tailwind's slate-100)

    const formattedTime = new Date(chat.Timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className={`flex ${alignmentClass} w-full`}>
            <div
                className="px-4 py-2 my-2 rounded-lg text-sm shadow max-w-[80%]"
                style={{
                    backgroundColor,
                    color: "#1f2937", // dark gray text for contrast
                }}
            >
                {!isOwnMessage && (
                    <h3 className="font-semibold text-xs text-gray-700 mb-1">
                        {chat.username}
                    </h3>
                )}
                <p className="text-base break-words">{chat.msg_content}</p>
                <div className="text-[10px] text-right opacity-70">{formattedTime}</div>
            </div>
        </div>
    );
};

export default ChatMessage;

