import api from './axiosConfig';

export const createPaymentOrder = (amount) => {
    return api.post('/api/payments/order', { amount });
};

export const verifyPayment = (paymentData) => {
    return api.post('/api/payments/verify', paymentData);
};