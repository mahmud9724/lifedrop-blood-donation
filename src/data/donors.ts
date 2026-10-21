// Fictional demo donor profiles for the landing page showcase only.
// These are not real donors, statistics, or verification records.
import type { BloodGroup } from './sample';

export interface TopDonor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  city: string;
  donations: number;
}

export const demoTopDonors: TopDonor[] = [
  { id: 'donor-101', name: 'Amara H.', bloodGroup: 'O-', city: 'Northbridge', donations: 24 },
  { id: 'donor-102', name: 'Rafiq A.', bloodGroup: 'B+', city: 'Lakeview', donations: 19 },
  { id: 'donor-103', name: 'Lena K.', bloodGroup: 'A+', city: 'Ashford', donations: 17 },
];
