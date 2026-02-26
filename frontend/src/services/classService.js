import api from './api'

export const createClass = (payload) => api.post('/classes', payload)
export const getClasses = () => api.get('/classes')
export const getClass = (id) => api.get(`/classes/${id}`)
export const updateClass = (id, payload) => api.put(`/classes/${id}`, payload)
export const deleteClass = (id) => api.delete(`/classes/${id}`)
export const uploadMaterial = (classId, file) => {
  const fd = new FormData()
  fd.append('file', file)
  return api.post(`/materials/${classId}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const markAttendance = (classId, data) => api.post(`/attendance/${classId}/mark`, data)
export const getAttendance = (classId) => api.get(`/attendance/${classId}`)