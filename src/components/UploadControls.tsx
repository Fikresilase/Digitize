import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, UploadIcon } from "@radix-ui/react-icons";

interface UploadControlsProps {
  setShowCamera: (show: boolean) => void;
  setImage: (img: string | null) => void;
  image: string | null; // <-- Add this line
}


const UploadControls: React.FC<UploadControlsProps> = ({ setShowCamera, setImage, image }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraMode, setCameraMode] = useState(false);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Start camera
  const startCamera = async () => {
    setCameraMode(true);
    if (navigator.mediaDevices && videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraMode(false);
  };

  // Capture photo from webcam
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 256, 256);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border">
      <h1 className="text-3xl font-bold mb-2 text-center ">
        Digitize Your Memories
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Upload a photo or use your camera to get started. Our AI will help
        you digitize and enhance your memories!
      </p>
      {/* Image Preview or Camera */}
      <div id="image-preview" className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border mb-4 mx-auto overflow-hidden">
        {cameraMode ? (
          <>
            <video
              ref={videoRef}
              width={256}
              height={256}
              autoPlay
              className="object-contain w-full h-full rounded"
            />
            <canvas
              ref={canvasRef}
              width={256}
              height={256}
              style={{ display: "none" }}
            />
          </>
        ) : image ? (
          <img
            src={image}
            alt="Preview"
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-gray-400 text-lg">
            your image will appear here
          </span>
        )}
      </div>
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
          className="w-full text-white flex items-center gap-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon /> Upload a Picture
        </Button>
        {/* Camera button: toggles between start and capture */}
        {cameraMode ? (
          <Button
            className="w-full text-white flex items-center gap-2"
            onClick={capturePhoto}
          >
            <CameraIcon /> Capture Photo
          </Button>
        ) : (
          <Button
            className="w-full text-white flex items-center gap-2"
            onClick={startCamera}
          >
            <CameraIcon /> Use Camera
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadControls;