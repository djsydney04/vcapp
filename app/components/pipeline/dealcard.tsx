// components/pipeline/DealCard.tsx
'use client';

import type { Deal } from '@/types/deals';

interface DealCardProps {
  deal: Deal;
  onClick?: (deal: Deal) => void;
}

export function DealCard({ deal, onClick }: DealCardProps) {
  const handleClick = () => {
    onClick?.(deal);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-sm font-semibold text-slate-900">
        {deal.opportunityName}
      </div>

      <div className="mt-0.5 text-xs text-slate-600">
        {deal.investorName}
        {deal.firmName ? ` • ${deal.firmName}` : ''}
      </div>

      {deal.amountTarget && (
        <div className="mt-1 text-xs text-slate-500">
          Target: ${deal.amountTarget.toLocaleString()}
        </div>
      )}

      {deal.nextFollowUpAt && (
        <div className="mt-1 text-[11px] text-slate-500">
          Next follow-up:{' '}
          {new Date(deal.nextFollowUpAt).toLocaleDateString()}
        </div>
      )}
    </button>
  );
}
