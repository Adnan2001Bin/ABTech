import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommonForm from '../common/form';
import { addressFormControls } from '@/Config';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from '@/store/shop/address-slice';
import AddressCard from './Address-Card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { PlusCircle, Edit } from 'lucide-react';

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
};

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleSuccessToast = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 2000,
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== '')
      .every((item) => item);
  };

  const handleManageAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error('You can add max 3 addresses', {
        position: 'top-center',
        autoClose: 3000,
        style: { backgroundColor: '#ffcccc', color: '#990000', fontWeight: 'bold' },
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?._id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?._id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            handleSuccessToast('Address updated successfully');
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user._id,
          })
        ).then((data) => {
          console.log('API Response:', data); // Debugging line
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?._id)); // Refetch addresses
            setFormData(initialAddressFormData); // Reset the form
            handleSuccessToast('Address added successfully');
          }
        });
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?._id));
  }, [dispatch, user?._id]);

  return (
    <Card className='p-6 shadow-lg bg-white rounded-lg'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold mb-4 text-gray-800'>Manage Addresses</CardTitle>
      </CardHeader>
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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
                  handleSuccessToast('Address deleted successfully');
                });
              }}
            />
          ))
        ) : (
          <p className='text-gray-500'>No addresses available.</p>
        )}
      </div>
      <CardContent className='space-y-3'>
        <CardTitle className='text-xl font-semibold text-gray-800'>Add New Address</CardTitle>
        <CommonForm
          formData={formData}
          formControls={addressFormControls}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
          buttonIcon={currentEditedId !== null ? <Edit size={16} /> : <PlusCircle size={16} />}
          inputClassName='outline outline-[2px] rounded-md p-2'
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;