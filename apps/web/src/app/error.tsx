'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled runtime application error:', error)
  }, [error])

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-slate-50">
      <div className="max-w-md mx-auto text-center bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          We experienced an unexpected turbulence while processing this request. Our flight team has been alerted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 text-white font-medium shadow-md shadow-sky-600/20 hover:bg-sky-700 transition-all active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}
