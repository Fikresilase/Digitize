import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface CameraCaptureProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setImage: (img: string | null) => void;
  setShowCamera: (show: boolean) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  videoRef,
  canvasRef,
  setImage,
  setShowCamera,
}) => {
  // Start camera on mount
  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices && videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };
    startCamera();

    // Cleanup: stop camera on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef]);

  // Capture photo from webcam
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 256, 256);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setImage(dataUrl);
        // Stop the camera stream
        if (videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
      }
    }
  };

  return (
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
  );
};

export default CameraCapture;