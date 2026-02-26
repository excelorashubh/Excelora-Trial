import React, { useEffect, useState } from 'react'
import { getClasses, markAttendance, getAttendance } from '../services/classService'

export default function AttendancePage(){
  const [classes, setClasses] = useState([])
  const [selClass, setSelClass] = useState('')
  const [present, setPresent] = useState([])
  const [attendance, setAttendance] = useState([])

  useEffect(()=>{ (async()=>{ try{ const res = await getClasses(); setClasses(res.data) }catch(e){}})() }, [])

  const loadAttendance = async (classId) => {
    setSelClass(classId)
    try{ const res = await getAttendance(classId); setAttendance(res.data) }catch(e){}
  }

  const submit = async (e) => {
    e.preventDefault()
    try{
      await markAttendance(selClass, { present })
      setPresent([])
      loadAttendance(selClass)
    } catch(e){}
  }

  return (
    <div className="container py-8">
      <h2 className="text-xl mb-4">Attendance</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2">Select Class</h3>
          <select className="w-full border p-2" onChange={e=>loadAttendance(e.target.value)} value={selClass}>
            <option value="">Choose</option>
            {classes.map(c=> <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
          <form onSubmit={submit} className="mt-4">
            <label className="block mb-2">Present (student IDs comma separated)</label>
            <input className="w-full border p-2 mb-2" value={present.join(',')} onChange={e=>setPresent(e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} />
            <button className="bg-blue-600 text-white px-3 py-1 rounded">Mark Attendance</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="mb-2">Attendance Records</h3>
          {attendance.length===0 ? <div>No records</div> : (
            <ul>
              {attendance.map((a,i)=> (
                <li key={i} className="border-b py-2">{new Date(a.date).toLocaleString()} — Present: {a.present.join(', ')}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
