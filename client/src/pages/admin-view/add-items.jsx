import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/Config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminAdditems = () => {
  const location = useLocation();

  const initialFormData = {
    images: [],
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState(Array(4).fill(null));
  const [uploadedImageUrls, setUploadedImageUrls] = useState(Array(4).fill(""));
  const [imageLoadingStates, setImageLoadingStates] = useState(
    Array(4).fill(false)
  );
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedProductData = JSON.parse(
      localStorage.getItem("editProductData")
    );
    console.log("storedProductData", storedProductData);

    if (storedProductData) {
      setFormData({
        images: storedProductData.images,
        title: storedProductData.title,
        description: storedProductData.description,
        category: storedProductData.category,
        brand: storedProductData.brand,
        price: storedProductData.price,
        salePrice: storedProductData.salePrice,
        totalStock: storedProductData.totalStock,
        averageReview: storedProductData.averageReview,
      });
      setUploadedImageUrls(storedProductData.images);
      setCurrentEditedId(storedProductData._id);
      localStorage.removeItem("editProductData");
    } else {
      setFormData(initialFormData);
      setUploadedImageUrls(Array(4).fill(""));
      setCurrentEditedId(null);
    }
  }, []);

  const handleSuccessToast = () => {
    toast.success("Product added successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const filteredImages = uploadedImageUrls.filter((url) => url !== "");

    if (currentEditedId) {
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setCurrentEditedId(null);
        }
      });
    } else {
      dispatch(addNewProduct({ ...formData, images: filteredImages })).then(
        (data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setImageFiles(Array(4).fill(null));
            setUploadedImageUrls(Array(4).fill(""));
            setFormData(initialFormData);
            handleSuccessToast();
          }
        }
      );
    }
  };
  console.log("formData", formData);

  return (
    <div className="py-4 px-4 md:px-8 w-full md:w-3/5">
      <div className="w-full md:w-3/4">
        <ProductImageUpload
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          uploadedImageUrls={uploadedImageUrls}
          setUploadedImageUrls={setUploadedImageUrls}
          setImageLoadingStates={setImageLoadingStates}
          imageLoadingStates={imageLoadingStates}
          isEditMode={currentEditedId !== null}
        />
      </div>
      <CommonForm
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
        buttonText={currentEditedId ? "Update" : "Add"}
        formControls={addProductFormElements}
        formClassName="space-y-4 w-full md:w-3/4 mt-8"
        inputClassName="text-black rounded-sm bg-white outline-slate-400"
        textareaClassName="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-slate-400 border-2"
        selectClassName="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-400 border-slate-400 border-2"
        buttonClassName="w-full md:w-1/2 h-12 py-2.5 rounded-lg bg-black hover:white font-bold text-lg"
        labelClassName="text-gray-700"
      />
    </div>
  );
};

export default AdminAdditems;
