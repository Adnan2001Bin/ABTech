import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewLaunchesCard from "./NewLaunchesCard";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";
import forwardImg from "../../assets/fast-forward.png"

const NewLaunches = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSuccessToast = () => {
    toast.success("Product added to cart", { position: "top-center", autoClose: 2000 });
  };

  const handleAddtoCart = (getCurrentProductId) => {
    dispatch(
      addToCart({ userId: user?._id, productId: getCurrentProductId, quantity: 1 })
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

  const latestProducts = productList.slice(-4).reverse();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-mono">
          New <span className="font-semibold">Launches</span>
        </h1>
        <Link to="/collections" className="flex items-center gap-2">
          <span className="font-bold text-blue-700 text-sm sm:text-base">View all</span>
          <img
            className="w-4 h-4 sm:w-5 sm:h-5"
            src={forwardImg}
            alt="Fast Forward"
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {latestProducts.map((productItem) => (
          <NewLaunchesCard
            key={productItem._id}
            product={productItem}
            handleAddtoCart={handleAddtoCart}
          />
        ))}
      </div>
    </div>
  );
};

export default NewLaunches;