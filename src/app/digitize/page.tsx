"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, UploadIcon } from "@radix-ui/react-icons";

export default function DigitizePage() {
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start webcam
  const startCamera = async () => {
    setShowCamera(true);
    if (navigator.mediaDevices && videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  };

  // Capture photo from webcam
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 256, 256);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setImage(dataUrl);
        // Stop the camera
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        setShowCamera(false);
      }
    }
  };

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex flex-col md:flex-row h-full min-h-screen">
        {/* Left Page */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-8">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border">
            <h1 className="text-3xl font-bold mb-2 text-center text-blue-700">
              Digitize Your Memories
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              Upload a photo or use your camera to get started. Our AI will help
              you digitize and enhance your memories!
            </p>
            <div className="flex flex-col gap-4 w-full">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon /> Upload a Picture
              </Button>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={startCamera}
              >
                <CameraIcon /> Use Camera
              </Button>
            </div>
          </div>
        </div>

        {/* Right Page */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white border">
          <div className="flex flex-col items-center">
            {showCamera ? (
              <div className="flex flex-col items-center">
                <video
                  ref={videoRef}
                  width={256}
                  height={256}
                  autoPlay
                  className="rounded mb-2"
                />
                <canvas
                  ref={canvasRef}
                  width={256}
                  height={256}
                  style={{ display: "none" }}
                />
                <Button
                  className="mt-2 bg-blue-600 text-white"
                  onClick={capturePhoto}
                >
                  Capture Photo
                </Button>
              </div>
            ) : (
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border mb-4 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-lg">
                    Preview will appear here
                  </span>
                )}
              </div>
            )}
            <p className="text-gray-500 text-center">
              Once you upload or capture a photo, a preview will be shown here.
            </p>
          </div>
        </div>
        </div>
    </main>
  );
}