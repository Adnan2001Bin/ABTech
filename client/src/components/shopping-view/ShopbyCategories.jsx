import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import earbudsImg from "../../assets/shop by catagories/earBuds.webp";
import wirelessHeadphonesImg from "../../assets/shop by catagories/Wireless-Headphones_small.webp";
import neckbandsImg from "../../assets/shop by catagories/Neckbands_bc6343f4-622f-4ebd-bb36-205643c3bf78_small.png";
import wiredEarphonesImg from "../../assets/shop by catagories/Wired-Earphones_small.webp";
import wiredHeadphonesImg from "../../assets/shop by catagories/Wired-Headphones_small.webp";
import smartwatchesImg from "../../assets/shop by catagories/Smartwatches_88f12bcf-24bd-4e3a-aacb-ecc204f62179_small.webp";

const categories = [
  { id: "earbuds", image: earbudsImg, title: "Earbuds" },
  { id: "wireless-headphones", image: wirelessHeadphonesImg, title: "Wireless Headphones" },
  { id: "neckbands", image: neckbandsImg, title: "Neckbands" },
  { id: "wired-earphones", image: wiredEarphonesImg, title: "Wired Earphones" },
  { id: "wired-headphones", image: wiredHeadphonesImg, title: "Wired Headphones" },
  { id: "smartwatches", image: smartwatchesImg, title: "Smartwatches" },
];

const ShopbyCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});

  const handleFilter = (categoryId) => {
    let updatedFilters = { ...filters, category: [categoryId] };
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

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-100">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center bg-white shadow-md rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 w-32 sm:w-36 lg:w-40"
          onClick={() => handleFilter(category.id)}
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover rounded-md"
          />
          <p className="mt-2 font-semibold text-xs sm:text-sm lg:text-base">{category.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ShopbyCategories;