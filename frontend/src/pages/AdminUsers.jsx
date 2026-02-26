import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useToast } from '../context/ToastContext'
import logo from '../assets/logo.jpg'
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaHome, FaUserCog } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function AdminUsers(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', password:'123456', role: 'student' })
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({ name:'', email:'', password:'', role:'student' })
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Manage User")

  const { addToast } = useToast()
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/users')
      setUsers(res.data.users)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(()=>{ fetchUsers() }, [])

  const createUser = async (e) => {
    e.preventDefault()
    // client-side validation
    if (!form.name || !form.email || !form.password) {
      addToast('error', 'Name, email and password are required')
      return
    }
    try {
      await api.post('/admin/users', form)
      addToast('success', 'User created')
      setForm({ name:'', email:'', password:'123456', role: 'student' })
      fetchUsers()
    } catch (err) {
      const data = err?.response?.data
      const msg = data?.errors ? data.errors.map(e=>e.msg).join('\n') : (data?.message || 'Failed to create user')
      addToast('error', msg)
    }
  }

  const deleteUser = async (id) => {
    if (!confirm('Delete user?')) return
    try {
      await api.delete(`/admin/users/${id}`)
      addToast('success', 'User deleted')
      fetchUsers()
    } catch (err) { addToast('error', 'Delete failed') }
  }

  const startEdit = (user) => {
    setEditingUser(user)
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'student',
      password: ''
    })
  }

  const cancelEdit = () => {
    setEditingUser(null)
    setEditForm({ name:'', email:'', password:'', role:'student' })
  }

  const updateUser = async (e) => {
    e.preventDefault()
    if (!editingUser) return

    if (!editForm.name || !editForm.email) {
      addToast('error', 'Name and email are required')
      return
    }

    const payload = {
      name: editForm.name,
      email: editForm.email,
      role: editForm.role
    }

    if (editForm.password) {
      payload.password = editForm.password
    }

    try {
      await api.put(`/admin/users/${editingUser._id}`, payload)
      addToast('success', 'User updated')
      setEditingUser(null)
      setEditForm({ name:'', email:'', password:'', role:'student' })
      fetchUsers()
    } catch (err) {
      const data = err?.response?.data
      const msg = data?.errors ? data.errors.map(e=>e.msg).join('\n') : (data?.message || 'Failed to update user')
      addToast('error', msg)
    }
  }

  return (
    <div className='min-h-screen flex flex-col relative'>

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


      <div className={`px-5 py-10 ${sidebarOpen ? "md:ml-60" : "md:ml-20"}`}>
      <h2 className="text-xl mb-4 font-bold">User Management</h2>
      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input className="border p-2" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="border p-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <select className="border p-2" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <button className="bg-green-600 text-white p-2 rounded">Create</button>
        </form>
      </div>

      {editingUser && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="mb-3 font-semibold">Edit user</h3>
          <form onSubmit={updateUser} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
            <input
              className="border p-2"
              placeholder="Full name"
              value={editForm.name}
              onChange={e=>setEditForm({...editForm,name:e.target.value})}
            />
            <input
              className="border p-2"
              placeholder="Email"
              value={editForm.email}
              onChange={e=>setEditForm({...editForm,email:e.target.value})}
            />
            <select
              className="border p-2"
              value={editForm.role}
              onChange={e=>setEditForm({...editForm,role:e.target.value})}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <input
              className="border p-2"
              type="password"
              placeholder="New password (optional)"
              value={editForm.password}
              onChange={e=>setEditForm({...editForm,password:e.target.value})}
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
                Save
              </button>
              <button type="button" onClick={cancelEdit} className="border px-3 py-2 rounded text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h3 className="mb-2">All users</h3>
        {loading? <div>Loading...</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
                </tr></thead>
            <tbody>
              {users.map(u=> (
                <tr key={u._id} className="border-t">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-2'>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                      onClick={()=>startEdit(u)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                     onClick={()=>deleteUser(u._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
     </div>

    </div>
  )
}


function SidebarItem({icon, text, open, selected, onClick}){
  return(
    <button className={`flex items-center gap-4 p-2 rounded w-full transition-colors 
    ${open ? "justify-start" : "justify-center"} ${selected ? "bg-[#272727] text-white" : "hover:bg-[#272727]"} hover:text-white`} onClick={onClick}> 
    <span className='text-lg'>{icon}</span>
    {open && <span className='text-sm '>{text}</span>}
    </button>
  )
}