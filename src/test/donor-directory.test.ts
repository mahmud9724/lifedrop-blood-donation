import { describe, expect, it } from 'vitest';
import { availabilityLabels, defaultDonorFilters, demoDonors, donorCities, filterDonors, findDonorBySlug, loadDemoDonors } from '@/data/donors';

describe('Donor directory', () => {
  it('filters by blood group', () => {
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, bloodGroup: 'O-' }).map(d => d.slug)).toEqual(['amara-h', 'marcus-l']);
  });
  it('filters by city or district', () => {
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, city: 'Westhaven' }).map(d => d.slug)).toEqual(['daniel-m', 'hana-y']);
  });
  it('filters by availability', () => {
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, availability: 'unavailable' }).map(d => d.slug)).toEqual(['omar-d', 'tomas-b']);
  });
  it('searches name and city case insensitively', () => {
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, search: 'amara' }).map(d => d.slug)).toEqual(['amara-h']);
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, search: 'LAKEVIEW' }).map(d => d.slug)).toEqual(['marcus-l', 'rafiq-a']);
  });
  it('combines filters and supports no results', () => {
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, bloodGroup: 'AB-', city: 'Ashford' })).toEqual([]);
  });
  it('sorts by name, location and recorded donations', () => {
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, sort: 'name' })[0]?.slug).toBe('amara-h');
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, sort: 'location' })[0]?.slug).toBe('grace-n');
    expect(filterDonors(demoDonors, { ...defaultDonorFilters, sort: 'donations' })[0]?.slug).toBe('amara-h');
  });
  it('covers a unique slug and every blood group for each demo donor', () => {
    const slugs = demoDonors.map(d => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const group of ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']) expect(demoDonors.some(d => d.bloodGroup === group)).toBe(true);
    expect(findDonorBySlug('amara-h')?.name).toBe('Amara H.');
    expect(findDonorBySlug('nobody-here')).toBeUndefined();
  });
  it('marks donors without recorded donations', () => {
    const empty = demoDonors.filter(d => d.donations === 0);
    expect(empty.map(d => d.slug)).toEqual(['omar-d']);
    expect(empty[0]?.history).toEqual([]);
    expect(empty[0]?.lastDonation).toBeNull();
  });
  it('never exposes private contact information or implies verification', () => {
    for (const donor of demoDonors) {
      expect(Object.keys(donor)).not.toEqual(expect.arrayContaining(['email', 'phone', 'address', 'verified']));
    }
    expect(Object.values(availabilityLabels)).toEqual(['Available now', 'Recently donated', 'Currently unavailable']);
  });
  it('returns local data and exposes a recoverable error', async () => {
    await expect(loadDemoDonors(true)).rejects.toThrow('Unable to load sample donors.');
    await expect(loadDemoDonors()).resolves.toHaveLength(12);
  });
});
