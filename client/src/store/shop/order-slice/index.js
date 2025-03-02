import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "../cart-slice";

const initialState = {
  GatewayPageURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/shop/order/create`,
      orderData
    );

    // Ensure the response contains GatewayPageURL
    if (!response.data.GatewayPageURL) {
      throw new Error("GatewayPageURL not found in response");
    }

    // Store orderId in sessionStorage
    sessionStorage.setItem(
      "currentOrderId",
      JSON.stringify(response.data.orderId)
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }, { dispatch }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/shop/order/capture`,
      { paymentId, payerId, orderId }
    );

    // if (response.data.success) {
    //   dispatch(clearCart()); // Clear cart in Redux
    //   dispatch(resetOrderList()); // Reset order list in Redux
    // }

    return response.data;
  }
);


export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/shop/order/list/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/shop/order/details/${id}`
    );

    return response.data;
  }
);


const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,

  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    resetOrderList: (state) => {
      state.orderList = [];
      state.orderId = null;
      state.GatewayPageURL = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.GatewayPageURL = action.payload.GatewayPageURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.GatewayPageURL = null;
        state.orderId = null;
        console.error("Error creating order:", action.error.message);
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.orderDetails = action.payload.data;
          state.orderList = []; // Reset order list
          state.GatewayPageURL = null; // Clear payment URL
          state.orderId = null; // Clear order ID
        }
      })
      .addCase(capturePayment.rejected, (state, action) => {
        console.error("Payment capture failed:", action.error);
      })

      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails, resetOrderList } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
