import React, { useEffect, useState } from 'react'
import { getClasses } from '../services/classService'
import { uploadMaterial } from '../services/classService'

export default function TeacherMaterials(){
  const [classes, setClasses] = useState([])
  const [file, setFile] = useState(null)
  const [selClass, setSelClass] = useState('')
  const [message, setMessage] = useState('')

  useEffect(()=>{ (async()=>{ try{ const res = await getClasses(); setClasses(res.data) }catch(e){}})() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!selClass || !file) return setMessage('Select class and file')
    try {
      await uploadMaterial(selClass, file)
      setMessage('Uploaded')
      setFile(null)
    } catch (err) { setMessage('Upload failed') }
  }

  return (
    <div className="container py-8">
      <h2 className="text-xl mb-4">Upload Materials</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-lg">
        <select className="w-full border p-2 mb-2" value={selClass} onChange={e=>setSelClass(e.target.value)}>
          <option value="">Select class</option>
          {classes.map(c=> <option key={c._id} value={c._id}>{c.title} - {c.subject}</option>)}
        </select>
        <input type="file" className="w-full mb-2" onChange={e=>setFile(e.target.files[0])} />
        <button className="bg-blue-600 text-white p-2 rounded">Upload</button>
        {message && <div className="mt-2">{message}</div>}
      </form>
    </div>
  )
}
