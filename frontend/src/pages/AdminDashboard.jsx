import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import ClassList from '../components/ClassList'
import { getUsers } from '../services/userService'
import { getClasses } from '../services/classService'
import { getPayments } from '../services/paymentService'
import { Users, GraduationCap, CreditCard, BookOpen } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0, payments: 0 })

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, classesRes, paymentsRes] = await Promise.all([
          getUsers({ limit: 100 }),
          getClasses(),
          getPayments(),
        ])
        const users = usersRes.data.users || []
        setStats({
          students: users.filter(u => u.role === 'student').length,
          teachers: users.filter(u => u.role === 'teacher').length,
          classes: (classesRes.data || []).length,
          payments: (paymentsRes.data || []).filter(p => p.status === 'paid').length,
        })
      } catch { /* silent */ }
    }
    load()
  }, [])

  return (
    <AdminLayout title="Dashboard">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users size={22} />} label="Students" value={stats.students} color="blue" />
        <StatCard icon={<GraduationCap size={22} />} label="Teachers" value={stats.teachers} color="purple" />
        <StatCard icon={<BookOpen size={22} />} label="Classes" value={stats.classes} color="emerald" />
        <StatCard icon={<CreditCard size={22} />} label="Paid This Month" value={stats.payments} color="amber" />
      </div>

      {/* Today's Classes */}
      <ClassList todayOnly title="Today's Classes" />
    </AdminLayout>
  )
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    blue:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple:  'bg-purple-500/10 text-purple-400 border-purple-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }
  return (
    <div className={`rounded-xl border p-4 flex items-center gap-4 ${colors[color]}`}>
      <div className="p-2 rounded-lg bg-white/5">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  )
}
