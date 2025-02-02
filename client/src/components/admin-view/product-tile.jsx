import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        {firstImage && (
          <img
            src={firstImage}
            alt={product?.title}
            className="w-full h-48 sm:h-64 object-cover"
          />
        )}
        {/* Overlay for buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-end justify-end p-2">
          <Button
            onClick={handleEdit}
            className="bg-white text-black hover:bg-gray-100 mr-2"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteProduct(product?._id)}
            className="bg-white text-black hover:bg-gray-100"
          >
            Delete
          </Button>
        </div>
      </div>

      <CardContent className="p-4 bg-gradient-to-r from-green-50 to-emerald-100">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {product?.title}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-gray-700`}
          >
            {product?.price} BDT
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold text-green-600">
              {product?.salePrice} BDT
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product?.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 bg-gradient-to-r from-green-50 to-emerald-100">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-600">
            Stock: {product?.totalStock}
          </span>
          <span className="text-sm text-gray-600">
            Rating: {product?.averageReview}/5
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
