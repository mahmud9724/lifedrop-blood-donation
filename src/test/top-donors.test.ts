import { describe, expect, it } from 'vitest';
import { demoTopDonors } from '@/data/donors';

describe('demo top donors', () => {
  it('shows exactly three donors ranked by recorded donations, highest first', () => {
    expect(demoTopDonors).toHaveLength(3);
    const counts = demoTopDonors.map(donor => donor.donations);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
    expect(counts[0] ?? 0).toBeGreaterThan(counts[counts.length - 1] ?? 0);
  });

  it('never displays private contact information', () => {
    for (const donor of demoTopDonors) {
      expect(Object.keys(donor)).toEqual(expect.arrayContaining(['id', 'name', 'bloodGroup', 'city', 'donations']));
      expect(Object.keys(donor)).not.toEqual(expect.arrayContaining(['email', 'phone']));
    }
  });
});
