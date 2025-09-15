import api from './axiosConfig';

export const createPaymentOrder = (amount) => {
    return api.post('/api/payment/order', { amount });
};

export const verifyPayment = (paymentData) => {
    return api.post('/api/payment/verify', paymentData);
};