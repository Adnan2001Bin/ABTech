import React, { useEffect, useRef, useState } from "react";
import video1 from "../../assets/Best seller/quinn_Bejc8URjU1NSXdhabLCmD.mp4";
import video2 from "../../assets/Best seller/quinn_CpsRIdJWtpXyFN3enwbXd.mp4";
import video3 from "../../assets/Best seller/quinn_OyJHanx4QSdUN3OVGTO7C.mp4";
import video4 from "../../assets/Best seller/quinn_RUxbhR7CvjkNtlFUDxgw9.mp4";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const BestSellers = () => {
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const bestSellersData = [
    { title: "Earbuds", src: video1 },
    { title: "Wireless Headphones", src: video2 },
    { title: "Neckbands", src: video3 },
    { title: "Watches", src: video4 },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});

  const handleFilter = (categoryId) => {
    let updatedFilters = { ...filters };

    if (!updatedFilters.category) {
      updatedFilters.category = [categoryId];
    } else {
      const index = updatedFilters.category.indexOf(categoryId);
      if (index === -1) {
        updatedFilters.category.push(categoryId);
      } else {
        updatedFilters.category.splice(index, 1);
      }
    }

    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));

    // Create query parameters
    const queryParams = new URLSearchParams();
    Object.keys(updatedFilters).forEach((key) => {
      queryParams.append(key, updatedFilters[key].join(","));
    });

    // Redirect to Collections page with filters in URL
    navigate(`/collections?${queryParams.toString()}`);

    // Dispatch action to fetch products (in case Collections page does not auto-fetch)
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
    <div className="px-4 sm:px-10 lg:px-20">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellersData.map((item, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-lg shadow-lg"
            onClick={() => handleFilter(item.id)}
          >
            <video
              ref={videoRefs[index]}
              className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              src={item.src}
              loop
              muted
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            ></video>
            <p className="text-center text-lg font-semibold mt-2">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;