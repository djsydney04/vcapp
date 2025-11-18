// app/pipeline/page.tsx
'use client';

import { useState } from 'react';
import { PipelineBoard } from '@/components/pipeline/pipelineboard';
import { MOCK_DEALS } from '@/lib/mockData';
import type { Deal } from '@/types/deals';

export default function PipelinePage() {
  // local state to hold our deals (for now, just mock data)
  const [deals] = useState<Deal[]>(MOCK_DEALS);

  return (
    <div className="flex h-screen flex-col">
      {/* Simple header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
        <div className="text-sm font-semibold tracking-tight">
          FounderCRM <span className="text-xs text-slate-500">/ Pipeline</span>
        </div>
        <div className="text-xs text-slate-500">v0 – mock data only</div>
      </header>

      {/* Pipeline board */}
      <PipelineBoard
        deals={deals}
        onDealClick={(deal) => {
          // For now just log / alert. Later: open a drawer.
          console.log('Clicked deal:', deal);
          alert(`Clicked: ${deal.opportunityName} with ${deal.investorName}`);
        }}
      />
    </div>
  );
}
