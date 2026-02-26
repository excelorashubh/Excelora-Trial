const AboutUs = () => {
    return (
        <div className="w-full dark:bg-[#0f0f0f] dark:text-white">
    
          {/* Hero Section */}
          <section className="bg-blue-600 dark:bg-[#0f0f0f] text-white py-16 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold">
              About Excelora Classes
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Empowering students with expert teachers, live classes, and quality
              study materials for better academic success.
            </p>
          </section>
    
          {/* Who We Are */}
          <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
               alt="Students collaborating" 
               className="rounded-xl"
             />
    
            <div>
              <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">
                Excelora Classes is an online learning platform dedicated to
                providing high-quality education for students. Our experienced
                teachers, structured curriculum, and interactive live sessions help
                students understand concepts clearly and perform better in exams.
              </p>
            </div>
          </section>
    
          {/* Mission & Vision */}
          <section className="bg-gray-100 py-12 dark:bg-[#0f0f0f]">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 ">
              <div className="bg-white p-6 dark:bg-slate-600 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-600 dark:text-slate-200 ">
                  To make quality education affordable and accessible for every
                  student through modern online learning.
                </p>
              </div>
    
              <div className="bg-white dark:bg-slate-600 dark:text-slate-200 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-gray-600 dark:text-slate-200 ">
                  To become a trusted online education platform that helps students
                  achieve academic excellence.
                </p>
              </div>
            </div>
          </section>
    
          {/* Why Choose Us */}
          <section className="py-12 text-center px-6 border-t-2">
            <h2 className="text-2xl font-bold mb-8">Why Choose Excelora?</h2>
    
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="p-6 shadow rounded-lg">
                <h4 className="font-semibold mb-2">Expert Teachers</h4>
                <p className="text-sm text-gray-500">
                  Learn from experienced and qualified educators.
                </p>
              </div>
    
              <div className="p-6 shadow rounded-lg">
                <h4 className="font-semibold mb-2">Live Classes</h4>
                <p className="text-sm text-gray-500">
                  Interactive live sessions for better understanding.
                </p>
              </div>
    
              <div className="p-6 shadow rounded-lg">
                <h4 className="font-semibold mb-2">Study Materials</h4>
                <p className="text-sm text-gray-500">
                  Notes, assignments, and recorded lectures.
                </p>
              </div>
    
              <div className="p-6 shadow rounded-lg">
                <h4 className="font-semibold mb-2">Affordable Fees</h4>
                <p className="text-sm text-gray-500">
                  Quality education at reasonable pricing.
                </p>
              </div>
            </div>
          </section>
    
          {/* Achievements */}
          <section className="bg-blue-600 dark:bg-[#0f0f0f] text-white py-12 text-center border-y-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div>
                <h3 className="text-3xl font-bold">5000+</h3>
                <p>Students</p>
              </div>
    
              <div>
                <h3 className="text-3xl font-bold">100+</h3>
                <p>Teachers</p>
              </div>
    
              <div>
                <h3 className="text-3xl font-bold">50+</h3>
                <p>Classes Monthly</p>
              </div>
    
              <div>
                <h3 className="text-3xl font-bold">99%</h3>
                <p>Success Rate</p>
              </div>
            </div>
          </section>
    
          {/* Call To Action */}
          <section className="bg-gray-100 dark:bg-[#0f0f0f] dark:text-white py-12 text-center px-4">
            <h2 className="text-2xl font-bold mb-4">
              Start Your Learning Journey Today
            </h2>
    
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Join Now
            </button>
          </section>
        </div>
      );

    
}

export default AboutUs