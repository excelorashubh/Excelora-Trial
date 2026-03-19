import api from './api'

export const getUsers = (params) => api.get('/admin/users', { params })
export const createUser = (payload) => api.post('/admin/users', payload)
export const updateUser = (id, payload) => api.put(`/admin/users/${id}`, payload)
export const deleteUser = (id) => api.delete(`/admin/users/${id}`)
export const assignTeacher = (studentId, teacherId) =>
  api.post('/admin/assign-teacher', { studentId, teacherId })
export const getTeacherStudents = (teacherId) =>
  api.get(`/admin/teachers/${teacherId}/students`)
export const getMe = () => api.get('/auth/me')
