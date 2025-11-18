// components/pipeline/DealCard.tsx
'use client';

import { DEAL_STAGES, type Deal } from '@/types/deals';

interface DealCardProps {
  deal: Deal;
  onClick?: (deal: Deal) => void;
}

export function DealCard({ deal, onClick }: DealCardProps) {
  const handleClick = () => {
    onClick?.(deal);
  };

  const stageMeta = DEAL_STAGES.find((stage) => stage.id === deal.stage);
  const priorityTone: Record<Deal['priority'] | undefined, string> = {
    High: 'bg-rose-50 text-rose-700 ring-rose-200',
    Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
    Low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    undefined: 'bg-slate-50 text-slate-700 ring-slate-200',
  };

  const formattedDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : null;

  return (
    <button
      onClick={handleClick}
      className="w-full text-left rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold text-slate-900">
          {deal.opportunityName}
        </div>
        {deal.priority && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${priorityTone[deal.priority]}`}
          >
            {deal.priority}
          </span>
        )}
      </div>

      <div className="mt-0.5 text-xs text-slate-600">
        {deal.investorName}
        {deal.firmName ? ` • ${deal.firmName}` : ''}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
        {stageMeta && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold ${stageMeta.accent} text-white`}>
            <span aria-hidden>●</span>
            {stageMeta.label}
          </span>
        )}
        {deal.owner && <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold">{deal.owner}</span>}
        {deal.thesisArea && <span className="rounded-full bg-slate-900/5 px-2 py-1 font-semibold">{deal.thesisArea}</span>}
      </div>

      <div className="mt-2 space-y-1 text-[11px] text-slate-500">
        {deal.amountTarget && <div>Target: ${deal.amountTarget.toLocaleString()}</div>}
        {deal.source && <div>Source: {deal.source}</div>}
        {deal.notes && <div className="line-clamp-2 leading-relaxed">{deal.notes}</div>}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        {deal.nextFollowUpAt ? (
          <div className="flex items-center gap-1 font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            Next follow-up {formattedDate(deal.nextFollowUpAt)}
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden />
            No scheduled follow-up
          </div>
        )}

        {deal.lastInteractionAt && <div>Last touch {formattedDate(deal.lastInteractionAt)}</div>}
      </div>
    </button>
  );
}
