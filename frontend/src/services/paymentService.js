import api from './api'

export const createOrder = (payload) => api.post('/payments/create-order', payload)
export const verifyPayment = (payload) => api.post('/payments/verify', payload)
export const getPayments = (params) => api.get('/payments', { params })

export default { createOrder, verifyPayment, getPayments }
