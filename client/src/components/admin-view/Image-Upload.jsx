import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFiles,
  setImageFiles,
  imageLoadingStates,
  uploadedImageUrls,
  setUploadedImageUrls,
  setImageLoadingStates,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRefs = useRef([]);

  const handleImageFileChange = (event, index) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = selectedFile;
      setImageFiles(newImageFiles);
      uploadImageToCloudinary(selectedFile, index);
    }
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);
    const newUploadedImageUrls = [...uploadedImageUrls];
    newUploadedImageUrls[index] = "";
    setUploadedImageUrls(newUploadedImageUrls);
    if (inputRefs.current[index]) inputRefs.current[index].value = "";
  };

  const uploadImageToCloudinary = async (file, index) => {
    const newImageLoadingStates = [...imageLoadingStates];
    newImageLoadingStates[index] = true;
    setImageLoadingStates(newImageLoadingStates);

    const data = new FormData();
    data.append("my_file", file);

    try {
      const response = await axios.post(
        "https://ab-tech-backend.vercel.app/api/admin/products/upload-image",
        data
      );
      if (response?.data?.success) {
        const newUploadedImageUrls = [...uploadedImageUrls];
        newUploadedImageUrls[index] = response.data.result.url;
        setUploadedImageUrls(newUploadedImageUrls);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      newImageLoadingStates[index] = false;
      setImageLoadingStates(newImageLoadingStates);
    }
  };

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-base sm:text-lg font-semibold mb-2 block">Upload Images</Label>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border-2 border-dashed rounded-lg p-3 sm:p-4 relative hover:border-gray-400 transition-colors"
          >
            <Input
              id={`image-upload-${index}`}
              type="file"
              className="hidden"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(event) => handleImageFileChange(event, index)}
              disabled={isEditMode}
            />
            {!imageFiles[index] ? (
              <Label
                htmlFor={`image-upload-${index}`}
                className="flex flex-col items-center h-20 cursor-pointer"
              >
                <img
                  src="/src/assets/photo.png"
                  alt="Upload icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 mb-2"
                />
                <span className="text-xs sm:text-sm text-center">Upload</span>
              </Label>
            ) : imageLoadingStates[index] ? (
              <Skeleton className="h-16 sm:h-20 bg-gray-100 rounded-md" />
            ) : (
              <div className="flex flex-col items-center justify-between">
                <img
                  src={URL.createObjectURL(imageFiles[index])}
                  alt={`Preview ${index}`}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mb-2"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-gray-200 hover:bg-gray-300 hover:text-red-600"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✕
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImageUpload;