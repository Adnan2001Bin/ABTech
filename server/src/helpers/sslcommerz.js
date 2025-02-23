import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.sslcommerz_store_id;
const store_passwd = process.env.sslcommerz_store_passwd;
const is_live = false; // Set to true for live, false for sandbox

/**
 * Initialize SSLCommerz payment
 * @param {Object} paymentData - Payment data object
 * @returns {Promise<string>} - Gateway page URL
 */
export const initializeSSLCommerzPayment = async (paymentData) => {
  try {
    console.log("Initializing SSLCommerz payment with data:", paymentData); // Log payment data

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(paymentData);

    console.log("SSLCommerz API Response:", apiResponse); // Log the API response

    if (!apiResponse.GatewayPageURL) {
      throw new Error("GatewayPageURL not found in SSLCommerz response");
    }

    return apiResponse.GatewayPageURL;
  } catch (error) {
    console.error("Error initializing SSLCommerz payment:", error); // Log the error
    throw new Error("Failed to initialize payment");
  }
};