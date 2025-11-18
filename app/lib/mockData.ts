// lib/mockData.ts
import type { Deal } from '@/types/deals';

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    stage: 'RESEARCHING',
    opportunityName: 'Pre-seed for FounderCRM',
    investorName: 'Sarah Kim',
    firmName: 'Northbridge Capital',
    amountTarget: 250000,
  },
  {
    id: '2',
    stage: 'OUTREACHED',
    opportunityName: 'Seed round for InfraCo',
    investorName: 'Alex Chen',
    firmName: 'Latitude Ventures',
    amountTarget: 1500000,
    nextFollowUpAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    stage: 'IN_CONVERSATION',
    opportunityName: 'Pre-seed for SocialGraph',
    investorName: 'Maria Lopez',
    firmName: 'Signal Peak',
    amountTarget: 500000,
    nextFollowUpAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
