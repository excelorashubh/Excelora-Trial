import React, { useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate } from 'react-router-dom'
import { createQuery } from '../services/queryService'
import toast from 'react-hot-toast'

const inputCls = "w-full px-3 py-2.5 bg-[#0f172a] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
const labelCls = "block text-xs font-medium text-slate-400 mb-1"

const EMPTY = { studentName: '', className: '', board: '', school: '', requirement: '', contactNumber: '', location: '', city: '', leadsource: '' }

export default function QueryForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createQuery(form)
      toast.success('Enquiry submitted')
      setForm(EMPTY)
      navigate('/admin/query-details')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit')
    } finally { setSubmitting(false) }
  }

  return (
    <AdminLayout title="Add Enquiry">
      <div className="max-w-2xl">
        <div className="bg-[#1e293b] rounded-xl border border-white/5 p-6">
          <h2 className="text-base font-semibold text-white mb-5">Student Enquiry Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelCls}>Student Name *</label><input className={inputCls} value={form.studentName} onChange={set('studentName')} required placeholder="Full name" /></div>
            <div><label className={labelCls}>Class *</label><input className={inputCls} value={form.className} onChange={set('className')} required placeholder="e.g. 10" /></div>
            <div>
              <label className={labelCls}>Board *</label>
              <select className={inputCls} value={form.board} onChange={set('board')} required>
                <option value="">Select Board</option>
                {['CBSE', 'ICSE', 'State Board', 'Other'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div><label className={labelCls}>School</label><input className={inputCls} value={form.school} onChange={set('school')} placeholder="School name" /></div>
            <div className="md:col-span-2"><label className={labelCls}>Requirement</label><textarea className={inputCls} rows={3} value={form.requirement} onChange={set('requirement')} placeholder="e.g. Maths coaching, NEET prep…" /></div>
            <div><label className={labelCls}>Contact Number *</label><input type="tel" className={inputCls} value={form.contactNumber} onChange={set('contactNumber')} required pattern="[0-9]{10}" placeholder="10-digit number" /></div>
            <div><label className={labelCls}>Location / Area</label><input className={inputCls} value={form.location} onChange={set('location')} /></div>
            <div><label className={labelCls}>City *</label><input className={inputCls} value={form.city} onChange={set('city')} required /></div>
            <div><label className={labelCls}>Lead Source</label><input className={inputCls} value={form.leadsource} onChange={set('leadsource')} placeholder="e.g. Instagram, Referral" /></div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={submitting}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
              <button type="button" onClick={() => navigate('/admin/query-details')}
                className="px-5 py-2.5 border border-white/10 text-slate-400 hover:text-white text-sm rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
