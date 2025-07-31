import React from "react";

interface ImagePreviewProps {
  image: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => (
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
);

export default ImagePreview;