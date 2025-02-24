import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./Address-Card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { PlusCircle, Truck } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
};

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleSuccessToast = (message) => {
    toast.success(message, { position: "top-center", autoClose: 2000 });
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleManageAddress = (event) => {
    event.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error("You can add max 3 addresses", {
        position: "top-center",
        autoClose: 3000,
        style: { backgroundColor: "#ffcccc", color: "#990000", fontWeight: "bold" },
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(editaAddress({ userId: user?._id, addressId: currentEditedId, formData })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?._id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            handleSuccessToast("Address updated successfully");
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user._id })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?._id));
            setFormData(initialAddressFormData);
            handleSuccessToast("Address added successfully");
          }
        });
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?._id));
  }, [dispatch, user?._id]);

  return (
    <Card className="p-4 sm:p-6 shadow-lg bg-white rounded-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Manage Addresses</CardTitle>
      </CardHeader>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              addressInfo={singleAddressItem}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              handleEditAddress={() => {
                setFormData(singleAddressItem);
                setCurrentEditedId(singleAddressItem._id);
              }}
              handleDeleteAddress={(addressInfo) => {
                dispatch(deleteAddress({ userId: user?._id, addressId: addressInfo._id })).then(() => {
                  dispatch(fetchAllAddresses(user?._id));
                  handleSuccessToast("Address deleted successfully");
                });
              }}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">No addresses available.</p>
        )}
      </div>
      <CardContent className="space-y-3">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
        <form onSubmit={handleManageAddress} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs sm:text-sm">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs sm:text-sm">City</Label>
              <Input
                id="city"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-xs sm:text-sm">Pincode</Label>
              <Input
                id="pincode"
                placeholder="10001"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 234 567 890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="text-xs sm:text-sm"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base"
            disabled={!isFormValid()}
          >
            {currentEditedId !== null ? "Update Address" : "Add Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Address;