import React from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, UploadIcon } from "@radix-ui/react-icons"; // Make sure you have these or use any icon library

export default function DigitizePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex flex-col md:flex-row h-full min-h-screen">
        {/* Left Page */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-8">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border">
            <h1 className="text-3xl font-bold mb-2 text-center ">Digitize Your Memories</h1>
            <p className="text-gray-600 mb-6 text-center">
              Upload a photo or use your camera to get started. Our AI will help you digitize and enhance your memories!
            </p>
            <div className="flex flex-col gap-4 w-full">
              <Button className="w-full  text-white flex items-center gap-2">
                <UploadIcon /> Upload a Picture
              </Button>
              <Button className="w-full text-white flex items-center gap-2">
                <CameraIcon /> Use Camera
              </Button>
            </div>
          </div>
        </div>

        {/* Right Page */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white border">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border mb-4">
              {/* Placeholder image or preview */}
              <span className="text-gray-400 text-lg">Preview will appear here</span>
            </div>
            <p className="text-gray-500 text-center">
              Once you upload or capture a photo, a preview will be shown here.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}