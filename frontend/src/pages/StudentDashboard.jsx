import React from 'react'
import { useAuth } from '../context/AuthContext'
import ClassList from '../components/ClassList'

export default function StudentDashboard(){
  const { user, logout } = useAuth()
  return (
    <div className='flex flex-col px-5 py-3 min-h-screen dark:bg-[#0f0f0f] dark:text-white'>
      <h1 className='text-3xl font-bold mb-4'>Welcome, {user.fullName}!</h1>
      <p className='text-lg mb-6'>Here are your assigned classrooms:</p>
      <ClassList />
    </div>
  )
}
