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
    <div className="grid h-[calc(100vh-3rem)] grid-cols-1 gap-4 bg-slate-50 p-4 md:grid-cols-3 xl:grid-cols-6">
      {DEAL_STAGES.map((stage) => {
        const stageDeals = grouped[stage.id];

        return (
          <div
            key={stage.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-slate-100/80 backdrop-blur-sm"
          >
            {/* Column header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                {stage.label}
              </h2>
              <span className="text-[11px] text-slate-500">
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
