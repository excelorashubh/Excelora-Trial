import React from 'react'
import { useToast } from '../context/ToastContext'

export default function Toasts(){
  const { toasts, removeToast } = useToast()
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`max-w-sm w-full px-4 py-2 rounded shadow-lg text-white ${t.type==='error'?'bg-red-600':'bg-green-600'}`}>
          <div className="flex justify-between items-start">
            <div className="text-sm">{t.message}</div>
            <button className="ml-2 text-xl leading-none" onClick={()=>removeToast(t.id)}>×</button>
          </div>
        </div>
      ))}
    </div>
  )
}
