import React, { useState } from 'react'
import { createClass } from '../services/classService'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaHome, FaUserCog } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { RiSecurePaymentLine } from "react-icons/ri";


export default function CreateClass(){
  const [form, setForm] = useState({ title:'', subject:'', teacherName:'', studentNames:'', classDate:'', classTime:'', meetingLink:'' })
  const [message, setMessage] = useState('')
  const { addToast } = useToast()

  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Create Class")

  const submit = async (e) => {
    e.preventDefault()
    
    // client-side validation
    if (!form.title || !form.subject) {
      addToast('error', 'Title and subject are required')
      return
    }
    if (!form.classDate) {
      addToast('error', 'Class date is required')
      return
    }
    if (!form.classTime) {
      addToast('error', 'Class time is required')
      return
    }

    const payload = {
      title: form.title,
      subject: form.subject,
      classDate: form.classDate,
      classTime: form.classTime,
      meetingLink: form.meetingLink,
      teacherName: form.teacherName,
      studentNames: form.studentNames
        ? form.studentNames.split(',').map(s => s.trim()).filter(Boolean)
        : []
    }
    try {
      await createClass(payload)
      addToast('success', 'Class created')
      setForm({ title:'', subject:'', teacherName:'', studentNames:'', classDate:'', classTime:'', meetingLink:'' })
    } catch (err) {
      const data = err?.response?.data
      const msg = data?.errors ? data.errors.map(e=>e.msg).join(', ') : 'Error creating class'
      addToast('error', msg)
    }
  }

  return (
    <div className='min-h-screen flex flex-col relative'>

      {/*Brand Logo and Name*/}
      <div className='w-full h-18 px-4 py-2  flex items-center top-0 sticky backdrop-blur-md justify-between dark:bg-[#0f0f0f] z-50 dark:text-white'>
      
      {/*Brand Logo and Name*/}
      <div className='flex items-center gap-4'>
        <GiHamburgerMenu size={25} className='' onClick={()=>setSidebarOpen(prev=>!prev)}/>
      <img src={logo} alt="" className='w-12 h-12 rounded-full'/>
      <h2 className='text-2xl font-bold hidden md:block'>Excelora - Admin Dashboard</h2>
      </div>

      {/* Profile and Logout */}
      <div>
          <span className="mr-4">{user?.name}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={logout}>Logout</button>
        </div>

    </div>

    <div>
      {/*Aside Section*/}
      <div className={`flex flex-col transition-all duration-300 border-r dark:bg-[#0f0f0f] dark:text-white fixed top-18 h-full z-40  ${sidebarOpen ? "w-60" : "w-20"} overflow-y-auto`}>

{/* space-y-1 mt-3 */}
      <nav className='space-y-1 mt-3'>
      <SidebarItem icon={<FaHome/>} text={"Landing Page"} open={sidebarOpen} selected={selectedItem === "Landing Page"} onClick={()=>{setSelectedItem("Landing Page"); navigate("/admin")}}/>
      <SidebarItem icon={<SiGoogleclassroom/>} text={"All Classes"} open={sidebarOpen} selected={selectedItem === "All Classes"} onClick={()=>{setSelectedItem("All Classes"); navigate("/admin/all-classes")}}/>
      <SidebarItem icon={<FaUserCog/>} text={"Manage Users"} open={sidebarOpen} selected={selectedItem === "Manage Users"} onClick={()=>{setSelectedItem("Manage Users"); navigate("/admin/users")}}/>
      <SidebarItem icon={<SiGoogleclassroom/>} text={"Create Classes"} open={sidebarOpen} selected={selectedItem === "Create Classes"} onClick={()=>{setSelectedItem("Create Classes"); navigate("/admin/create-class")}}/>
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Payment Details"} open={sidebarOpen} selected={selectedItem === "Payment Details"} onClick={()=>{setSelectedItem("Payment Details"); navigate("/admin/payments")}}/>
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Query Details"} open={sidebarOpen} selected={selectedItem === "Query Details"} onClick={()=>{setSelectedItem("Payment Details"); navigate("/admin/query-details")}}/>
      </nav>
      </div>
    </div>

    
    <div className={`px-5 py-10 flex flex-col items-center justify-center ${sidebarOpen ? "md:ml-60" : "md:ml-20"}`}>
    <div className='w-full  flex  items-center justify-center'>
      <div className='w-full max-w-4xl flex flex-col items-center justify-center '>
      <h2 className="text-xl w-full font-bold px-4  mb-4">Create Classes</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow  w-full">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input className="w-full border p-2 rounded" placeholder="Class Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <input className="w-full border p-2 rounded" placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} />
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Teacher Name</label>
          <input className="w-full border p-2 rounded" placeholder="Teacher Name" value={form.teacherName} onChange={e=>setForm({...form,teacherName:e.target.value})} />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Student Names (comma separated)</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Alice,Bob,Charlie"
            value={form.studentNames}
            onChange={e => setForm({ ...form, studentNames: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium mb-1">Class Date *</label>
            <input type="date" className="w-full border p-2 rounded" value={form.classDate} onChange={e=>setForm({...form,classDate:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Class Time *</label>
            <input type="time" className="w-full border p-2 rounded" value={form.classTime} onChange={e=>setForm({...form,classTime:e.target.value})} />
          </div>
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Meeting Link</label>
          <input className="w-full border p-2 rounded" placeholder="https://zoom.us/j/..." value={form.meetingLink} onChange={e=>setForm({...form,meetingLink:e.target.value})} />
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Create Class</button>
        {message && <div className="mt-2">{message}</div>}
      </form>
      </div>
    </div>
    </div>

    </div>
  )
}


function SidebarItem({icon, text, open, selected, onClick}){
  return(
    <button className={`flex items-center gap-4 p-2 rounded w-full transition-colors 
    ${open ? "justify-start" : "justify-center"} ${selected ? "bg-[#272727] text-white" : "hover:bg-[#272727] hover:text-white"}`} onClick={onClick}> 
    <span className='text-lg'>{icon}</span>
    {open && <span className='text-sm '>{text}</span>}
    </button>
  )
}