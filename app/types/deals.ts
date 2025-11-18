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
}

export const DEAL_STAGES: { id: DealStage; label: string }[] = [
  { id: 'RESEARCHING', label: 'Researching' },
  { id: 'WARM_INTRO_NEEDED', label: 'Warm intro needed' },
  { id: 'OUTREACHED', label: 'Outreached' },
  { id: 'IN_CONVERSATION', label: 'In conversation' },
  { id: 'PASSED', label: 'Passed' },
  { id: 'INVESTED', label: 'Invested' },
];
