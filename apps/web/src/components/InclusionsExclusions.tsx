import {CheckCircle2, XCircle, ShieldCheck, AlertTriangle} from 'lucide-react'

interface InclusionsExclusionsProps {
  inclusions?: string[]
  exclusions?: string[]
  importantNotes?: string[] | unknown[]
  cancellationPolicy?: string[] | unknown[]
}

export function InclusionsExclusions({
  inclusions = [],
  exclusions = [],
  importantNotes = [],
  cancellationPolicy = [],
}: InclusionsExclusionsProps) {
  return (
    <div className="space-y-8">
      {/* Inclusions & Exclusions Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Inclusions Card */}
        <div className="rounded-[32px] border border-emerald-500/30 bg-emerald-50/30 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-extrabold text-emerald-950">
              Tour Inclusions
            </h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            {inclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions Card */}
        <div className="rounded-[32px] border border-rose-500/30 bg-rose-50/30 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
              <XCircle className="h-5 w-5" />
            </span>
            <h3 className="text-xl font-extrabold text-rose-950">
              Tour Exclusions
            </h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            {exclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Important Notes & Cancellation Policy */}
      {(importantNotes.length > 0 || cancellationPolicy.length > 0) && (
        <div className="grid gap-6 sm:grid-cols-2">
          {importantNotes.length > 0 && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Important Travel Guidelines</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {importantNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{typeof note === 'string' ? note : JSON.stringify(note)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cancellationPolicy.length > 0 && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-sky-600 shrink-0" />
                <span>Cancellation & Refund Policy</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {cancellationPolicy.map((policy, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    <span>{typeof policy === 'string' ? policy : JSON.stringify(policy)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
