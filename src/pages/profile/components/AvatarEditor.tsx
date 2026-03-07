"use client";

import { useState } from "react";
import { IconUser, IconCamera } from "@tabler/icons-react";

interface AvatarEditorProps {
  photoUrl?: string | null;
  onPhotoSelect: (file: File) => void;
}

export function AvatarEditor({ photoUrl, onPhotoSelect }: AvatarEditorProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const handleCameraClick = () => {
    inputRef?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
    }
  };

  return (
    <div className="relative">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <IconUser size={40} className="text-gray-500" />
        )}
      </div>
      <input
        ref={setInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={handleCameraClick}
        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
      >
        <IconCamera size={16} className="text-gray-600" />
      </button>
    </div>
  );
}
