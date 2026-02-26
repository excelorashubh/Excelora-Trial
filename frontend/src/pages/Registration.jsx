import React, { useState } from 'react';
import { User, Mail, Book, Phone, MapPin, GraduationCap, Lock } from 'lucide-react';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gradeLevel: '',
    major: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting to MongoDB via Express:", formData);
    // Here you would use axios.post('/api/students/register', formData)
  };

  const inputStyle = "w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all";
  const iconStyle = "absolute left-3 top-3.5 text-slate-400 w-5 h-5";

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,#FF3E9D,#0E1F40)] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
          <h2 className="text-3xl font-bold text-slate-800">Student Enrollment </h2>
          <p className="text-slate-500 mt-2">Complete your profile to join your assigned classroom.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Section 1: Personal Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <User className={iconStyle} />
              <input 
                name="fullName" 
                placeholder="Full Name" 
                className={inputStyle} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="relative">
              <Mail className={iconStyle} />
              <input 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                className={inputStyle} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Section 2: Contact & Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Phone className={iconStyle} />
              <input 
                name="phone" 
                placeholder="Phone Number" 
                className={inputStyle} 
                onChange={handleChange} 
              />
            </div>
            <div className="relative">
              <MapPin className={iconStyle} />
              <input 
                name="address" 
                placeholder="City, Country" 
                className={inputStyle} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Section 3: Academic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <GraduationCap className={iconStyle} />
              <select 
                name="gradeLevel" 
                className={inputStyle} 
                onChange={handleChange}
                required
              >
                <option value="">Select Grade</option>
                <option value="highschool">High School</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
              </select>
            </div>
            <div className="relative">
              <Book className={iconStyle} />
              <input 
                name="major" 
                placeholder="Field of Study (e.g. CS)" 
                className={inputStyle} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Section 4: Security */}
          <div className="relative">
            <Lock className={iconStyle} />
            <input 
              name="password" 
              type="password" 
              placeholder="Create Password" 
              className={inputStyle} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-4 bg-[linear-gradient(to_right,#FF3E9D,#0E1F40)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration