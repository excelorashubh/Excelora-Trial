import React from 'react'
import img1 from '../../assets/class1teach1.png'
import img2 from '../../assets/class1teach2.png'
import img3 from '../../assets/class1teach3.png'

const Class03 = () => {
  return (
    <div className='w-full flex items-center justify-center'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-3 gap-8'>

            {/* First Crads*/}
            <div className='px-6 py-4 border-2 rounded-2xl w-100'>
                <h1 className='text-xl font-semibold gap-2'>
                    <span className='px-2 py-1 text-sm text-[#ee2400] bg-[#fbd9d3] rounded-md'>Free</span>
                    [Class 03] : Master Core Concepts  With Star Teachers in 2 Days</h1>

                    <div className='text-gray-600 my-5'> 01 Mar - 15 Mar</div>

                    <div className='flex gap-2'>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border '>Math's</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>Science</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>Eng</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>SST</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>CS</p>
                    </div>

                    <div className='flex mt-10 mb-5 justify-between pr-10'>
                        <img src={img1} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                        <img src={img2} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                        <img src={img3} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                    </div>

                    <hr className='w-full h-0.5 bg-gray-600'/>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='text-[#008000] font-bold'>Free</span>
                        <span className='text-white bg-[#72bf6a] px-3 py-1 rounded-full'>Enroll</span>
                    </div>
            </div>

            {/* Second Crads  Concept Booster Course - 5X <br /> Efficient Learning Methods by IITians*/}
            <div className='px-6 py-4 border-2 rounded-2xl w-100'>
                <h1 className='text-xl font-semibold gap-2'>
                    <span className='px-2 py-1 text-sm text-[#ee2400] bg-[#fbd9d3] rounded-md'>Hot</span>
                    Concept Booster Course - 5X <br /> Efficient Learning Methods by IITians</h1>

                    <div className='text-gray-600 my-5'> 01 Mar - 15 Mar</div>

                    <div className='flex gap-2'>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border '>Math's</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>Science</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>Eng</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>SST</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>CS</p>
                    </div>

                    <div className='flex mt-10 mb-5 justify-between pr-10'>
                        <img src={img1} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                        <img src={img2} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                        <img src={img3} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                    </div>

                    <hr className='w-full h-0.5 bg-gray-600'/>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='text-[#008000] font-bold'>₹ 39</span>
                        <span className='text-white bg-[#72bf6a] px-3 py-1 rounded-full'>Enroll</span>
                    </div>
            </div>

            {/* Third Crads  Live Interactive Full Syllabus Course for Class 3 */}
            <div className='px-6 py-4 border-2 rounded-2xl w-100'>
                <h1 className='text-xl font-semibold gap-2'>
                    
                    Live Interactive Full Syllabus Course for Class 3 (2026 - 27)</h1>

                    <div className='text-gray-600 my-5'> 01 Mar - 15 Mar</div>

                    <div className='flex gap-2'>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border '>Math's</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>Science</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>Eng</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>SST</p>
                        <p className='text-xs px-2 py-1 bg-gray-200 dark:bg-black dark:border-white dark:border'>CS</p>
                    </div>

                    <div className='flex mt-10 mb-5 justify-between pr-10'>
                        <img src={img1} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                        <img src={img2} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                        <img src={img3} alt="" sizes='w-15' className='w-15 h-15 rounded-full'/>
                    </div>

                    <hr className='w-full h-0.5 bg-gray-600'/>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='text-[#008000] font-bold'>₹ 31999</span>
                        <span className='text-white bg-[#72bf6a] px-3 py-1 rounded-full'>Enroll</span>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Class03