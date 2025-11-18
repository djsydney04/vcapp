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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col justify-between border-r border-slate-200 bg-white/80 px-6 py-8 backdrop-blur lg:flex">
          <div className="space-y-8">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600">Deal Desk</p>
              <h1 className="text-xl font-semibold text-slate-900">Pipeline</h1>
              <p className="text-sm text-slate-500">Calm, modern workspace for angels & VCs.</p>
            </div>
            <nav className="space-y-1 text-sm font-semibold text-slate-700">
              <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-slate-100">
                <span>Overview</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">Live</span>
              </button>
              <button className="w-full rounded-lg px-3 py-2 text-left transition hover:bg-slate-100">Pipeline</button>
              <button className="w-full rounded-lg px-3 py-2 text-left transition hover:bg-slate-100">Notes</button>
              <button className="w-full rounded-lg px-3 py-2 text-left transition hover:bg-slate-100">Tasks</button>
            </nav>
          </div>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
              New deal
            </button>
            <button className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300">
              Share update
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 px-6 py-5 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.15em] text-emerald-700">Dealflow health</p>
                <h2 className="text-2xl font-semibold text-slate-900">Where your week stands</h2>
                <p className="text-sm text-slate-500">
                  Clean whitespace and focused metrics so partner meetings stay crisp.
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold">
                <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 transition hover:border-slate-300">
                  Export
                </button>
                <button className="rounded-lg bg-slate-900 px-3 py-2 text-white shadow-sm transition hover:bg-slate-800">
                  + Add deal
                </button>
              </div>
            </div>
          </header>

          <main className="space-y-10 px-6 pb-12 pt-8">
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
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-emerald-700">Live board</p>
                    <h3 className="text-lg font-semibold text-slate-900">Deals by stage</h3>
                    <p className="text-sm text-slate-500">Simplified columns with just enough context to keep momentum.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-700">
                    <span className="rounded-full bg-slate-100 px-3 py-1">Angels</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1">Micro-VC</span>
                    <span className="rounded-full bg-indigo-50 px-3 py-1">Seed</span>
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
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-emerald-700">Tasks</p>
                      <h3 className="text-lg font-semibold text-slate-900">Upcoming follow-ups</h3>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      Due soon
                    </span>
                  </div>
                  <ul className="mt-3 space-y-3">
                    {followUps.map((deal) => (
                      <li
                        key={deal.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-slate-900">{deal.opportunityName}</div>
                          <span className="text-[11px] text-emerald-700">
                            {formatDate(deal.nextFollowUpAt)}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-600">
                          {deal.investorName}
                          {deal.firmName ? ` • ${deal.firmName}` : ''}
                        </p>
                        <p className="text-[11px] text-slate-500">Owner: {deal.owner ?? 'Unassigned'}</p>
                      </li>
                    ))}
                    {followUps.length === 0 && (
                      <li className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-[12px] text-slate-500">
                        No follow-ups scheduled.
                      </li>
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-indigo-700">Context sharing</p>
                  <h3 className="text-lg font-semibold text-slate-900">Recent investor notes</h3>
                  <ul className="mt-3 space-y-3">
                    {recentNotes.map((deal) => (
                      <li key={deal.id} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="flex items-center justify-between text-sm text-slate-900">
                          <span className="font-semibold">{deal.investorName}</span>
                          <span className="text-[11px] text-slate-500">{formatDate(deal.lastInteractionAt)}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{deal.opportunityName}</p>
                        <p className="text-[12px] text-slate-700">{deal.notes}</p>
                      </li>
                    ))}
                    {recentNotes.length === 0 && (
                      <li className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-[12px] text-slate-500">
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
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{primary}</div>
      <p className="text-sm text-slate-500">{hint}</p>
    </div>
  );
}
