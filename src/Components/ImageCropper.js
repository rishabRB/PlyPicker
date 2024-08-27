"use client"

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/Components/cropImage"
import { enqueueSnackbar } from "notistack";

const ImageCropModal = ({ onClose, onCropComplete, imageUrl }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const handleCrop = async () => {
    try{
        const croppedImage = await getCroppedImg(imageUrl, croppedArea);
        onCropComplete(croppedImage);
        onClose();
    }
    catch(err){
        enqueueSnackbar("Unable to crop image",{variant : "error"})
        onClose()
    }

  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold uppercase text-orange-400">Crop Your Image</h2>
          <button onClick={onClose} className="text-xl text-orange-400 font-bold">&times;</button>
        </div>
        <div className="relative w-full h-72 bg-gray-800 mb-4">
          {imageUrl ? (
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={onCropChange}
              onCropComplete={onCropCompleteHandler}
              onZoomChange={onZoomChange}
            />
          ) : (
            <p className="text-center text-orange-400 text-4xl animate-bounce">...</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-orange-400 text-white"
          >
            Crop Image
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-400 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
