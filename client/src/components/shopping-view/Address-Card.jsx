import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

const AddressCard = ({
  addressInfo,
  selectedId,
  setCurrentSelectedAddress,
  handleEditAddress,
  handleDeleteAddress,
}) => {
  const isSelected = selectedId === addressInfo._id;

  const handleSelect = () => {
    setCurrentSelectedAddress(addressInfo);
  };

  return (
    <Card
      className={`p-3 sm:p-4 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 w-full ${
        isSelected
          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-400"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={handleSelect}
    >
      <CardContent className="p-0 space-y-2">
        <p className="text-xs sm:text-sm font-medium text-gray-800">{addressInfo.address}</p>
        <p className="text-xs sm:text-sm text-gray-600">
          {addressInfo.city}, {addressInfo.pincode}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">Phone: {addressInfo.phone}</p>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3 hover:bg-blue-100"
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress();
            }}
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3 hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAddress(addressInfo);
            }}
          >
            <Trash className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Delete
          </Button>
        </div>
        {isSelected && (
          <p className="text-xs text-blue-600 font-semibold mt-2">Selected</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;