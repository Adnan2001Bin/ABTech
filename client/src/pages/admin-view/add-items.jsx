import React, { useEffect, useState } from "react";
import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/Config";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminAdditems = () => {
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
  const [imageLoadingStates, setImageLoadingStates] = useState(Array(4).fill(false));
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedProductData = JSON.parse(localStorage.getItem("editProductData"));
    if (storedProductData) {
      setFormData(storedProductData);
      setUploadedImageUrls(storedProductData.images);
      setCurrentEditedId(storedProductData._id);
      localStorage.removeItem("editProductData");
    }
  }, []);

  const handleSuccessToast = () => {
    toast.success("Product added successfully", { position: "top-center", autoClose: 2000 });
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
      dispatch(addNewProduct({ ...formData, images: filteredImages })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          setImageFiles(Array(4).fill(null));
          setUploadedImageUrls(Array(4).fill(""));
          setFormData(initialFormData);
          handleSuccessToast();
        }
      });
    }
  };

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full sm:w-3/4 lg:w-2/3 mx-auto">
        <ProductImageUpload
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          uploadedImageUrls={uploadedImageUrls}
          setUploadedImageUrls={setUploadedImageUrls}
          setImageLoadingStates={setImageLoadingStates}
          imageLoadingStates={imageLoadingStates}
          isEditMode={currentEditedId !== null}
        />
        <CommonForm
          onSubmit={onSubmit}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Update" : "Add"}
          formControls={addProductFormElements}
          formClassName="space-y-4 mt-6"
          inputClassName="text-black rounded-md bg-white border-gray-300"
          textareaClassName="border-gray-300 rounded-md p-2"
          selectClassName="border-gray-300 rounded-md p-2"
          buttonClassName="w-full sm:w-1/2 py-2.5 rounded-lg bg-black hover:bg-gray-800 text-white font-bold"
          labelClassName="text-gray-700"
        />
      </div>
    </div>
  );
};

export default AdminAdditems;