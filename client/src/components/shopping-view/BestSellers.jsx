import React, { useEffect, useRef, useState } from "react";
import video1 from "../../assets/Best seller/quinn_Bejc8URjU1NSXdhabLCmD.mp4";
import video2 from "../../assets/Best seller/quinn_CpsRIdJWtpXyFN3enwbXd.mp4";
import video3 from "../../assets/Best seller/quinn_OyJHanx4QSdUN3OVGTO7C.mp4";
import video4 from "../../assets/Best seller/quinn_RUxbhR7CvjkNtlFUDxgw9.mp4";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";

const BestSellers = () => {
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const bestSellersData = [
    { title: "Earbuds", src: video1, id: "earbuds" },
    { title: "Wireless Headphones", src: video2, id: "wireless-headphones" },
    { title: "Neckbands", src: video3, id: "neckbands" },
    { title: "Watches", src: video4, id: "smartwatches" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});

  const handleFilter = (categoryId) => {
    let updatedFilters = { ...filters };
    updatedFilters.category = [categoryId];
    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
    const queryParams = new URLSearchParams({ category: categoryId });
    navigate(`/collections?${queryParams.toString()}`);
    dispatch(fetchAllFilteredProducts({ filterParams: updatedFilters }));
  };

  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(savedFilters);
  }, []);

  const handleMouseEnter = (index) => {
    videoRefs[index].current.play();
  };

  const handleMouseLeave = (index) => {
    videoRefs[index].current.pause();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {bestSellersData.map((item, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleFilter(item.id)}
          >
            <video
              ref={videoRefs[index]}
              className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              src={item.src}
              loop
              muted
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            />
            <p className="text-center text-sm sm:text-lg font-semibold mt-2 sm:mt-3">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;