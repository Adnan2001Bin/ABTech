import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { FileIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const ProductImageUpload = ({
  imageFiles,
  setImageFiles,
  imageLoadingState,
  setImageLoadingState,
}) => {
  const inputRefs = useRef([]);
  const [errors, setErrors] = useState([]);

  // Handle file selection
  const handleImageFileChange = (event, index) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // Basic file validation
      if (!selectedFile.type.startsWith("image/")) {
        setErrors((prev) => {
          const newErrors = [...prev];
          newErrors[index] = "Please upload a valid image file.";
          return newErrors;
        });
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => {
          const newErrors = [...prev];
          newErrors[index] = "File size must be less than 5MB.";
          return newErrors;
        });
        return;
      }

      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = "";
        return newErrors;
      });

      // Update imageFiles state
      setImageFiles((prev) => {
        const newFiles = [...prev];
        newFiles[index] = selectedFile;
        return newFiles;
      });
    }
  };

  // Handle file removal
  const handleRemoveFile = (index) => {
    setImageFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });
    setErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = "";
      return newErrors;
    });
  };

  return (
    <div className="space-y-4">
      <Label>Upload Images (Up to 4)</Label>
      <div className="flex gap-5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-1/5 border-2 border-dashed rounded-lg p-4 relative"
          >
            <Input
              id={`image-upload-${index}`}
              className="hidden"
              type="file"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleImageFileChange(e, index)}
              accept="image/*"
            />

            {!imageFiles[index] ? (
              <Label htmlFor={`image-upload-${index}`} className="cursor-pointer">
                <img
                  className="w-10 h-10 text-muted-foreground mb-2 mx-auto"
                  src="/src/assets/photo.png"
                  alt="Upload icon"
                />
                <span className="text-sm text-center block">Upload</span>
              </Label>
            ) : imageLoadingState ? (
              <Skeleton className="h-10 bg-gray-100" />
            ) : (
              <div className="flex flex-col items-center justify-between">
                <img
                  src={URL.createObjectURL(imageFiles[index])}
                  alt={`Uploaded preview ${index}`}
                  className="w-16 h-16 object-cover rounded-md mb-2"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-gray-200 hover:text-foreground"
                  onClick={() => handleRemoveFile(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            )}

            {errors[index] && (
              <p className="text-red-500 text-xs mt-1">{errors[index]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageUpload;