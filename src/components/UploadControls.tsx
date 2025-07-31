import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, UploadIcon } from "@radix-ui/react-icons";

interface UploadControlsProps {
  setShowCamera: (show: boolean) => void;
  setImage: (img: string | null) => void;
}

const UploadControls: React.FC<UploadControlsProps> = ({ setShowCamera, setImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border">
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-700">
        Digitize Your Memories
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Upload a photo or use your camera to get started. Our AI will help
        you digitize and enhance your memories!
      </p>
      <div className="flex flex-col gap-4 w-full">
        {/* Hidden file input for image upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {/* Button to trigger file input */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon /> Upload a Picture
        </Button>
        {/* Button to start the webcam */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          onClick={() => setShowCamera(true)}
        >
          <CameraIcon /> Use Camera
        </Button>
      </div>
    </div>
  );
};

export default UploadControls;