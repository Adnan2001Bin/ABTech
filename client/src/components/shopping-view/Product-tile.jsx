import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/Config";
import { useNavigate } from "react-router-dom";

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart }) => {
  const firstImage = product?.images?.[0] || "";
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card className="w-full max-w-xs sm:max-w-sm mx-auto overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative" onClick={handleProductClick}>
        {firstImage && (
          <img
            src={firstImage}
            alt={product?.title}
            className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-lg"
          />
        )}
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm animate-pulse">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm animate-pulse">
            {`Only ${product?.totalStock} left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm animate-bounce">
            Sale
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-3 sm:p-4 bg-slate-100">
        <h2 className="text-lg sm:text-xl font-bold mb-2 truncate">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2 text-xs sm:text-sm text-muted-foreground">
          <span>{categoryOptionsMap[product?.category]}</span>
          <span>{brandOptionsMap[product?.brand]}</span>
        </div>
        <div className="flex justify-between items-center text-sm sm:text-lg font-semibold text-primary">
          <span className={product?.salePrice > 0 ? "line-through" : ""}>
            TK{product?.price}
          </span>
          {product?.salePrice > 0 && <span>TK{product?.salePrice}</span>}
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 bg-slate-100">
        {product?.totalStock === 0 ? (
          <Button className="w-full text-xs sm:text-sm opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full text-xs sm:text-sm bg-primary hover:bg-primary-dark"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;