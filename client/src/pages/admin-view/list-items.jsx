import AdminProductTile from "@/components/admin-view/product-tile";
import { fetchAllProducts } from "@/store/admin/products-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminListItems = () => {
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 sm:p-6 lg:p-8">
      {productList && productList.length > 0 ? (
        productList.map((productItem) => (
          <AdminProductTile key={productItem._id} product={productItem} />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-lg text-gray-600">No items available</p>
        </div>
      )}
    </div>
  );
};

export default AdminListItems;