import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Edit, Trash } from 'lucide-react';

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer p-4 transition-all rounded-lg shadow-md border-2 ${
        selectedId?._id === addressInfo?._id
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
      }`}
    >
      <CardContent className="grid gap-2">
        <Label className="text-lg font-semibold text-gray-800">{addressInfo?.address}</Label>
        <p className="text-sm text-gray-600">City: {addressInfo?.city}</p>
        <p className="text-sm text-gray-600">Pincode: {addressInfo?.pincode}</p>
        <p className="text-sm text-gray-600">Phone: {addressInfo?.phone}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-2">
        <Button variant="secondary" onClick={handleEditAddress}>
          <Edit size={16} className="mr-2" /> Edit
        </Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} variant="destructive">
          <Trash size={16} className="mr-2" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;