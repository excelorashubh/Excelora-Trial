import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((type, message, timeout = 5000) => {
    const id = `${Date.now()}-${Math.floor(Math.random()*10000)}`
    const t = { id, type, message }
    setToasts((s) => [...s, t])
    if (timeout) setTimeout(() => removeToast(id), timeout)
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((s) => s.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export default ToastContext
