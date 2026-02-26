import React, { useEffect, useState } from 'react'
import { getPayments } from '../services/paymentService'

export default function StudentPayments(){
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await getPayments()
      setPayments(res.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(()=>{ fetch() }, [])

  return (
    <div className="container py-8">
      <h2 className="text-xl mb-4">My Payments</h2>
      <div className="bg-white p-4 rounded shadow">
        {loading ? <div>Loading...</div> : (
          <table className="w-full text-sm">
            <thead><tr><th>Month</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {payments.map(p=> (
                <tr key={p._id} className="border-t">
                  <td className="py-2">{p.month}</td>
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
