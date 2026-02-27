import React from 'react'
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import logo from '../assets/logo.jpg'
import { FaArrowRight } from "react-icons/fa";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import { MdSchool } from "react-icons/md";
import { MdOutlineDeveloperMode } from "react-icons/md";
import successform from '../assets/successform.webp'
import englishteacher from '../assets/englishteacher.png'
import mathteacher from '../assets/mathteacher.png' 
import { useAuth } from '../context/AuthContext';

const Home = () => {

  const navigate = useNavigate()
  const { user } = useAuth()

  const openDemo = () => {
  window.open(`https://drive.google.com/file/d/1Pp0TsMOVUUmPsLFbiAR0Dp8vtTtDE4qv/view?usp=sharing`, "_blank", "noopener,noreferrer");

};


  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-[#0f0f0f] dark:text-white">
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b 
            border-slate-200 dark:bg-[#0f0f0f] dark:text-white">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            {/* <BookOpen className="text-white w-6 h-6" /> */}
            <img src={logo} alt="" className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden md:block">EXCELORA CLASSES</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a href="/" className="hover:text-indigo-600 dark:text-white transition">Home</a>
          <a href='/course-details' className="hover:text-indigo-600 dark:text-white transition">Courses</a>
          <a href={user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher' : '/student'} className="hover:text-indigo-600 dark:text-white transition">Dashboard</a>
          <a href="/aboutus" className="hover:text-indigo-600 dark:text-white transition">About Us</a>
          
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2 text-slate-600 dark:text-slate-200 font-medium hover:bg-slate-100 dark:bg-slate-800 dark:hover:text-black rounded-full transition" onClick={()=>navigate("/login")}>Login</button>
          <button className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-sm transition" onClick={()=>navigate('/registration')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="px-8 py-20 lg:py-25 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-700 uppercase bg-indigo-50 rounded-full">
            The Future of Learning
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Everything you need for <span className="text-indigo-600">Modern Education.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg dark:text-slate-300">
            A centralized platform for Admins to build, Teachers to lead, and Students to succeed. Streamline your classroom management today.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold dark:border-white dark:border-2 hover:bg-slate-800 transition">
              Explore Classes <ArrowRight size={20} />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-white dark:text-indigo-700 border border-slate-200 rounded-xl font-semibold hover:border-indigo-400 transition" onClick={()=>openDemo()}>
              <PlayCircle size={20} className="text-indigo-600 dark:text-indigo-700" /> Watch Demo Class
            </button>
            
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="relative bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 transition-transform hover:scale-[1.02] duration-500">
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
               alt="Students collaborating" 
               className="rounded-xl"
             />
          </div>
        </div>
      </section>

      {/* --- Enquiry Section --- */}
      <section className='px-8 py-20 lg:py-0 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center'>
        <div className=''>
          <img src={successform} alt="" className='max-w-100'/>
        </div>

        <div className='border rounded-2xl bg-gray-200 flex items-center justify-center'>
          <form action="" className='w-[80%] p-2.5 flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold text-indigo-600'>Book your Free Demo Session</h2>
            
            <p className='text-md font-semibold text-gray-700'>Learn from India's best teachers</p> <br /> <hr className='w-full h-0.5'/>

            <div className='w-full flex flex-col items-center justify-center'>
              <h3 className='text-lg font-semibold mb-5 text-gray-900'>Enter Your Details</h3>

            <input type="text" className='w-full px-2 mb-5 py-2 border-l-2 border-black ' placeholder='Student Name'/>

             <input type="text" className='w-full px-2 py-2 mb-5 border-l-2 border-black ' placeholder='Class'/>

             <input type="text" className='w-full px-2 py-2 mb-5 border-l-2 border-black ' placeholder='School'/>

             <input type="text" className='w-full px-2 py-2 mb-5 border-l-2 border-black ' placeholder='Contact Number'/>

             <input type="text" className='w-full px-2 py-2 mb-5 border-l-2 border-black ' placeholder='City'/>

            <button className='w-full px-2 py-2 mb-5  rounded-lg border-black bg-indigo-600 hover:bg-indigo-700 text-white font-medium'>Submit Details</button>
            </div>
          </form>
        </div>
      </section>

      
      

      {/* --- Role Features Section --- */}
      <section id="roles" className="bg-white dark:bg-[#0f0f0f] py-24 px-8 border-y border-slate-100 ">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 uppercase ">Comprehensive learning programs
                    & classes for all students</h2>
          <p className="text-slate-500">Become lifelong learners with India's best teachers,
engaging video lessons and personalised learning journeys.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {/* Admin Card */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition group cursor-pointer">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <FaSchoolCircleCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 uppercase cursor-pointer">School Academic's</h3>
            <p className="text-slate-600">Create classes, manage user databases, and oversee the entire educational infrastructure with one click.</p>
            <div className='flex items-center justify-end pt-5'>
            <button className='flex border-2 border-white rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white' onClick={()=>navigate("/course-details")}>Explore Course</button>
            </div>
          </div>

          {/* Teacher Card */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition group cursor-pointer">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <MdSchool size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 uppercase">NEET, JEE & Other Compentative Exam</h3>
            <p className="text-slate-600">Access your assigned classes, upload curriculum, and track student attendance in real-time.</p>
            <div className='flex items-center justify-end pt-5'>
            <button className='flex border-2 border-white rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white' onClick={()=>navigate("/course-details")}>Explore Course</button>
            </div>
          </div>

          {/* Student Card */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition group cursor-pointer">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition ">
              <MdOutlineDeveloperMode size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 uppercase">Computer Science</h3>
            <p className="text-slate-600">Join your personalized classroom, download resources, and stay updated with teacher announcements.</p>
            <div className='flex items-center justify-end pt-5'>
            <button className='flex border-2 border-white rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white' onClick={()=>navigate("/course-details")}>Explore Course</button>
            </div>
          </div>

          
        </div>
      </section>
       
      {/* --- Teacher Details Sections  --- */}
      <section className='"bg-white py-24 px-8 border-y border-slate-100'>
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 uppercase">Our Best Teacher's</h2>
        
        </div>

        {/* Teacher Details Cards  */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 mb-10 md:gap-10 overflow-x-auto md:overflow-visible">


          <div className='w-30 h-30 flex flex-col items-center justify-center '>
            <img src={mathteacher} alt="" className='flex w-25 h-25 border-2 rounded-full' />
            <h2 className='text-xl font-semibold'>Shubham Kumar</h2>
            <p className='text-md text-gray-600'>B.Tech - Mechanical Engineering</p>
            <p className='text-md text-gray-600'>6 + Yrs Expereince</p>
          </div>

          <div className='w-30 h-30 flex flex-col items-center justify-center '>
            <img src={englishteacher} alt="" className=' flex w-25 h-25 border-2 rounded-full' />
            <h2 className='text-xl font-semibold'>Ankita Singh</h2>
            <p className='text-md text-gray-600'>Master's - English</p>
            <p className='text-md text-gray-600'>6 + Yrs Expereince</p>
          </div>

          <div className='w-30 h-30 flex flex-col items-center justify-center'>
            <img src={englishteacher} alt="" className='flex w-25 h-25 border-2 rounded-full' />
            <h2 className='text-xl font-semibold'>Ankita Singh</h2>
            <p className='text-md text-gray-600'>Master's - English</p>
            <p className='text-md text-gray-600'>6 + Yrs Expereince</p>
          </div>


          <div className='w-30 h-30 flex flex-col items-center justify-center'>
            <img src={englishteacher} alt="" className='flex w-25 h-25 border-2 rounded-full' />
            <h2 className='text-xl font-semibold'>Ankita Singh</h2>
            <p className='text-md text-gray-600'>Master's - English</p>
            <p className='text-md text-gray-600'>6 + Yrs Expereince</p>
          </div>
        </div>
        <div className='flex items-center justify-center '>
          <button className='px-3 py-2 border-2 flex gap-3 items-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700'>Check All Teacher's Details <FaArrowRight size={20}/> </button>
        </div>
      </section>


      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
