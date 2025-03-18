import { base_url } from "../../../../../baseUrl";

// PaymentAPI.js (or use any suitable file name)
const createStripeCustomer = async (token) => {
    try {
      const response = await fetch(base_url +'payments/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer your_api_token', // Replace with your actual API token if required
        },
        body: JSON.stringify({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0NSwiaWF0IjoxNzIwNDIxODkwLCJleHAiOjE3MjMwMTM4OTB9.nJ7C-yqv1UpS-3fr7LntjMeBj5xx8Gi2DiSW9sb-xsg', // Replace with the token you received from Stripe frontend
        }),
      });
  
      const data = await response.json();
      return data; // Optionally handle response data
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error; // Handle error as needed
    }
  };
  
  export { createStripeCustomer };

  // PaymentAPI.js (continued)
const attachPaymentMethod = async (paymentMethodId) => {
    try {
      const response = await fetch(base_url + 'payments/attach-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer your_api_token', // Replace with your actual API token if required
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethodId,
        }),
      });
  
      const data = await response.json();
      return data; // Optionally handle response data
    } catch (error) {
      console.error('Error attaching payment method:', error);
      throw error; // Handle error as needed
    }
  };
  
  export { attachPaymentMethod };

  // PaymentAPI.js (continued)
const transferPayment = async (amount, bannerId, paymentMethodId) => {
    try {
      const response = await fetch( base_url + 'payments/transfer-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer your_api_token', // Replace with your actual API token if required
        },
        body: JSON.stringify({
          amount: amount,
          banner_id: bannerId,
          paymentMethodId: paymentMethodId,
        }),
      });
  
      const data = await response.json();
      return data; // Optionally handle response data
    } catch (error) {
      console.error('Error transferring payment:', error);
      throw error; // Handle error as needed
    }
  };
  
  export { transferPayment };
  