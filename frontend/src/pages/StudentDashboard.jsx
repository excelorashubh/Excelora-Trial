import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import ClassList from '../components/ClassList'
import { useNavigate } from 'react-router-dom'

export default function StudentDashboard() {
  const { user, logout, refreshUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { refreshUser() }, [])

  return (
    <div className="flex flex-col min-h-screen dark:bg-[#0f0f0f] dark:text-white">
      {/* Header */}
      <div className="w-full px-6 py-3 flex items-center justify-between border-b sticky top-0 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold">Student Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.name}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 space-y-2">
          <h2 className="font-semibold text-lg mb-3">My Profile</h2>
          <InfoRow label="Name" value={user?.name} />
          <InfoRow label="Email" value={user?.email} />
          <InfoRow label="Phone" value={user?.phone} />
          <InfoRow label="Class" value={user?.class} />
          <InfoRow label="School" value={user?.school} />
          <InfoRow label="Status" value={user?.status} />
        </div>

        {/* Teacher Card */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 space-y-2">
          <h2 className="font-semibold text-lg mb-3">My Teacher</h2>
          {user?.assignedTeacher ? (
            <>
              <InfoRow label="Name" value={user.assignedTeacher.name} />
              <InfoRow label="Email" value={user.assignedTeacher.email} />
              <InfoRow label="Subject" value={user.assignedTeacher.subject} />
            </>
          ) : (
            <p className="text-sm text-gray-500">No teacher assigned yet.</p>
          )}
          <div className="pt-3 flex gap-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => navigate('/student/payment')}>Pay Now</button>
            <button className="border px-3 py-1 rounded text-sm" onClick={() => navigate('/student/payments')}>Payment History</button>
          </div>
        </div>
      </div>

      {/* Classes */}
      <div className="px-6 pb-6">
        <ClassList title="My Classes" />
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
