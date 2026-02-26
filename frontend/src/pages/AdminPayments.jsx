import React, { useEffect, useState } from 'react'
import { getPayments } from '../services/paymentService'

export default function AdminPayments(){
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await getPayments({ status, search })
      setPayments(res.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(()=>{ fetch() }, [])

  return (
    <div className="container py-8">
      <h2 className="text-xl mb-4">Payments Report</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex gap-2">
          <select className="border p-2" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
          <input className="border p-2 flex-1" placeholder="Search student name or email" value={search} onChange={e=>setSearch(e.target.value)} />
          <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={fetch}>Filter</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? <div>Loading...</div> : (
          <table className="w-full text-sm">
            <thead><tr><th>Student</th><th>Month</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {payments.map(p=> (
                <tr key={p._id} className="border-t">
                  <td className="py-2">{p.student?.name} ({p.student?.email})</td>
                  <td>{p.month}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.status}</td>
                  <td>{p.date ? new Date(p.date).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
