import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getQueries, updateQuery, deleteQuery } from '../services/queryService'
import toast from 'react-hot-toast'
import { X, Plus } from 'lucide-react'

const inputCls = "w-full px-3 py-2 bg-[#0f172a] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"

export default function QueryDetails() {
  const navigate = useNavigate()
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [editingQuery, setEditingQuery] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchQueries = async () => {
    setLoading(true)
    try {
      const res = await getQueries({ page, limit })
      const data = res.data || {}
      setQueries(data.queries || [])
      setTotal(data.total ?? 0)
      setTotalPages(data.totalPages ?? 1)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load queries')
      setQueries([])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchQueries() }, [page, limit])

  const openEdit = (q) => {
    setEditingQuery(q)
    setEditForm({ studentName: q.studentName || '', className: q.className || '', board: q.board || '', school: q.school || '', requirement: q.requirement || '', contactNumber: q.contactNumber || '', location: q.location || '', city: q.city || '', leadsource: q.leadsource || '' })
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateQuery(editingQuery._id, editForm)
      toast.success('Query updated'); setEditingQuery(null); fetchQueries()
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return
    setDeletingId(id)
    try { await deleteQuery(id); toast.success('Deleted'); fetchQueries() }
    catch (err) { toast.error(err.response?.data?.message || 'Failed to delete') }
    finally { setDeletingId(null) }
  }

  const fmt = d => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

  return (
    <AdminLayout title="Enquiries">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-400">Per page:</label>
          <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1) }}
            className="px-3 py-1.5 bg-[#1e293b] border border-white/10 rounded-lg text-sm text-white focus:outline-none">
            <option value={20}>20</option><option value={50}>50</option><option value={100}>100</option>
          </select>
        </div>
        <button onClick={() => navigate('/admin/query-form')}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors">
          <Plus size={15} /> Add Enquiry
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 animate-pulse">Loading enquiries...</div>
        ) : queries.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No enquiries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wide">
                  {['Student', 'Class', 'Board', 'Contact', 'City', 'Lead Source', 'Date', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {queries.map(q => (
                  <tr key={q._id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">{q.studentName}</td>
                    <td className="px-4 py-3 text-slate-300">{q.className}</td>
                    <td className="px-4 py-3 text-slate-300">{q.board}</td>
                    <td className="px-4 py-3 text-slate-300">{q.contactNumber}</td>
                    <td className="px-4 py-3 text-slate-300">{q.city}</td>
                    <td className="px-4 py-3 text-slate-400">{q.leadsource || '—'}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{fmt(q.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(q)} className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"><FaEdit /></button>
                        <button onClick={() => handleDelete(q._id)} disabled={deletingId === q._id} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors disabled:opacity-50"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && queries.length > 0 && (
        <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
          <p className="text-sm text-slate-500">Showing {total === 0 ? 0 : (page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
              className="px-3 py-1 bg-[#1e293b] border border-white/10 rounded text-sm text-slate-300 disabled:opacity-40 hover:bg-white/5">Previous</button>
            <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
              className="px-3 py-1 bg-[#1e293b] border border-white/10 rounded text-sm text-slate-300 disabled:opacity-40 hover:bg-white/5">Next</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !saving && setEditingQuery(null)}>
          <div className="bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Edit Enquiry</h3>
                <button onClick={() => setEditingQuery(null)} className="text-slate-500 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={handleSaveEdit} className="space-y-3">
                <div><label className="block text-xs text-slate-400 mb-1">Student Name</label><input name="studentName" value={editForm.studentName} onChange={e => setEditForm(p => ({ ...p, studentName: e.target.value }))} required className={inputCls} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-slate-400 mb-1">Class</label><input name="className" value={editForm.className} onChange={e => setEditForm(p => ({ ...p, className: e.target.value }))} required className={inputCls} /></div>
                  <div><label className="block text-xs text-slate-400 mb-1">Board</label>
                    <select name="board" value={editForm.board} onChange={e => setEditForm(p => ({ ...p, board: e.target.value }))} className={inputCls}>
                      {['CBSE', 'ICSE', 'State Board', 'Other'].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div><label className="block text-xs text-slate-400 mb-1">School</label><input value={editForm.school} onChange={e => setEditForm(p => ({ ...p, school: e.target.value }))} className={inputCls} /></div>
                <div><label className="block text-xs text-slate-400 mb-1">Requirement</label><textarea value={editForm.requirement} onChange={e => setEditForm(p => ({ ...p, requirement: e.target.value }))} rows={2} className={inputCls} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-slate-400 mb-1">Contact</label><input value={editForm.contactNumber} onChange={e => setEditForm(p => ({ ...p, contactNumber: e.target.value }))} required className={inputCls} /></div>
                  <div><label className="block text-xs text-slate-400 mb-1">Location</label><input value={editForm.location} onChange={e => setEditForm(p => ({ ...p, location: e.target.value }))} className={inputCls} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs text-slate-400 mb-1">City</label><input value={editForm.city} onChange={e => setEditForm(p => ({ ...p, city: e.target.value }))} required className={inputCls} /></div>
                  <div><label className="block text-xs text-slate-400 mb-1">Lead Source</label><input value={editForm.leadsource} onChange={e => setEditForm(p => ({ ...p, leadsource: e.target.value }))} className={inputCls} /></div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
                  <button type="button" onClick={() => setEditingQuery(null)} className="px-4 py-2 border border-white/10 text-slate-400 hover:text-white text-sm rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
