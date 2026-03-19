import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.jpg'
import {
  LayoutDashboard, Users, GraduationCap, PlusSquare,
  CreditCard, ClipboardList, LogOut, Menu, ChevronLeft,
  BookOpen, FileText
} from 'lucide-react'

const NAV = [
  { label: 'Dashboard',     icon: LayoutDashboard, path: '/admin' },
  { label: 'All Classes',   icon: GraduationCap,   path: '/admin/all-classes' },
  { label: 'Create Class',  icon: PlusSquare,       path: '/admin/create-class' },
  { label: 'Manage Users',  icon: Users,            path: '/admin/users' },
  { label: 'Payments',      icon: CreditCard,       path: '/admin/payments' },
  { label: 'Enquiries',     icon: ClipboardList,    path: '/admin/query-details' },
  { label: 'Add Enquiry',   icon: FileText,         path: '/admin/query-form' },
]

export default function AdminLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-[#1e293b] border-r border-white/5 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-4 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
          <img src={logo} alt="logo" className="w-9 h-9 rounded-xl flex-shrink-0" />
          {!collapsed && <span className="font-bold text-base tracking-tight leading-tight">Excelora<br /><span className="text-xs font-normal text-slate-400">Admin Panel</span></span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, icon: Icon, path }) => {
            const active = pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-none
                  ${active
                    ? 'bg-primary-600/20 text-primary-400 border-r-2 border-primary-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? label : ''}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </button>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className={`border-t border-white/5 p-3 flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center text-primary-400 font-bold text-sm flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={logout} className="text-slate-500 hover:text-red-400 transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-[#0f172a]/80 backdrop-blur border-b border-white/5">
          <div className="flex items-center gap-3">
            <button onClick={() => setCollapsed(p => !p)} className="text-slate-400 hover:text-white transition-colors">
              {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
            <h1 className="text-base font-semibold text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400 hidden sm:block">{user?.name}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
              <LogOut size={13} /> Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
