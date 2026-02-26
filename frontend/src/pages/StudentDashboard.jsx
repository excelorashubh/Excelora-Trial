import React from 'react'
import { useAuth } from '../context/AuthContext'
import ClassList from '../components/ClassList'

export default function StudentDashboard(){
  const { user, logout } = useAuth()
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Student Dashboard</h1>
        <div>
          <span className="mr-4">{user?.name}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="mb-2">Payments</div>
          <a href="/student/payment" className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm">Pay Now</a>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="mb-2">Payment History</div>
          <a href="/student/payments" className="inline-block bg-gray-600 text-white px-3 py-1 rounded text-sm">View Details</a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <ClassList todayOnly title="Today's Classes" />
        <ClassList title="All Classes" />
      </div>
    </div>
  )
}
