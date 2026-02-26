import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ClassList from '../components/ClassList'
import { FaBars } from "react-icons/fa";
import logo from '../assets/logo.jpg'
import { IoMdSearch } from "react-icons/io";
import { IoMic } from "react-icons/io5";
import { FaUserCircle, FaHome, FaUserCog } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
// import { FaUserCog } from "react-icons/fa";


export default function AdminDashboard(){
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Landing Page")

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
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Query Details"} open={sidebarOpen} selected={selectedItem === "Query Details"} onClick={()=>{setSelectedItem("Payment Details"); navigate("/admin/query-details")}}/>
      </nav>
      </div>


            {/* Main Content Section */}

            <div className={`w-full px-5 py-10 flex flex-col ${sidebarOpen ? "md:ml-60" : "md:ml-20"}`}>

      <div className="grid grid-cols-1 gap-4">
        <ClassList todayOnly title="Today's Classes" />
        {/* <ClassList title="All Classes" /> */}
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


