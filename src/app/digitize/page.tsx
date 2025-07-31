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
        {/* Left: Controls */}
        <div className="flex-1 flex items-center justify-center">
          <UploadControls setShowCamera={setShowCamera} setImage={setImage} />
        </div>
        {/* Right: Preview or Camera */}
        <div className="flex-1 flex items-center justify-center bg-white rounded-xl shadow-lg border p-8">
          {showCamera ? (
            <CameraCapture
              videoRef={videoRef}
              canvasRef={canvasRef}
              setImage={setImage}
              setShowCamera={setShowCamera}
            />
          ) : (
            <ImagePreview image={image} />
          )}
        </div>
      </div>
    </main>
  );
}