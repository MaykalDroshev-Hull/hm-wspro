"use client"

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#10b981',
          color: 'white',
          border: 'none',
        },
        className: 'bg-green-500 text-white border-none',
        duration: 5000,
      }}
    />
  )
}
