import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService'
import toast from 'react-hot-toast'
import { Search, Plus, X } from 'lucide-react'

const ROLES = ['student', 'teacher', 'admin', 'staff', 'salesman', 'user']
const EMPTY = { name: '', email: '', password: '123456', role: 'student', phone: '', class: '', school: '', qualification: '', subject: '', experience: '', status: 'active', assignedTeacher: '' }

const inputCls = "w-full px-3 py-2 bg-[#0f172a] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
const labelCls = "block text-xs font-medium text-slate-400 mb-1"

const ROLE_COLORS = {
  admin: 'bg-purple-500/20 text-purple-300', teacher: 'bg-blue-500/20 text-blue-300',
  student: 'bg-emerald-500/20 text-emerald-300', staff: 'bg-yellow-500/20 text-yellow-300',
  salesman: 'bg-orange-500/20 text-orange-300', user: 'bg-slate-500/20 text-slate-300',
}

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(false)
  const [roleFilter, setRoleFilter] = useState('')
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState(EMPTY)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = {}
      if (roleFilter) params.role = roleFilter
      if (search) params.search = search
      const res = await getUsers(params)
      const all = res.data.users || []
      setUsers(all)
      setTeachers(all.filter(u => u.role === 'teacher'))
    } catch { toast.error('Failed to load users') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [roleFilter])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return toast.error('Name, email and password are required')
    try {
      await createUser(form)
      toast.success('User created')
      setForm(EMPTY); setShowCreate(false); fetchUsers()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create user')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try { await deleteUser(id); toast.success('Deleted'); fetchUsers() }
    catch { toast.error('Delete failed') }
  }

  const startEdit = (u) => {
    setEditingUser(u)
    setEditForm({ name: u.name || '', email: u.email || '', password: '', role: u.role || 'student', phone: u.phone || '', class: u.class || '', school: u.school || '', qualification: u.qualification || '', subject: u.subject || '', experience: u.experience ?? '', status: u.status || 'active', assignedTeacher: u.assignedTeacher?._id || '' })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const payload = { ...editForm }
    if (!payload.password) delete payload.password
    if (payload.experience === '') delete payload.experience
    try {
      await updateUser(editingUser._id, payload)
      toast.success('User updated'); setEditingUser(null); fetchUsers()
    } catch (err) { toast.error(err?.response?.data?.message || 'Update failed') }
  }

  return (
    <AdminLayout title="Manage Users">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input className="w-full pl-9 pr-3 py-2 bg-[#1e293b] border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            placeholder="Search name or email…" value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchUsers()} />
        </div>
        <select className="px-3 py-2 bg-[#1e293b] border border-white/10 rounded-lg text-sm text-white focus:outline-none"
          value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={fetchUsers} className="px-4 py-2 bg-[#1e293b] border border-white/10 text-sm text-slate-300 rounded-lg hover:bg-white/5">Search</button>
        <button onClick={() => setShowCreate(p => !p)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors">
          {showCreate ? <X size={15} /> : <Plus size={15} />}
          {showCreate ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-[#1e293b] rounded-xl border border-white/5 p-5 mb-5">
          <h3 className="text-sm font-semibold text-white mb-4">Create New User</h3>
          <form onSubmit={handleCreate}>
            <UserFormFields form={form} setForm={setForm} teachers={teachers} isNew />
            <button type="submit" className="mt-4 px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg">Create</button>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500 animate-pulse">Loading users...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Details</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500">No users found</td></tr>
                ) : users.map(u => (
                  <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{u.name}</td>
                    <td className="px-4 py-3 text-slate-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[u.role] || 'bg-slate-500/20 text-slate-300'}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{u.phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${u.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {(u.role === 'student' || u.role === 'user') && `Class ${u.class || '—'}`}
                      {(u.role === 'teacher' || u.role === 'staff') && `${u.subject || '—'} · ${u.experience ? u.experience + 'y' : '—'}`}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(u)} className="px-3 py-1 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded text-xs transition-colors">Edit</button>
                        <button onClick={() => handleDelete(u._id)} className="px-3 py-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded text-xs transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setEditingUser(null)}>
          <div className="bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white">Edit — {editingUser.name}</h3>
                <button onClick={() => setEditingUser(null)} className="text-slate-500 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={handleUpdate}>
                <UserFormFields form={editForm} setForm={setEditForm} teachers={teachers} />
                <div className="flex gap-3 mt-5">
                  <button type="submit" className="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg">Save</button>
                  <button type="button" onClick={() => setEditingUser(null)} className="px-5 py-2 border border-white/10 text-slate-400 hover:text-white text-sm rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

function UserFormFields({ form, setForm, teachers, isNew = false }) {
  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const isStudent = form.role === 'student' || form.role === 'user'
  const isTeacher = form.role === 'teacher' || form.role === 'staff'
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div><label className={labelCls}>Name *</label><input name="name" className={inputCls} value={form.name} onChange={set} placeholder="Full name" /></div>
      <div><label className={labelCls}>Email *</label><input name="email" className={inputCls} value={form.email} onChange={set} placeholder="Email" /></div>
      <div><label className={labelCls}>{isNew ? 'Password *' : 'New Password (blank = keep)'}</label><input name="password" type="password" className={inputCls} value={form.password} onChange={set} /></div>
      <div><label className={labelCls}>Phone</label><input name="phone" className={inputCls} value={form.phone} onChange={set} placeholder="Phone" /></div>
      <div>
        <label className={labelCls}>Role</label>
        <select name="role" className={inputCls} value={form.role} onChange={set}>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Status</label>
        <select name="status" className={inputCls} value={form.status} onChange={set}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {isStudent && <>
        <div><label className={labelCls}>Class</label><input name="class" className={inputCls} value={form.class} onChange={set} placeholder="e.g. 10" /></div>
        <div><label className={labelCls}>School</label><input name="school" className={inputCls} value={form.school} onChange={set} /></div>
        <div className="md:col-span-2">
          <label className={labelCls}>Assigned Teacher</label>
          <select name="assignedTeacher" className={inputCls} value={form.assignedTeacher} onChange={set}>
            <option value="">None</option>
            {teachers.map(t => <option key={t._id} value={t._id}>{t.name}{t.subject ? ` (${t.subject})` : ''}</option>)}
          </select>
        </div>
      </>}
      {isTeacher && <>
        <div><label className={labelCls}>Subject</label><input name="subject" className={inputCls} value={form.subject} onChange={set} /></div>
        <div><label className={labelCls}>Qualification</label><input name="qualification" className={inputCls} value={form.qualification} onChange={set} /></div>
        <div><label className={labelCls}>Experience (years)</label><input name="experience" type="number" className={inputCls} value={form.experience} onChange={set} /></div>
      </>}
    </div>
  )
}
