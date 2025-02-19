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
    <div className="min-h-screen px-4 sm:px-10 lg:px-20">
      {/* Banner Section */}
      <div className="w-full rounded-lg overflow-hidden shadow-lg mb-8">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Shop by Categories Section */}
      <section className="bg-white py-12 shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Shop by Categories
        </h2>
        <ShopbyCategories />
      </section>

      <section className="bg-white py-12 shadow-md rounded-lg mt-8">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Explore <span className="text-blue-600">Bestsellers</span>
        </h2>
        <BestSellers />
      </section>


      <section className="bg-white py-5 shadow-md rounded-lg mt-8">
        <NewLaunches />
      </section>

      {/* Custom Navigation Arrow Styles */}
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            background-color: rgba(255, 255, 255, 0.8) !important;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 20px;
            font-weight: bold;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background-color: #333 !important;;
          }
        `}
      </style>
    </div>
  );
};

export default ShoppingHome;
