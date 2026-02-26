import React, { useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const loadRazorpay = () => new Promise((resolve) => {
  if (window.Razorpay) return resolve(true)
  const script = document.createElement('script')
  script.src = 'https://checkout.razorpay.com/v1/checkout.js'
  script.onload = () => resolve(true)
  script.onerror = () => resolve(false)
  document.body.appendChild(script)
})

export default function PaymentPage(){
  const { user } = useAuth()
  const [amount, setAmount] = useState(500)
  const [month, setMonth] = useState('2026-02')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const pay = async () => {
    setLoading(true)
    setMessage('')
    try {
      const ok = await loadRazorpay()
      if (!ok) throw new Error('Razorpay SDK failed to load')

      // client-side validation
      if (!month || !amount || Number(amount) <= 0) {
        setMessage('Please enter a valid month and amount')
        setLoading(false)
        return
      }

      const res = await api.post('/payments/create-order', { amount, month })
      const { orderId, key, paymentId, amount: amountInPaise } = res.data

      const options = {
        key,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Excelora Classes',
        description: `Monthly fee for ${month}`,
        order_id: orderId,
        handler: async function (response) {
          // verify on backend
          try {
            const verify = await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentRecordId: paymentId
            })
            setMessage('Payment successful')
          } catch (err) {
            const data = err?.response?.data
            if (data?.errors) setMessage(data.errors.map(e=>e.msg).join(', '))
            else setMessage('Payment verification failed')
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setMessage(err.message || 'Payment error')
    } finally { setLoading(false) }
  }

  return (
    <div className="container py-8">
      <h2 className="text-xl mb-4">Pay Monthly Fee</h2>
      <div className="max-w-md bg-white p-4 rounded shadow">
        <div className="mb-3">Student: <strong>{user?.name}</strong></div>
        <label className="block mb-2">Month</label>
        <input className="w-full border p-2 mb-3" value={month} onChange={e=>setMonth(e.target.value)} />
        <label className="block mb-2">Amount (INR)</label>
        <input type="number" className="w-full border p-2 mb-3" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
        <button className="w-full bg-blue-600 text-white p-2 rounded" onClick={pay} disabled={loading}>{loading? 'Processing...':'Pay Now'}</button>
        {message && <div className="mt-3 text-sm">{message}</div>}
      </div>
    </div>
  )
}
