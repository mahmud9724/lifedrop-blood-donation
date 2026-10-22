// Fictional demo donor profiles for the landing page showcase and donor directory.
// These are not real donors, statistics, or verification records.
import { bloodGroups } from './blood-requests';
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

export type Availability = 'available' | 'recently-donated' | 'unavailable';
export const availabilityLabels: Record<Availability, string> = {
  available: 'Available now',
  'recently-donated': 'Recently donated',
  unavailable: 'Currently unavailable',
};

export interface DonationRecord { date: string; location: string }

export interface DirectoryDonor {
  id: string;
  slug: string;
  name: string;
  bloodGroup: BloodGroup;
  city: string;
  availability: Availability;
  donations: number;
  lastDonation: string | null; // ISO date; null when there is nothing appropriate to show
  joined: string; // ISO date
  bio: string;
  history: DonationRecord[];
}

const bloodCenter = (city: string) => `${city} Community Blood Center`;

export const demoDonors: DirectoryDonor[] = [
  {
    id: 'donor-101', slug: 'amara-h', name: 'Amara H.', bloodGroup: 'O-', city: 'Northbridge',
    availability: 'available', donations: 24, lastDonation: '2026-10-02', joined: '2024-02-11',
    bio: 'Regular whole-blood donor who books appointments around school holidays and brings friends along to their first visits.',
    history: [
      { date: '2026-10-02', location: bloodCenter('Northbridge') },
      { date: '2026-08-07', location: bloodCenter('Northbridge') },
      { date: '2026-06-12', location: 'Northbridge Mobile Blood Drive' },
    ],
  },
  {
    id: 'donor-102', slug: 'rafiq-a', name: 'Rafiq A.', bloodGroup: 'B+', city: 'Lakeview',
    availability: 'available', donations: 19, lastDonation: '2026-09-18', joined: '2023-07-02',
    bio: 'Weekend donor who fits appointments around a warehouse shift and keeps a reminder for the next eligible date.',
    history: [
      { date: '2026-09-18', location: bloodCenter('Lakeview') },
      { date: '2026-07-24', location: bloodCenter('Lakeview') },
    ],
  },
  {
    id: 'donor-103', slug: 'lena-k', name: 'Lena K.', bloodGroup: 'A+', city: 'Ashford',
    availability: 'recently-donated', donations: 17, lastDonation: '2026-10-12', joined: '2024-05-20',
    bio: 'Donates after every campus blood drive and helps students find their nearest donation center.',
    history: [
      { date: '2026-10-12', location: 'Ashford University Blood Drive' },
      { date: '2026-08-29', location: bloodCenter('Ashford') },
    ],
  },
  {
    id: 'donor-104', slug: 'daniel-m', name: 'Daniel M.', bloodGroup: 'O+', city: 'Westhaven',
    availability: 'available', donations: 15, lastDonation: '2026-08-30', joined: '2023-11-14',
    bio: 'Prefers early-morning appointments before work and has donated at three different centers across the city.',
    history: [
      { date: '2026-08-30', location: bloodCenter('Westhaven') },
      { date: '2026-06-19', location: bloodCenter('Westhaven') },
    ],
  },
  {
    id: 'donor-105', slug: 'sofia-r', name: 'Sofia R.', bloodGroup: 'AB+', city: 'Cedar Grove',
    availability: 'available', donations: 12, lastDonation: '2026-09-25', joined: '2024-03-08',
    bio: 'Plasma-focused donor who appreciates the longer appointment windows and brings a book every time.',
    history: [
      { date: '2026-09-25', location: bloodCenter('Cedar Grove') },
      { date: '2026-07-11', location: bloodCenter('Cedar Grove') },
    ],
  },
  {
    id: 'donor-106', slug: 'tomas-b', name: 'Tomas B.', bloodGroup: 'A-', city: 'Northbridge',
    availability: 'unavailable', donations: 9, lastDonation: null, joined: '2022-09-30',
    bio: 'Long-time donor currently on a planned break and expects to rejoin the directory next season.',
    history: [],
  },
  {
    id: 'donor-107', slug: 'priya-s', name: 'Priya S.', bloodGroup: 'B-', city: 'Ashford',
    availability: 'available', donations: 11, lastDonation: '2026-09-05', joined: '2024-01-19',
    bio: 'Donates on public holidays when clinics are quiet and encourages colleagues to book the same slot.',
    history: [
      { date: '2026-09-05', location: bloodCenter('Ashford') },
      { date: '2026-07-02', location: 'Ashford Mobile Blood Drive' },
    ],
  },
  {
    id: 'donor-108', slug: 'marcus-l', name: 'Marcus L.', bloodGroup: 'O-', city: 'Lakeview',
    availability: 'recently-donated', donations: 14, lastDonation: '2026-10-15', joined: '2023-04-27',
    bio: 'Universal-donor group who signed up after a family member needed surgery and hasn’t stopped since.',
    history: [
      { date: '2026-10-15', location: bloodCenter('Lakeview') },
      { date: '2026-08-21', location: bloodCenter('Lakeview') },
    ],
  },
  {
    id: 'donor-109', slug: 'hana-y', name: 'Hana Y.', bloodGroup: 'AB-', city: 'Westhaven',
    availability: 'available', donations: 8, lastDonation: '2026-08-14', joined: '2025-02-06',
    bio: 'Joined after learning how rare her blood group is and now donates roughly every eight weeks.',
    history: [
      { date: '2026-08-14', location: bloodCenter('Westhaven') },
      { date: '2026-06-05', location: bloodCenter('Westhaven') },
    ],
  },
  {
    id: 'donor-110', slug: 'omar-d', name: 'Omar D.', bloodGroup: 'B+', city: 'Cedar Grove',
    availability: 'unavailable', donations: 0, lastDonation: null, joined: '2025-06-21',
    bio: 'Newly registered donor completing first-donation onboarding.',
    history: [],
  },
  {
    id: 'donor-111', slug: 'grace-n', name: 'Grace N.', bloodGroup: 'O+', city: 'Ashford',
    availability: 'available', donations: 10, lastDonation: '2026-09-11', joined: '2024-08-15',
    bio: 'Retired nurse who donates on her old ward’s anniversary and answers newcomers’ questions at the clinic.',
    history: [
      { date: '2026-09-11', location: bloodCenter('Ashford') },
      { date: '2026-07-18', location: bloodCenter('Ashford') },
    ],
  },
  {
    id: 'donor-112', slug: 'elena-v', name: 'Elena V.', bloodGroup: 'A+', city: 'Northbridge',
    availability: 'recently-donated', donations: 13, lastDonation: '2026-10-08', joined: '2023-10-03',
    bio: 'Cyclist who plans donations between training seasons and tracks her rest days carefully.',
    history: [
      { date: '2026-10-08', location: bloodCenter('Northbridge') },
      { date: '2026-08-14', location: 'Northbridge Mobile Blood Drive' },
    ],
  },
];

export const donorCities = [...new Set(demoDonors.map(d => d.city))].sort();
export { bloodGroups };
export const findDonorBySlug = (slug: string) => demoDonors.find(d => d.slug === slug);

export interface DonorFilters { search: string; bloodGroup: string; city: string; availability: string; sort: string }
export const defaultDonorFilters: DonorFilters = { search: '', bloodGroup: 'all', city: 'all', availability: 'all', sort: 'name' };

export function filterDonors(donors: DirectoryDonor[], filters: DonorFilters): DirectoryDonor[] {
  const terms = filters.search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return donors.filter(d => {
    const searchable = `${d.name} ${d.bloodGroup} ${d.city}`.toLowerCase();
    return terms.every(term => searchable.includes(term)) &&
      (filters.bloodGroup === 'all' || d.bloodGroup === filters.bloodGroup) &&
      (filters.city === 'all' || d.city === filters.city) &&
      (filters.availability === 'all' || d.availability === filters.availability);
  }).sort((a, b) => {
    if (filters.sort === 'location') return a.city.localeCompare(b.city) || a.name.localeCompare(b.name);
    if (filters.sort === 'donations') return b.donations - a.donations || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
}

// Local asynchronous fixture loader; the error flag is used for previewing recovery.
export function loadDemoDonors(fail = false): Promise<DirectoryDonor[]> {
  return new Promise((resolve, reject) => setTimeout(() => fail ? reject(new Error('Unable to load sample donors.')) : resolve(demoDonors), 400));
}
