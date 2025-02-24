import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { deleteProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useDispatch } from "react-redux";

function AdminProductTile({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstImage = product?.images?.[0] || "";

  const handleEdit = () => {
    localStorage.setItem("editProductData", JSON.stringify(product));
    navigate("/admin/additems");
  };

  const handleDeleteProduct = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) dispatch(fetchAllProducts());
    });
  };

  return (
    <Card className="w-full max-w-xs sm:max-w-sm mx-auto overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        {firstImage && (
          <img
            src={firstImage}
            alt={product?.title}
            className="w-full h-40 sm:h-48 md:h-56 object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-end justify-end p-2">
          <Button
            onClick={handleEdit}
            className="bg-white text-black hover:bg-gray-100 mr-2 text-xs sm:text-sm"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteProduct(product?._id)}
            className="bg-white text-black hover:bg-red-100 text-xs sm:text-sm"
          >
            Delete
          </Button>
        </div>
      </div>
      <CardContent className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-100">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 line-clamp-1">
          {product?.title}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-sm sm:text-lg font-semibold text-gray-700`}
          >
            {product?.price} BDT
          </span>
          {product?.salePrice > 0 && (
            <span className="text-sm sm:text-lg font-bold text-green-600">
              {product?.salePrice} BDT
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{product?.brand}</p>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{product?.category}</p>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-100">
        <div className="flex justify-between items-center w-full text-xs sm:text-sm text-gray-600">
          <span>Stock: {product?.totalStock}</span>
          <span>Rating: {product?.averageReview}/5</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;