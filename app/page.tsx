'use client';

import { useMemo, useState } from 'react';

import { PipelineBoard } from '@/components/pipeline/pipelineboard';
import { MOCK_DEALS } from '@/lib/mockData';
import type { Deal } from '@/types/deals';

function formatDate(date?: string) {
  if (!date) return null;
  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export default function PipelinePage() {
  const [deals] = useState<Deal[]>(MOCK_DEALS);

  const activeDeals = useMemo(() => deals.filter((deal) => deal.stage !== 'PASSED'), [deals]);
  const activeOwners = useMemo(
    () => Array.from(new Set(deals.map((deal) => deal.owner).filter(Boolean))) as string[],
    [deals],
  );
  const pipelineValue = useMemo(
    () =>
      activeDeals.reduce((sum, deal) => {
        return sum + (deal.amountTarget ?? 0);
      }, 0),
    [activeDeals],
  );

  const followUps = useMemo(
    () =>
      deals
        .filter((deal) => deal.nextFollowUpAt)
        .sort(
          (a, b) =>
            new Date(a.nextFollowUpAt ?? 0).getTime() -
            new Date(b.nextFollowUpAt ?? 0).getTime(),
        )
        .slice(0, 4),
    [deals],
  );

  const recentNotes = useMemo(
    () =>
      deals
        .filter((deal) => deal.notes)
        .sort(
          (a, b) =>
            new Date(b.lastInteractionAt ?? 0).getTime() -
            new Date(a.lastInteractionAt ?? 0).getTime(),
        )
        .slice(0, 4),
    [deals],
  );

  const warmIntroCount = deals.filter((deal) => deal.stage === 'WARM_INTRO_NEEDED').length;
  const highPriorityDeals = deals.filter((deal) => deal.priority === 'High').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40 blur-3xl">
          <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-indigo-600/40" />
          <div className="absolute right-6 top-20 h-64 w-64 rounded-full bg-emerald-600/30" />
        </div>

        <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Deal Desk
              <span className="rounded-full bg-emerald-300/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-100">
                LP-safe
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-white">Live pipeline for angels & VCs</h1>
            <p className="mt-1 text-sm text-slate-300">
              Keep every outreach, intro, and diligence thread organized in one place—HubSpot but tuned for dealflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <button className="rounded-lg bg-white px-3 py-2 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              + Capture new deal
            </button>
            <button className="rounded-lg border border-white/20 px-3 py-2 text-white transition hover:-translate-y-0.5 hover:border-white/40">
              Share weekly update
            </button>
          </div>
        </header>

        <main className="relative z-10 space-y-8 px-6 pb-10 pt-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Active pipeline"
              primary={`$${pipelineValue.toLocaleString()}`}
              hint="target allocation tracked"
            />
            <StatCard
              label="Next follow-ups"
              primary={`${followUps.length}`}
              hint="scheduled touchpoints"
            />
            <StatCard
              label="Warm intros needed"
              primary={`${warmIntroCount}`}
              hint="blocked by intro paths"
            />
            <StatCard
              label="High priority deals"
              primary={`${highPriorityDeals}`}
              hint={`${activeOwners.length} owners across the pipeline`}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-emerald-200">Live board</p>
                  <h2 className="text-lg font-semibold text-white">Deals by stage</h2>
                  <p className="text-sm text-slate-300">
                    Drag-friendly columns for deal momentum, designed for fast partner meetings.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-900">
                  <span className="rounded-full bg-white px-3 py-1">Angels</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1">Micro-VC</span>
                  <span className="rounded-full bg-indigo-100 px-3 py-1">Seed</span>
                </div>
              </div>
              <PipelineBoard
                deals={deals}
                onDealClick={(deal) => {
                  console.log('Clicked deal:', deal);
                  alert(`Clicked: ${deal.opportunityName} with ${deal.investorName}`);
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200">Tasks</p>
                    <h3 className="text-lg font-semibold text-white">Upcoming follow-ups</h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
                    Due soon
                  </span>
                </div>
                <ul className="mt-3 space-y-3">
                  {followUps.map((deal) => (
                    <li
                      key={deal.id}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-white">{deal.opportunityName}</div>
                        <span className="text-[11px] text-emerald-200">
                          {formatDate(deal.nextFollowUpAt)}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-300">
                        {deal.investorName}
                        {deal.firmName ? ` • ${deal.firmName}` : ''}
                      </p>
                      <p className="text-[11px] text-slate-400">Owner: {deal.owner ?? 'Unassigned'}</p>
                    </li>
                  ))}
                  {followUps.length === 0 && (
                    <li className="rounded-xl border border-dashed border-white/20 px-3 py-2 text-[12px] text-slate-300">
                      No follow-ups scheduled.
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-200">Context sharing</p>
                <h3 className="text-lg font-semibold text-white">Recent investor notes</h3>
                <ul className="mt-3 space-y-3">
                  {recentNotes.map((deal) => (
                    <li key={deal.id} className="rounded-xl bg-white/5 px-3 py-2">
                      <div className="flex items-center justify-between text-sm text-white">
                        <span className="font-semibold">{deal.investorName}</span>
                        <span className="text-[11px] text-slate-300">{formatDate(deal.lastInteractionAt)}</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{deal.opportunityName}</p>
                      <p className="text-[12px] text-slate-200">{deal.notes}</p>
                    </li>
                  ))}
                  {recentNotes.length === 0 && (
                    <li className="rounded-xl border border-dashed border-white/20 px-3 py-2 text-[12px] text-slate-300">
                      Add notes to deals to see them here.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  primary: string;
  hint: string;
}

function StatCard({ label, primary, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-white">{primary}</div>
      <p className="text-sm text-slate-300">{hint}</p>
    </div>
  );
}
