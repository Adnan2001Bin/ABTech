import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "@/store/shop/product-slice";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

// Import Swiper styles and components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const { productDetails, isLoading } = useSelector((state) => state.shopProducts);
    const { user } = useSelector((state) => state.auth);

    const handleSuccessToast = (message) => {
        toast.success("Product is added to cart", {
          position: "top-center",
          autoClose: 2000,
        });
      };
  

  const handleAddtoCart = (getCurrentProductId) => {
      console.log(getCurrentProductId);
      dispatch(
        addToCart({
          userId: user?._id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?._id));
          handleSuccessToast();
        }
      });
    };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skeleton for Image Slider */}
          <div className="w-full h-[500px] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>

          {/* Skeleton for Product Details */}
          <div className="space-y-4">
            {/* Skeleton for Title */}
            <Skeleton className="w-3/4 h-8 rounded-full" />

            {/* Skeleton for Description */}
            <Skeleton className="w-full h-4 rounded-full" />
            <Skeleton className="w-2/3 h-4 rounded-full" />
            <Skeleton className="w-1/2 h-4 rounded-full" />

            {/* Skeleton for Price */}
            <div className="flex items-center gap-4">
              <Skeleton className="w-20 h-6 rounded-full" />
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>

            {/* Skeleton for Category */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-4 rounded-full" />
              <Skeleton className="w-24 h-4 rounded-full" />
            </div>

            {/* Skeleton for Brand */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-4 rounded-full" />
              <Skeleton className="w-24 h-4 rounded-full" />
            </div>

            {/* Skeleton for Stock */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-4 rounded-full" />
              <Skeleton className="w-24 h-4 rounded-full" />
            </div>

            {/* Skeleton for Add to Cart Button */}
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Slider */}
        <div className="w-full h-[500px] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full h-full"
          >
            {productDetails.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={image}
                    alt={`${productDetails.title} - Image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{productDetails.title}</h1>
          <p className="text-muted-foreground">
            {productDetails.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-primary">
              ${productDetails.salePrice > 0 ? productDetails.salePrice : productDetails.price}
            </span>
            {productDetails.salePrice > 0 && (
              <span className="text-xl line-through text-muted-foreground">
                ${productDetails.price}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-semibold">{productDetails.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Brand:</span>
            <span className="font-semibold">{productDetails.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Stock:</span>
            <span className="font-semibold">
              {productDetails.totalStock > 0 ? `${productDetails.totalStock} available` : "Out of Stock"}
            </span>
          </div>
          <Button
            disabled={productDetails.totalStock === 0}
            className="w-full bg-primary hover:bg-primary-dark"
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