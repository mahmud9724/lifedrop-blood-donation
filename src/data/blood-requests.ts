import type { BloodGroup, BloodRequest, Urgency } from './sample';

export type RequestStatus = 'open' | 'matched' | 'fulfilled' | 'closed';
export interface ListedRequest extends BloodRequest {
  requiredAt: string;
  postedAt: string;
  status: RequestStatus;
  patient: string;
  notes: string;
}
export const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const statusLabels: Record<RequestStatus, string> = { open: 'Open', matched: 'Donor matched', fulfilled: 'Fulfilled', closed: 'Closed' };
export const urgencyRank: Record<Urgency, number> = { critical: 0, urgent: 1, normal: 2 };

const rows: [string, BloodGroup, number, string, string, string, string, Urgency, RequestStatus, string][] = [
  ['req-1042', 'O-', 2, 'Riverside General Hospital', 'Northbridge', '2026-10-20T18:00:00Z', '2026-10-20T02:30:00Z', 'critical', 'open', 'Emergency surgery'],
  ['req-1043', 'B+', 1, 'St. Elara Medical Center', 'Lakeview', '2026-10-21T09:00:00Z', '2026-10-20T01:45:00Z', 'urgent', 'open', 'Ongoing treatment'],
  ['req-1044', 'AB+', 3, 'Greenfield Community Clinic', 'Ashford', '2026-10-25T10:30:00Z', '2026-10-19T15:00:00Z', 'normal', 'open', 'Scheduled procedure'],
  ['req-1045', 'A+', 2, 'Westhaven Medical Center', 'Westhaven', '2026-10-21T14:00:00Z', '2026-10-20T03:00:00Z', 'urgent', 'open', 'Surgical care'],
  ['req-1046', 'O+', 4, 'Lakeview District Hospital', 'Lakeview', '2026-10-20T12:00:00Z', '2026-10-20T02:50:00Z', 'critical', 'open', 'Emergency treatment'],
  ['req-1047', 'A-', 1, 'Northbridge Children’s Hospital', 'Northbridge', '2026-10-22T08:00:00Z', '2026-10-19T20:00:00Z', 'urgent', 'matched', 'Specialist care'],
  ['req-1048', 'B-', 2, 'Ashford University Hospital', 'Ashford', '2026-10-23T11:00:00Z', '2026-10-19T12:00:00Z', 'normal', 'open', 'Scheduled surgery'],
  ['req-1049', 'AB-', 1, 'Cedar Grove Health Center', 'Cedar Grove', '2026-10-21T16:00:00Z', '2026-10-19T23:30:00Z', 'urgent', 'open', 'Specialist treatment'],
  ['req-1050', 'O-', 3, 'Westhaven Medical Center', 'Westhaven', '2026-10-22T15:00:00Z', '2026-10-19T10:00:00Z', 'normal', 'matched', 'Surgical care'],
  ['req-1051', 'B+', 2, 'Cedar Grove Health Center', 'Cedar Grove', '2026-10-24T09:30:00Z', '2026-10-19T18:00:00Z', 'normal', 'open', 'Ongoing treatment'],
  ['req-1052', 'A+', 1, 'Riverside General Hospital', 'Northbridge', '2026-10-19T13:00:00Z', '2026-10-18T14:00:00Z', 'urgent', 'fulfilled', 'Recovery care'],
  ['req-1053', 'O+', 2, 'St. Elara Medical Center', 'Lakeview', '2026-10-18T10:00:00Z', '2026-10-17T08:00:00Z', 'normal', 'closed', 'Scheduled procedure'],
  ['req-1054', 'AB+', 1, 'Westhaven Medical Center', 'Westhaven', '2026-10-23T16:30:00Z', '2026-10-19T16:00:00Z', 'normal', 'open', 'Ongoing treatment'],
  ['req-1055', 'A-', 2, 'Ashford University Hospital', 'Ashford', '2026-10-20T17:00:00Z', '2026-10-20T00:30:00Z', 'critical', 'open', 'Emergency surgery'],
  ['req-1056', 'B-', 1, 'Cedar Grove Health Center', 'Cedar Grove', '2026-10-19T12:00:00Z', '2026-10-18T11:00:00Z', 'normal', 'fulfilled', 'Recovery care'],
];
export const demoRequests: ListedRequest[] = rows.map(([id, bloodGroup, units, hospital, city, requiredAt, postedAt, urgency, status, patient]) => ({
  id, bloodGroup, units, hospital, city, requiredAt, requiredDate: requiredAt.slice(0, 10), postedAt, urgency, status, patient,
  notes: 'Please confirm the blood group, required units and donation arrangements with the hospital’s blood bank. Donation eligibility must be assessed by a qualified healthcare professional.',
}));
export const requestCities = [...new Set(demoRequests.map(r => r.city))].sort();
export interface RequestFilters { search: string; bloodGroup: string; city: string; urgency: string; status: string; sort: string }
export const defaultFilters: RequestFilters = { search: '', bloodGroup: 'all', city: 'all', urgency: 'all', status: 'all', sort: 'newest' };
export function filterRequests(requests: ListedRequest[], filters: RequestFilters) {
  const terms = filters.search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return requests.filter(r => {
    const searchable = `${r.id} ${r.bloodGroup} ${r.hospital} ${r.city} ${r.patient}`.toLowerCase();
    return terms.every(term => searchable.includes(term)) &&
      (filters.bloodGroup === 'all' || r.bloodGroup === filters.bloodGroup) &&
      (filters.city === 'all' || r.city === filters.city) &&
      (filters.urgency === 'all' || r.urgency === filters.urgency) &&
      (filters.status === 'all' || r.status === filters.status);
  }).sort((a, b) => (filters.sort === 'urgent' ? urgencyRank[a.urgency] - urgencyRank[b.urgency] : 0) || Date.parse(b.postedAt) - Date.parse(a.postedAt));
}
export const canHelp = (r: ListedRequest) => r.status === 'open';
export const formatRequestTime = (iso: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short' }).format(new Date(iso));
// Local asynchronous fixture loader; the error flag is used for previewing recovery.
export function loadDemoRequests(fail = false): Promise<ListedRequest[]> {
  return new Promise((resolve, reject) => setTimeout(() => fail ? reject(new Error('Unable to load sample requests.')) : resolve(demoRequests), 450));
}
