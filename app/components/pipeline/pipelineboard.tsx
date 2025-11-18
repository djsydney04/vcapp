// components/pipeline/PipelineBoard.tsx
'use client';

import { DEAL_STAGES, type Deal, type DealStage } from '@/types/deals';
import { DealCard } from './dealcard';

interface PipelineBoardProps {
  deals: Deal[];
  onDealClick?: (deal: Deal) => void;
}

export function PipelineBoard({ deals, onDealClick }: PipelineBoardProps) {
  // Start with an empty array for each stage
  const initial: Record<DealStage, Deal[]> = {
    RESEARCHING: [],
    WARM_INTRO_NEEDED: [],
    OUTREACHED: [],
    IN_CONVERSATION: [],
    PASSED: [],
    INVESTED: [],
  };

  // Group deals by their stage
  const grouped = deals.reduce((acc, deal) => {
    acc[deal.stage].push(deal);
    return acc;
  }, initial);

  return (
    <div className="grid min-h-[520px] grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-inner md:grid-cols-3 xl:grid-cols-6">
      {DEAL_STAGES.map((stage) => {
        const stageDeals = grouped[stage.id];

        return (
          <div
            key={stage.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm"
          >
            {/* Column header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-200 px-3 py-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex h-2.5 w-2.5 rounded-full ${stage.accent}`} aria-hidden />
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                    {stage.label}
                  </h2>
                </div>
                <p className="text-[11px] font-medium text-slate-500">
                  {stage.description}
                </p>
              </div>
              <span className="rounded-full bg-slate-900/5 px-2 py-1 text-[11px] font-semibold text-slate-700">
                {stageDeals.length}
              </span>
            </div>

            {/* Column body */}
            <div className="flex-1 space-y-2 overflow-y-auto px-3 py-2">
              {stageDeals.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onClick={onDealClick}
                />
              ))}

              {stageDeals.length === 0 && (
                <div className="mt-2 rounded-md border border-dashed border-slate-300 px-2 py-4 text-center text-xs text-slate-400">
                  No deals in this stage.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
