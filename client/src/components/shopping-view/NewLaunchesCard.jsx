import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

const NewLaunchesCard = ({ product, handleAddtoCart }) => {
  const firstImage = product?.images?.[0] || "";
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={firstImage}
          alt={product?.title}
        />
        <div className="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1 rounded-md">
          🎉 New Launch
        </div>
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-sm px-2 py-1 rounded-md">
          {product?.brand}
        </div>
      </div>

      <div className="p-4">
        <p className="text-lg font-semibold">{product?.title}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`${
              product?.salePrice > 0
                ? "line-through text-gray-500"
                : "text-black"
            } text-lg font-semibold`}
          >
            TK{product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-semibold text-primary">
              TK{product?.salePrice}
            </span>
          )}
        </div>

        <div className="flex items-center mt-2">
          <Star className="w-5 h-5" />
          <p className="ml-1 text-sm">4.9</p>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking the button
            handleAddtoCart(product?._id);
          }}
          className="w-full mt-4 bg-primary hover:bg-primary-dark transition-colors duration-300"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default NewLaunchesCard;
