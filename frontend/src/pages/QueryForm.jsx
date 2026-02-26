import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.jpg'
import { FaHome, FaUserCog } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { useToast } from '../context/ToastContext'
import { createQuery } from '../services/queryService'



export default function QueryForm() {
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Query Form");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    className: "",
    board: "",
    school: "",
    requirement: "",
    contactNumber: "",
    location: "",
    city: "",
    leadsource: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createQuery(formData);
      addToast('success', 'Enquiry submitted successfully!');
      setFormData({
        studentName: "",
        className: "",
        board: "",
        school: "",
        requirement: "",
        contactNumber: "",
        location: "",
        city: "",
        leadsource: ""
      });
      navigate('/admin/query-details');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit enquiry';
      addToast('error', msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col  relative ">

     {/*Header Section */}
    <div className='w-full h-18 px-4 py-2 flex items-center top-0 sticky backdrop-blur-md justify-between dark:bg-[#0f0f0f] z-50 dark:text-white'>
      
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
      

    {/*Body section*/}
    <div className='flex '>

      {/*Aside Section*/}
      <div className={`flex flex-col transition-all duration-300 border-r dark:bg-[#0f0f0f] dark:text-white fixed top-18 h-full z-40  ${sidebarOpen ? "w-60" : "w-20"} overflow-y-auto`}>

{/* space-y-1 mt-3 */}
      <nav className='space-y-1 mt-3'>
      <SidebarItem icon={<FaHome/>} text={"Landing Page"} open={sidebarOpen} selected={selectedItem === "Landing Page"} onClick={()=>{setSelectedItem("Landing Page"); navigate("/admin")}}/>
      <SidebarItem icon={<SiGoogleclassroom/>} text={"All Classes"} open={sidebarOpen} selected={selectedItem === "All Classes"} onClick={()=>{setSelectedItem("All Classes"); navigate("/admin/all-classes")}}/>
      <SidebarItem icon={<FaUserCog/>} text={"Manage Users"} open={sidebarOpen} selected={selectedItem === "Manage Users"} onClick={()=>{setSelectedItem("Manage Users"); navigate("/admin/users")}}/>
      <SidebarItem icon={<SiGoogleclassroom/>} text={"Create Classes"} open={sidebarOpen} selected={selectedItem === "Create Classes"} onClick={()=>{setSelectedItem("Create Classes"); navigate("/admin/create-class")}}/>
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Payment Details"} open={sidebarOpen} selected={selectedItem === "Payment Details"} onClick={()=>{setSelectedItem("Payment Details"); navigate("/admin/payments")}}/>
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Query Details"} open={sidebarOpen} selected={selectedItem === "Query Details"} onClick={()=>{setSelectedItem("Query Details"); navigate("/admin/query-details")}}/>
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Query Form"} open={sidebarOpen} selected={selectedItem === "Query Form"} onClick={()=>{setSelectedItem("Query Form"); navigate("/admin/query-form")}}/>
      </nav>
      </div>


            {/* Main Content Section */}

            <div className={`w-full dark:bg-[#0f0f0f] flex justify-center items-center px-5 py-5 flex flex-col ${sidebarOpen ? "md:ml-60" : "md:ml-20"}`}>
            {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4"> */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6 dark:bg-[#0f0f0f] dark:text-white border-2">
        <h2 className="text-2xl font-bold text-center mb-6">
          Student Enquiry Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Board */}
          <div>
            <label className="block text-sm font-medium mb-1">Board</label>
            <select
              name="board"
              value={formData.board}
              onChange={handleChange}
              required
              className="w-full dark:bg-gray-800 border rounded-lg px-3 py-2"
            >
              <option value="">Select Board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* School */}
          <div>
            <label className="block text-sm font-medium mb-1">School</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full border dark:bg-gray-800 rounded-lg px-3 py-2"
            />
          </div>

          {/* Requirement */}
          <div className="md:col-span-2">
            <label className="block text-sm  font-medium mb-1">Requirement</label>
            <textarea
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              rows="3"
              placeholder="e.g. Maths coaching, NEET preparation, doubt classes..."
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location / Area</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
            />
          </div>

          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
            />
          </div>

          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Lead Source</label>
            <input
              type="text"
              name="leadsource"
              value={formData.leadsource}
              onChange={handleChange}
              
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Details'}
            </button>
          </div>
        </form>
      </div>
    {/* </div>  */}
  
            <div className="grid grid-cols-1 gap-4">
        
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
