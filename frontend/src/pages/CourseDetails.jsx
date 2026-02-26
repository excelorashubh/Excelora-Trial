import React, { useState } from 'react'
import { FaBars, FaAngleRight  } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import logo from "../assets/logo.jpg"
import { FaUserCircle } from "react-icons/fa";
import { IoMic } from "react-icons/io5";

import {
  FaHome,
  FaHistory,
  FaList,
  FaThumbsUp,
  FaSearch,
  FaMicrophone,
  FaTimes,
} from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { GoVideo } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify';
import { SiGoogleclassroom } from "react-icons/si";
import { useAuth } from '../context/AuthContext';
import Class01 from '../components/ClassListDetails/class01';
import Class02 from '../components/ClassListDetails/class02';
import Class03 from '../components/ClassListDetails/class03';
import Class04 from '../components/ClassListDetails/class04';
import Class05 from '../components/ClassListDetails/class05';
import Class06 from '../components/ClassListDetails/class06';
import Class07 from '../components/ClassListDetails/class07';
import Class08 from '../components/ClassListDetails/class08';
import Class09 from '../components/ClassListDetails/class09';
import Class10 from '../components/ClassListDetails/class10';
import Class11 from '../components/ClassListDetails/class11';
import Class12 from '../components/ClassListDetails/class12';
import { GiHamburgerMenu } from "react-icons/gi";

const downloadApp = async () => {
    try {
        alert("App will launch Soon")
    } catch (error) {
        alert("App will launch Soons")
    }
}

const CourseDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedItem, setSelectedItem] = useState("Home")
  const [active, setActive] = useState("Home")
  const navigate = useNavigate()
  const { user } = useAuth()
  const [classvalue, setClassValue] = useState("1")
  const [classHam, setClassHam] = useState(false)
  
  return (
    // Main Content Section
    <div className='flex flex-col px-5 py-3 min-h-screen dark:bg-[#0f0f0f] dark:text-white'>

        {/*Header Section*/}
        <div className='sticky top-0 z-50 backdrop-blur-md flex items-center justify-between'>

            {/*Brand Section and Logo*/}
            <div className='flex px-5 py-3 items-center gap-4'>
                <img src={logo} alt="logo" className='w-12 h-12 rounded-full' />
                <span className='text-xl font-bold tracking-tight'>EXCELORA CLASSES</span>
            </div>

            {/* Search Bar Section and menu list items */}
            <div className='hidden md:block'>
            <div className='flex items-center gap-8'>
            <a href="/" className="hover:text-indigo-600 transition" onClick={()=>navigate("/")}>Home</a>
            <a href='/course-details' className="hover:text-indigo-600 transition">Courses</a>
            <a href={user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/student'} className="hover:text-indigo-600 transition">Dashboard</a>
            <a href="/aboutus" className="hover:text-indigo-600 transition">About Us</a>
            </div>
            </div>

            {/*Login and Profile Details Section*/}
            <div className="flex gap-4">
            <button className="px-5 py-2 dark:text-white text-slate-600 font-medium hover:bg-slate-100 hover:text-black rounded-full transition" onClick={()=>navigate("/login")}>Login</button>
            <button className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 shadow-sm shadow-white transition" onClick={()=>navigate('/registration')}>
            Get Started
            </button>
          </div>

          </div>

          {/* Class Details Menu List */}
          <div className='w-full flex items-center justify-evenly mt-10  overflow-y-auto no-scrollbar hidden md:block'>
          {/* <div className='flex items-center justify-center'> */}
          <div className='gap-4 flex items-center justify-center'>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "1"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("1")}>Class 01</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "2"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("2")}>Class 02</p>
            <p className= {`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "3"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("3")}>Class 03</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "4"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("4")}>Class 04</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "5"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("5")}>Class 05</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "6"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("6")}>Class 06</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "7"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("7")}>Class 07</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "8"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("8")}>Class 08</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "9"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("9")}>Class 09</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "10"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("10")}>Class 10</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "11"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("11")}>Class 11</p>
            <p className={`px-4 py-2 border-2 rounded-full cursor-pointer ${classvalue == "12"? "bg-indigo-600 text-white"   : ""}`} onClick={()=>setClassValue("12")}>Class 12</p>
            
           
          </div>
          {/* </div> */}
          </div>

          {/* Small Device */}

          <div className='block md:hidden flex items-center justify-start gap-4 px-2 py-2 border' onClick={()=>setClassHam(prev=>!prev)} >
            <GiHamburgerMenu size={25} className='' /> Select Your Class <FaAngleRight size={20}/>
            
          </div>
          {classHam && <div>JHnn</div>}
          {/* Course Details cards List */}

          <div className='w-full my-10'>
            {classvalue === "1" && <div className='w-full'> <Class01 /> </div>}
            {classvalue === "2" && <div className='w-full'> <Class02 /> </div>}
            {classvalue === "3" && <div className='w-full'> <Class03 /> </div>}
            {classvalue === "4" && <div className='w-full'> <Class04 /> </div>}
            {classvalue === "5" && <div className='w-full'> <Class05 /> </div>}
            {classvalue === "6" && <div className='w-full'> <Class06 /> </div>}
            {classvalue === "7" && <div className='w-full'> <Class07 /> </div>}
            {classvalue === "8" && <div className='w-full'> <Class08 /> </div>}
            {classvalue === "9" && <div className='w-full'> <Class09 /> </div>}
            {classvalue === "10" && <div className='w-full'> <Class10 /> </div>}
            {classvalue === "11" && <div className='w-full'> <Class11 /> </div>}
            {classvalue === "12" && <div className='w-full'> <Class12 /> </div>}
          </div>

          {/* Footer Details*/}
          <div className='w-full flex flex-col items-center justify-center mt-10'>
            <div className='max-w-md flex gap-10 mb-8'>
                <button className=' px-5 py-2 bg-indigo-600 rounded-xl' onClick={()=>navigate("/course-details")}>Views Course</button>
                <button className=' px-5 py-2 bg-indigo-600 rounded-xl' onClick={downloadApp}>Download Apps</button>
            </div>

            <div className='flex w-175 mb-8 gap-10'>
                <p className='text-xl hover:text-indigo-700 cursor-pointer'>Terms & Condition</p>
                <p className='text-xl hover:text-indigo-700 cursor-pointer'>Privacy Policy</p>
                <p className='text-xl hover:text-indigo-700 cursor-pointer'>Refund</p>
                <p className='text-xl hover:text-indigo-700 cursor-pointer'>Disclaimer</p>
                <p className='text-xl hover:text-indigo-700 cursor-pointer'>Contact Us</p>
            </div>

            <div className='text-center text-xs md:text-md'>© {new Date().getFullYear()} Excelora Classes. All rights reserved.</div>
          </div>
          

    </div>
    
  )
}

function SidebarItem({icon, text, open, selected, onClick}){
  return(
    <button className={`flex items-center gap-4 p-2 rounded  transition-colors ${open ? "justify-start" : "justify-center"} ${selected ? "bg-[#272727]" : "hover:bg-[#272727]"}`} onClick={onClick}> 
    <span className='text-lg'>{icon}</span>
    {open && <span className='text-sm '>{text}</span>}
    </button>
  )
}

export default CourseDetails