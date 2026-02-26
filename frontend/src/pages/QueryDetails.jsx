import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.jpg'
import { FaHome, FaUserCog, FaEdit, FaTrash } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { getQueries, updateQuery, deleteQuery } from '../services/queryService'
import { useToast } from '../context/ToastContext'


export default function QueryDetails(){
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Query Details");
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [editingQuery, setEditingQuery] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await getQueries({ page, limit });
      const data = res.data || {};
      setQueries(data.queries || []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to load queries');
      setQueries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [page, limit]);

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setPage(1);
  };

  const openEdit = (q) => {
    setEditingQuery(q);
    setEditForm({
      studentName: q.studentName || '',
      className: q.className || '',
      board: q.board || '',
      school: q.school || '',
      requirement: q.requirement || '',
      contactNumber: q.contactNumber || '',
      location: q.location || '',
      city: q.city || '',
      leadsource: q.leadsource || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingQuery?._id) return;
    setSaving(true);
    try {
      await updateQuery(editingQuery._id, editForm);
      addToast('success', 'Query updated');
      setEditingQuery(null);
      fetchQueries();
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    setDeletingId(id);
    try {
      await deleteQuery(id);
      addToast('success', 'Query deleted');
      fetchQueries();
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col  relative ">

     {/*Header Section */}
    <div className='w-full h-18 px-4 py-2 flex items-center top-0 sticky backdrop-blur-md justify-between dark:bg-[#0f0f0f] z-50 dark:text-white'>
      
      {/*Brand Logo and Name*/}
      <div className='flex items-center gap-4'>
        <GiHamburgerMenu size={25} className='' onClick={()=>setSidebarOpen(prev=>!prev)}/>
      <img src={logo} alt="" className='w-12 h-12 rounded-full'/>
      <h2 className='text-2xl font-bold hidden md:block'>Excelora - Admin Dashboard</h2>
      </div>

      {/* Profile and Logout */}
      <div>
          <span className="mr-4">{user?.name}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={logout}>Logout</button>
        </div>

    </div>
      

    {/*Body section*/}
    <div className='flex '>

      {/*Aside Section*/}
      <div className={`flex flex-col transition-all duration-300 border-r dark:bg-[#0f0f0f] dark:text-white fixed top-18 h-full z-40  ${sidebarOpen ? "w-60" : "w-20"} overflow-y-auto`}>

{/* space-y-1 mt-3 */}
      <nav className='space-y-1 mt-3'>
      <SidebarItem icon={<FaHome/>} text={"Landing Page"} open={sidebarOpen} selected={selectedItem === "Landing Page"} onClick={()=>{setSelectedItem("Landing Page"); navigate("/admin")}}/>
      <SidebarItem icon={<SiGoogleclassroom/>} text={"All Classes"} open={sidebarOpen} selected={selectedItem === "All Classes"} onClick={()=>{setSelectedItem("All Classes"); navigate("/admin/all-classes")}}/>
      <SidebarItem icon={<FaUserCog/>} text={"Manage Users"} open={sidebarOpen} selected={selectedItem === "Manage Users"} onClick={()=>{setSelectedItem("Manage Users"); navigate("/admin/users")}}/>
      <SidebarItem icon={<SiGoogleclassroom/>} text={"Create Classes"} open={sidebarOpen} selected={selectedItem === "Create Classes"} onClick={()=>{setSelectedItem("Create Classes"); navigate("/admin/create-class")}}/>
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Payment Details"} open={sidebarOpen} selected={selectedItem === "Payment Details"} onClick={()=>{setSelectedItem("Payment Details"); navigate("/admin/payments")}}/>
      <SidebarItem icon={<RiSecurePaymentLine/>} text={"Query Details"} open={sidebarOpen} selected={selectedItem === "Query Details"} onClick={()=>{setSelectedItem("Query Details"); navigate("/admin/query-details")}}/>
      {/* <SidebarItem icon={<RiSecurePaymentLine/>} text={"Query Form"} open={sidebarOpen} selected={selectedItem === "Query Form"} onClick={()=>{setSelectedItem("Query Form"); navigate("/admin/query-form")}}/> */}
      </nav>
      </div>


            {/* Main Content Section */}

            <div className={`w-full px-5 py-10 flex flex-col dark:bg-[#0f0f0f] dark:text-white ${sidebarOpen ? "md:ml-60" : "md:ml-20"}`}>
              <div className='flex items-center justify-between px-5 mb-6 flex-wrap gap-4'>
                <h2 className='text-xl font-bold'>Query List</h2>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <span>Per page:</span>
                    <select
                      value={limit}
                      onChange={handleLimitChange}
                      className="border dark:bg-gray-800 dark:border-gray-600 rounded px-2 py-1 text-sm"
                    >
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </label>
                  <button className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg' onClick={()=>navigate("/admin/query-form")}>Add Query</button>
                </div>
              </div>

              {loading ? (
                <div className="px-5 text-center py-8">Loading queries...</div>
              ) : queries.length === 0 ? (
                <div className="px-5 text-center py-8 text-gray-500 dark:text-gray-400">No enquiries yet. Click &quot;Add Query&quot; to create one.</div>
              ) : (
                <>
                  <div className="px-5 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">Student</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">Class</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">Board</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">Contact</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">City</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">Lead Source</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">Date</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queries.map((q) => (
                          <tr key={q._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{q.studentName}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{q.className}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{q.board}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{q.contactNumber}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{q.city}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{q.leadsource || '—'}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{formatDate(q.createdAt)}</td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => openEdit(q)} className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded" title="Edit"><FaEdit /></button>
                                <button type="button" onClick={() => handleDelete(q._id)} disabled={deletingId === q._id} className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded disabled:opacity-50" title="Delete"><FaTrash /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 mt-4 flex items-center justify-between flex-wrap gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {total === 0 ? 0 : (page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
                    </p>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="px-3 py-1 border dark:border-gray-600 rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800">Previous</button>
                      <span className="text-sm">Page {page} of {totalPages}</span>
                      <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-3 py-1 border dark:border-gray-600 rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800">Next</button>
                    </div>
                  </div>
                </>
              )}

              {/* Edit Modal */}
              {editingQuery && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !saving && setEditingQuery(null)}>
                  <div className="bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-4">Edit Enquiry</h3>
                      <form onSubmit={handleSaveEdit} className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-0.5">Student Name</label>
                          <input type="text" name="studentName" value={editForm.studentName} onChange={handleEditChange} required className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-0.5">Class</label>
                            <input type="text" name="className" value={editForm.className} onChange={handleEditChange} required className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-0.5">Board</label>
                            <select name="board" value={editForm.board} onChange={handleEditChange} required className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm">
                              <option value="CBSE">CBSE</option>
                              <option value="ICSE">ICSE</option>
                              <option value="State Board">State Board</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-0.5">School</label>
                          <input type="text" name="school" value={editForm.school} onChange={handleEditChange} className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-0.5">Requirement</label>
                          <textarea name="requirement" value={editForm.requirement} onChange={handleEditChange} rows={2} className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-0.5">Contact Number</label>
                            <input type="tel" name="contactNumber" value={editForm.contactNumber} onChange={handleEditChange} required className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-0.5">Location</label>
                            <input type="text" name="location" value={editForm.location} onChange={handleEditChange} className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-0.5">City</label>
                            <input type="text" name="city" value={editForm.city} onChange={handleEditChange} required className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-0.5">Lead Source</label>
                            <input type="text" name="leadsource" value={editForm.leadsource} onChange={handleEditChange} className="w-full border dark:bg-gray-800 dark:border-gray-600 rounded px-3 py-2 text-sm" />
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
                          <button type="button" onClick={() => setEditingQuery(null)} disabled={saving} className="px-4 py-2 border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
    </div>
  )
}

function SidebarItem({icon, text, open, selected, onClick}){
  return(
    <button className={`flex items-center gap-4 p-2 rounded w-full transition-colors 
    ${open ? "justify-start" : "justify-center"} ${selected ? "bg-[#272727] text-white" : "hover:bg-[#272727] hover:text-white"}`} onClick={onClick}> 
    <span className='text-lg'>{icon}</span>
    {open && <span className='text-sm '>{text}</span>}
    </button>
  )
}
