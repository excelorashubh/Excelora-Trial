import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { getPayments } from '../services/paymentService'

export default function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getPayments({ status, search })
      setPayments(res.data || [])
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <AdminLayout title="Payments">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <select className="px-3 py-2 bg-[#1e293b] border border-white/10 rounded-lg text-sm text-white focus:outline-none"
          value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
        <input className="flex-1 min-w-[180px] px-3 py-2 bg-[#1e293b] border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none"
          placeholder="Search student name or email" value={search} onChange={e => setSearch(e.target.value)} />
        <button onClick={fetchData} className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors">Filter</button>
      </div>

      {/* Table */}
      <div className="bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500 animate-pulse">Loading payments...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">Month</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payments.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-500">No payments found</td></tr>
                ) : payments.map(p => (
                  <tr key={p._id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white">{p.student?.name} <span className="text-slate-500 text-xs">({p.student?.email})</span></td>
                    <td className="px-4 py-3 text-slate-300">{p.month}</td>
                    <td className="px-4 py-3 text-slate-300">₹{p.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{p.date ? new Date(p.date).toLocaleDateString('en-IN') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
