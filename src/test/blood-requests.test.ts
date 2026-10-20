import { describe, expect, it } from 'vitest';
import { canHelp, defaultFilters, demoRequests, filterRequests, loadDemoRequests } from '@/data/blood-requests';

describe('Blood request listing', () => {
  it('filters by blood group', () => {
    expect(filterRequests(demoRequests, { ...defaultFilters, bloodGroup: 'O-' }).map(r => r.id)).toEqual(['req-1042', 'req-1050']);
  });
  it('filters by city', () => {
    expect(filterRequests(demoRequests, { ...defaultFilters, city: 'Westhaven' }).map(r => r.id)).toEqual(['req-1045', 'req-1054', 'req-1050']);
  });
  it('filters emergency urgency', () => {
    expect(filterRequests(demoRequests, { ...defaultFilters, urgency: 'critical' }).map(r => r.id)).toEqual(['req-1046', 'req-1042', 'req-1055']);
  });
  it('filters request status', () => {
    expect(filterRequests(demoRequests, { ...defaultFilters, status: 'fulfilled' }).map(r => r.id)).toEqual(['req-1052', 'req-1056']);
  });
  it('searches hospital and city case insensitively', () => {
    expect(filterRequests(demoRequests, { ...defaultFilters, search: 'RIVERSIDE northbridge' }).map(r => r.id)).toEqual(['req-1042', 'req-1052']);
  });
  it('combines filters and supports no results', () => {
    expect(filterRequests(demoRequests, { ...defaultFilters, bloodGroup: 'AB-', city: 'Lakeview' })).toEqual([]);
  });
  it('sorts newest first', () => {
    expect(filterRequests(demoRequests, defaultFilters)[0]?.id).toBe('req-1045');
  });
  it('sorts critical requests before urgent and scheduled', () => {
    expect(filterRequests(demoRequests, { ...defaultFilters, sort: 'urgent' }).slice(0, 3).map(r => r.id)).toEqual(['req-1046', 'req-1042', 'req-1055']);
  });
  it('only allows a help preview for open requests', () => {
    expect(demoRequests.filter(canHelp).length).toBe(10);
    expect(demoRequests.filter(r => r.status !== 'open').some(canHelp)).toBe(false);
  });
  it('returns local data and exposes a recoverable error', async () => {
    await expect(loadDemoRequests(true)).rejects.toThrow('Unable to load sample requests.');
    await expect(loadDemoRequests()).resolves.toHaveLength(15);
  });
});
