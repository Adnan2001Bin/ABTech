import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NewLaunchesCard from "./NewLaunchesCard";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";

const NewLaunches = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSuccessToast = () => {
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
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Get the last 4 products in descending order
  const latestProducts = productList.slice(-4).reverse();

  return (
    <div className="newLaunches ml-16 mt-8 w-11/12 cursor-pointer ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-mono ml-4">
          New <span className="font-semibold">Launches</span>
        </h1>

        <div className="flex mr-5 justify-between items-center">
          <Link to="./collections">
            <h1 className="font-bold text-blue-700">View all</h1>
          </Link>
          <img
            className="w-5 h-5 ml-2"
            src="/src/assets/fast-forward.png"
            alt=""
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {latestProducts.map((productItem) => (
          <NewLaunchesCard key={productItem._id} product={productItem} handleAddtoCart={handleAddtoCart}/>
        ))}
      </div>
    </div>
  );
};

export default NewLaunches;
