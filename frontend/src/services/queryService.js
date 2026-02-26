import api from './api'

export const createQuery = (payload) => api.post('/queries', payload)
export const getQueries = (params) => api.get('/queries', { params })
export const updateQuery = (id, payload) => api.put(`/queries/${id}`, payload)
export const deleteQuery = (id) => api.delete(`/queries/${id}`)
