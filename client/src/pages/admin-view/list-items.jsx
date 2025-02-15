import AdminProductTile from "@/components/admin-view/product-tile";
import { fetchAllProducts } from "@/store/admin/products-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminListItems = () => {
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList);
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productList && productList.length > 0 ? (
        productList.map((productItem) => (
          <AdminProductTile key={productItem._id} product={productItem} />
        ))
      ) : (
        <p>No items</p>
      )}
    </div>
  );
};
export default AdminListItems;
