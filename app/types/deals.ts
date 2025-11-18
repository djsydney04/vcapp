export type DealStage =
  | 'RESEARCHING'
  | 'WARM_INTRO_NEEDED'
  | 'OUTREACHED'
  | 'IN_CONVERSATION'
  | 'PASSED'
  | 'INVESTED';

export interface Deal {
  id: string;
  stage: DealStage;
  opportunityName: string;
  investorName: string;
  firmName?: string;
  amountTarget?: number;
  nextFollowUpAt?: string;
  lastInteractionAt?: string;
  owner?: string;
  priority?: 'High' | 'Medium' | 'Low';
  thesisArea?: string;
  source?: string;
  notes?: string;
}

export const DEAL_STAGES: { id: DealStage; label: string; description: string; accent: string }[] = [
  {
    id: 'RESEARCHING',
    label: 'Researching',
    description: 'Validating fit, collecting founder context',
    accent: 'bg-sky-500',
  },
  {
    id: 'WARM_INTRO_NEEDED',
    label: 'Warm intro needed',
    description: 'Need an intro path to founder or lead',
    accent: 'bg-amber-500',
  },
  {
    id: 'OUTREACHED',
    label: 'Outreached',
    description: 'Cold outbound sent, awaiting a reply',
    accent: 'bg-indigo-500',
  },
  {
    id: 'IN_CONVERSATION',
    label: 'In conversation',
    description: 'Actively trading notes or diligence',
    accent: 'bg-emerald-500',
  },
  {
    id: 'PASSED',
    label: 'Passed',
    description: 'Not pursuing but tracking',
    accent: 'bg-slate-400',
  },
  {
    id: 'INVESTED',
    label: 'Invested',
    description: 'Allocated capital and onboarding',
    accent: 'bg-purple-500',
  },
];
