import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import image1 from "../../assets/New folder/image1.jpg";
import image2 from "../../assets/New folder/image2.jpg";
import image3 from "../../assets/New folder/image3.jpg";
import image4 from "../../assets/New folder/image4.jpg";
import image5 from "../../assets/New folder/image1.jpg";
import ShopbyCategories from "@/components/shopping-view/ShopbyCategories";
import BestSellers from "@/components/shopping-view/BestSellers";
import NewLaunches from "@/components/shopping-view/NewLaunches";

const ShoppingHome = () => {
  const bannerImages = [image1, image2, image3, image4, image5];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Banner Section */}
      <div className="w-full rounded-lg overflow-hidden shadow-lg mb-6 sm:mb-8 lg:mb-12">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-48 sm:h-[300px] md:h-[400px] lg:h-[500px]"
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Shop by Categories Section */}
      <section className="bg-white py-8 sm:py-10 lg:py-12 shadow-md rounded-lg border border-gray-200">
        <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Shop by Categories
        </h2>
        <ShopbyCategories />
      </section>

      {/* Best Sellers Section */}
      <section className="bg-white py-8 sm:py-10 lg:py-12 shadow-md rounded-lg mt-6 sm:mt-8 lg:mt-12 border border-gray-200">
        <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Explore <span className="text-blue-600">Bestsellers</span>
        </h2>
        <BestSellers />
      </section>

      {/* New Launches Section */}
      <section className="bg-white py-6 sm:py-8 lg:py-10 shadow-md rounded-lg mt-6 sm:mt-8 lg:mt-12 border border-gray-200">
        <NewLaunches />
      </section>

      {/* Custom Navigation Arrow Styles */}
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            background-color: rgba(255, 255, 255, 0.8) !important;
            color: #333;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 18px;
            font-weight: bold;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background-color: #333 !important;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default ShoppingHome;