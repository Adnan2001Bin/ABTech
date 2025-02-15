import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/Config";
import { useNavigate } from "react-router-dom";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  const firstImage = product?.images?.[0] || "";
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative" onClick={handleProductClick}>
        {firstImage && (
          <img
            src={firstImage}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg transition-opacity duration-300 hover:opacity-90"
          />
        )}
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 animate-pulse">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 animate-pulse">
            {`Only ${product?.totalStock} items left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 animate-bounce">
            Sale
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-4 bg-slate-100">
        <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors duration-300">
          {product?.title}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[16px] text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[16px] text-muted-foreground">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            TK{product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-primary">
              TK{product?.salePrice}
            </span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="bg-slate-100">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-primary hover:bg-primary-dark transition-colors duration-300"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
