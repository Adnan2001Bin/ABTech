import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/Config";
import React, { useState } from "react";

const AdminAdditems = () => {
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState(Array(4).fill(null)); // Initialize with 4 null values
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const onSubmit = () => {
    // Handle form submission
  };

  return (
    <div className="py-4 px-8 w-3/5">
      <div className="w-3/4">
        <ProductImageUpload
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
        />
      </div>
      <CommonForm
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        buttonText="Add"
        formControls={addProductFormElements}
        formClassName="space-y-4 w-3/4 mt-8"
        inputClassName="text-black rounded-sm bg-white outline-slate-400"
        textareaClassName="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-slate-400 border-2"
        selectClassName="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-400 border-slate-400 border-2"
        buttonClassName="w-1/2 h-12 py-2.5 rounded-lg bg-black hover:white font-bold text-lg"
        labelClassName="text-gray-700"
      />
    </div>
  );
};

export default AdminAdditems;