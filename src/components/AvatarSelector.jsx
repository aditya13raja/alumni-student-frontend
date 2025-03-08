import { useState } from "react";

const presetAvatars = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=2",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
];

export default function AvatarSelector({ avatar, onAvatarChange }) {
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result);
        onAvatarChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {selectedAvatar ? (
          <img src={selectedAvatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-700">AV</span>
        )}
      </div>

      <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />

      <div className="flex gap-2 mt-4">
        {presetAvatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className="w-12 h-12 rounded-full cursor-pointer border hover:border-blue-500"
            onClick={() => {
              setSelectedAvatar(avatar);
              onAvatarChange(avatar);
            }}
          />
        ))}
      </div>
    </div>
  );
}
