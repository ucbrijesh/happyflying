import { Plane } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin" />
        <Plane className="w-8 h-8 text-sky-600 absolute animate-pulse" />
      </div>
      <p className="mt-6 text-sm font-semibold tracking-wider uppercase text-slate-500 animate-pulse">
        Preparing your luxury journey...
      </p>
    </div>
  )
}
