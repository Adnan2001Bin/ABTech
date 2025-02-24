import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "@/store/shop/product-slice";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, isLoading } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  const handleSuccessToast = () => {
    toast.success("Product added to cart", { position: "top-center", autoClose: 2000 });
  };

  const handleAddtoCart = (getCurrentProductId) => {
    dispatch(addToCart({ userId: user?._id, productId: getCurrentProductId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?._id));
          handleSuccessToast();
        }
      }
    );
  };

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Skeleton className="w-full h-64 sm:h-80 lg:h-[500px] rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="w-3/4 h-6 sm:h-8 rounded-full" />
            <Skeleton className="w-full h-3 sm:h-4 rounded-full" />
            <Skeleton className="w-2/3 h-3 sm:h-4 rounded-full" />
            <Skeleton className="w-1/2 h-3 sm:h-4 rounded-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 sm:w-20 h-5 sm:h-6 rounded-full" />
              <Skeleton className="w-12 sm:w-16 h-5 sm:h-6 rounded-full" />
            </div>
            <Skeleton className="w-24 h-3 sm:h-4 rounded-full" />
            <Skeleton className="w-24 h-3 sm:h-4 rounded-full" />
            <Skeleton className="w-24 h-3 sm:h-4 rounded-full" />
            <Skeleton className="w-full h-8 sm:h-10 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!productDetails) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="w-full h-64 sm:h-80 lg:h-[500px] overflow-hidden rounded-lg bg-gray-100">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full h-full"
          >
            {productDetails.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${productDetails.title} - Image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{productDetails.title}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {productDetails.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary">
              ${productDetails.salePrice > 0 ? productDetails.salePrice : productDetails.price}
            </span>
            {productDetails.salePrice > 0 && (
              <span className="text-base sm:text-lg lg:text-xl line-through text-muted-foreground">
                ${productDetails.price}
              </span>
            )}
          </div>
          <div className="text-sm sm:text-base">
            <span className="text-muted-foreground">Category: </span>
            <span className="font-semibold">{productDetails.category}</span>
          </div>
          <div className="text-sm sm:text-base">
            <span className="text-muted-foreground">Brand: </span>
            <span className="font-semibold">{productDetails.brand}</span>
          </div>
          <div className="text-sm sm:text-base">
            <span className="text-muted-foreground">Stock: </span>
            <span className="font-semibold">
              {productDetails.totalStock > 0 ? `${productDetails.totalStock} available` : "Out of Stock"}
            </span>
          </div>
          <Button
            disabled={productDetails.totalStock === 0}
            className="w-full py-2 sm:py-3 text-sm sm:text-base bg-primary hover:bg-primary-dark"
            onClick={() => handleAddtoCart(productDetails?._id)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;