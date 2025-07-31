"use client";
import React, { useRef, useState } from "react";
import UploadControls from "@/components/UploadControls";
import CameraCapture from "@/components/CameraCapture";
import ImagePreview from "@/components/ImagePreview";

export default function DigitizePage() {
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl p-6">
        {/* Left: Controls with Preview or Camera */}
        <div className="flex-1 flex items-center justify-center">
          {showCamera ? (
            <CameraCapture
              videoRef={videoRef}
              canvasRef={canvasRef}
              setImage={setImage}
              setShowCamera={setShowCamera}
            />
          ) : (
            <UploadControls setShowCamera={setShowCamera} setImage={setImage} image={image} />
          )}
        </div>
        {/* Right: Placeholder for processed text */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center justify-center border">
          <span className="text-gray-400 text-lg text-center">
            your processed text will appear here
          </span>
        </div>
      </div>
    </main>
  );
}