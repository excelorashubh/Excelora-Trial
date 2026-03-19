import React from 'react'
import AdminLayout from '../components/AdminLayout'
import ClassList from '../components/ClassList'

export default function AllClasses() {
  return (
    <AdminLayout title="All Classes">
      <ClassList title="All Classes" />
    </AdminLayout>
  )
}
