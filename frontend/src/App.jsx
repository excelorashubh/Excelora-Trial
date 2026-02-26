import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentDashboard from './pages/StudentDashboard'
import PaymentPage from './pages/PaymentPage'
import AdminUsers from './pages/AdminUsers'
import CreateClass from './pages/CreateClass'
import EditClass from './pages/EditClass'
import TeacherMaterials from './pages/TeacherMaterials'
import AttendancePage from './pages/AttendancePage'
import StudentPayments from './pages/StudentPayments'
import AdminPayments from './pages/AdminPayments'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Registration from './pages/Registration'
import CourseDetails from './pages/CourseDetails'
import { ToastContainer } from 'react-toastify'
import AboutUs from './pages/aboutus'
import AllClasses from './pages/AllClasses'
import QueryDetails from './pages/QueryDetails'
import QueryForm from './pages/QueryForm'

const Protected = ({ children, roles }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <div className="p-4">Forbidden</div>
  return children
}

export default function App() {
  return (

    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/registration' element={<Registration />} />
      <Route path="/lo" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/course-details" element={<CourseDetails />} />
      <Route path='/aboutus' element={<AboutUs />} />

      <Route
        path="/admin"
        element={<Protected roles={["admin"]}><AdminDashboard /></Protected>}
      />
      <Route path="/admin/users" element={<Protected roles={["admin"]}><AdminUsers/></Protected>} />
      <Route path="/admin/create-class" element={<Protected roles={["admin"]}><CreateClass/></Protected>} />
      <Route path="/admin/edit-class/:classId" element={<Protected roles={["admin"]}><EditClass/></Protected>} />
      <Route path="/admin/payments" element={<Protected roles={["admin"]}><AdminPayments/></Protected>} />
      <Route path="/admin/all-classes" element={<Protected roles={["admin"]}><AllClasses/></Protected>} />
      <Route path="/admin/query-details" element={<Protected roles={["admin"]}><QueryDetails/></Protected>} />
      <Route path="/admin/query-form" element={<Protected roles={["admin"]}><QueryForm/></Protected>} />

      {/* QueryDetails */}
      <Route
        path="/teacher"
        element={<Protected roles={["teacher"]}><TeacherDashboard /></Protected>}
      />
      <Route path="/teacher/materials" element={<Protected roles={["teacher"]}><TeacherMaterials/></Protected>} />
      <Route path="/teacher/attendance" element={<Protected roles={["teacher"]}><AttendancePage/></Protected>} />

      <Route
        path="/student"
        element={<Protected roles={["student"]}><StudentDashboard /></Protected>}
      />
      <Route
        path="/student/payment"
        element={<Protected roles={["student"]}><PaymentPage /></Protected>}
      />
      <Route path="/student/payments" element={<Protected roles={["student"]}><StudentPayments/></Protected>} />
    </Routes>
    </>
  )
}
