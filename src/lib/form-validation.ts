import { bloodGroups } from '@/data/blood-requests';
import type { BloodGroup, Urgency } from '@/data/sample';

// Pure, framework-free validation for the two demo forms. Nothing here stores or sends data.

export type ContactMethod = 'phone' | 'sms' | 'email' | 'in-app';
export const contactMethodLabels: Record<ContactMethod, string> = {
  phone: 'Phone call',
  sms: 'Text message',
  email: 'Email',
  'in-app': 'LifeDrop message',
};
export const contactMethodHints: Record<ContactMethod, string> = {
  phone: 'A coordinator or donor calls you.',
  sms: 'Short updates by text.',
  email: 'Details by email.',
  'in-app': 'Stay inside LifeDrop.',
};

export type Availability = 'anytime' | 'weekdays' | 'weekends' | 'emergencies';
export const availabilityChoiceLabels: Record<Availability, string> = {
  anytime: 'Anytime',
  weekdays: 'Weekdays',
  weekends: 'Weekends',
  emergencies: 'Emergencies only',
};
export const availabilityChoiceHints: Record<Availability, string> = {
  anytime: 'Happy to be contacted whenever a request matches.',
  weekdays: 'Monday to Friday.',
  weekends: 'Saturday and Sunday.',
  emergencies: 'Only for critical, time-sensitive requests.',
};

export const urgencyChoices: { value: Urgency; label: string; hint: string }[] = [
  { value: 'critical', label: 'Critical', hint: 'Emergency, needed within hours' },
  { value: 'urgent', label: 'Urgent', hint: 'Needed within a day or two' },
  { value: 'normal', label: 'Scheduled', hint: 'Planned, with time to arrange' },
];

export const MAX_UNITS = 10;
export const MAX_DETAILS = 300;

export type Errors<K extends string> = Partial<Record<K, string>>;

const looksLikeContact = (value: string) => /@/.test(value) || (value.match(/\d/g)?.length ?? 0) >= 7;
const isIsoDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`));

/** Today's date as YYYY-MM-DD in the viewer's local time zone. */
export const localDateString = (now: Date = new Date()) =>
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

// ---------- Request Blood ----------
export interface RequestFormValues {
  bloodGroup: string;
  units: string;
  patient: string;
  hospital: string;
  city: string;
  requiredDate: string;
  requiredTime: string;
  urgency: string;
  details: string;
  contactMethod: string;
}
export type RequestField = keyof RequestFormValues;
export const emptyRequestForm: RequestFormValues = {
  bloodGroup: '',
  units: '',
  patient: '',
  hospital: '',
  city: '',
  requiredDate: '',
  requiredTime: '',
  urgency: '',
  details: '',
  contactMethod: '',
};
export const requestFieldOrder: RequestField[] = [
  'bloodGroup', 'units', 'patient', 'hospital', 'city', 'requiredDate', 'requiredTime', 'urgency', 'details', 'contactMethod',
];

export function validateRequest(v: RequestFormValues, now: Date = new Date()): Errors<RequestField> {
  const e: Errors<RequestField> = {};
  if (!bloodGroups.includes(v.bloodGroup as BloodGroup)) e.bloodGroup = 'Choose the blood group that is needed.';

  const units = v.units.trim();
  if (!units) e.units = 'Enter how many units are required.';
  else if (!/^\d+$/.test(units)) e.units = 'Use a whole number, for example 2.';
  else if (Number(units) < 1 || Number(units) > MAX_UNITS) e.units = `Enter between 1 and ${MAX_UNITS} units. For larger needs, contact the hospital blood bank directly.`;

  const patient = v.patient.trim();
  if (!patient) e.patient = 'Enter a patient initial or reference, such as “A.K.” or “Ref 21”.';
  else if (patient.length < 2) e.patient = 'Use at least 2 characters.';
  else if (patient.length > 40) e.patient = 'Keep this under 40 characters.';
  else if (looksLikeContact(patient)) e.patient = 'Please don’t enter phone numbers or email addresses here. Initials or a reference are enough.';

  const hospital = v.hospital.trim();
  if (!hospital) e.hospital = 'Enter the hospital or medical facility.';
  else if (hospital.length < 3) e.hospital = 'Use at least 3 characters.';
  else if (hospital.length > 100) e.hospital = 'Keep this under 100 characters.';

  const city = v.city.trim();
  if (!city) e.city = 'Enter the city or district.';
  else if (city.length < 2) e.city = 'Use at least 2 characters.';
  else if (city.length > 60) e.city = 'Keep this under 60 characters.';

  const today = localDateString(now);
  if (!v.requiredDate) e.requiredDate = 'Choose the date blood is needed.';
  else if (!isIsoDate(v.requiredDate)) e.requiredDate = 'Enter a valid date.';
  else if (v.requiredDate < today) e.requiredDate = 'The required date can’t be in the past.';
  else if (v.requiredDate > localDateString(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()))) e.requiredDate = 'Choose a date within the next year.';

  if (!v.requiredTime) e.requiredTime = 'Choose the time blood is needed.';
  else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(v.requiredTime)) e.requiredTime = 'Enter a valid time.';
  else if (!e.requiredDate && v.requiredDate === today) {
    const [h, m] = v.requiredTime.split(':').map(Number);
    if ((h ?? 0) * 60 + (m ?? 0) < now.getHours() * 60 + now.getMinutes()) e.requiredTime = 'That time has already passed today.';
  }

  if (!urgencyChoices.some(u => u.value === v.urgency)) e.urgency = 'Select how urgent this request is.';

  const details = v.details.trim();
  if (details.length > MAX_DETAILS) e.details = `Keep this under ${MAX_DETAILS} characters (currently ${details.length}).`;
  else if (looksLikeContact(details)) e.details = 'Please remove phone numbers and email addresses. Contact is arranged through your preferred method.';

  if (!(v.contactMethod in contactMethodLabels)) e.contactMethod = 'Choose how you would like to be contacted.';
  return e;
}

// ---------- Become a Donor ----------
export interface DonorFormValues {
  fullName: string;
  bloodGroup: string;
  city: string;
  location: string;
  contactMethod: string;
  availability: string;
  lastDonation: string;
  consent: boolean;
}
export type DonorField = keyof DonorFormValues;
export const emptyDonorForm: DonorFormValues = {
  fullName: '', bloodGroup: '', city: '', location: '', contactMethod: '', availability: '', lastDonation: '', consent: false,
};
export const donorFieldOrder: DonorField[] = [
  'fullName', 'bloodGroup', 'city', 'location', 'contactMethod', 'availability', 'lastDonation', 'consent',
];
export const UNKNOWN_GROUP = 'unknown';

export function validateDonor(v: DonorFormValues, now: Date = new Date()): Errors<DonorField> {
  const e: Errors<DonorField> = {};
  const name = v.fullName.trim();
  if (!name) e.fullName = 'Enter your full name.';
  else if (name.length < 2) e.fullName = 'Use at least 2 characters.';
  else if (name.length > 80) e.fullName = 'Keep your name under 80 characters.';
  else if (!/^[\p{L}][\p{L}\p{M}\s.'’-]*$/u.test(name)) e.fullName = 'Use letters, spaces, hyphens and apostrophes only.';

  if (!bloodGroups.includes(v.bloodGroup as BloodGroup) && v.bloodGroup !== UNKNOWN_GROUP) e.bloodGroup = 'Choose your blood group, or “Not sure yet”.';

  const city = v.city.trim();
  if (!city) e.city = 'Enter your city or district.';
  else if (city.length < 2) e.city = 'Use at least 2 characters.';
  else if (city.length > 60) e.city = 'Keep this under 60 characters.';

  const location = v.location.trim();
  if (!location) e.location = 'Enter a general area, such as a neighbourhood or landmark.';
  else if (location.length < 2) e.location = 'Use at least 2 characters.';
  else if (location.length > 80) e.location = 'Keep this under 80 characters.';
  else if (looksLikeContact(location) || /\d{3,}/.test(location)) e.location = 'Please share a general area only, not a street address, phone number or email.';

  if (!(v.contactMethod in contactMethodLabels)) e.contactMethod = 'Choose how you would like to be contacted.';
  if (!(v.availability in availabilityChoiceLabels)) e.availability = 'Choose when you are generally available.';

  if (v.lastDonation) {
    if (!isIsoDate(v.lastDonation)) e.lastDonation = 'Enter a valid date, or leave this blank if unknown.';
    else if (v.lastDonation > localDateString(now)) e.lastDonation = 'The last donation date can’t be in the future.';
    else if (v.lastDonation < localDateString(new Date(now.getFullYear() - 70, now.getMonth(), now.getDate()))) e.lastDonation = 'Please check this date, or leave it blank if unknown.';
  }

  if (!v.consent) e.consent = 'You need to agree to the privacy policy to register.';
  return e;
}

/** Calendar days since a YYYY-MM-DD donation date, used only for a gentle, non-medical note. */
export function daysSince(date: string, now: Date = new Date()) {
  return Math.floor((Date.parse(`${localDateString(now)}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / 86_400_000);
}

export const hasErrors = (e: object) => Object.keys(e).length > 0;

/** Simulated network call. Resolves or rejects after a delay; never sends or stores anything. */
export function mockSubmit(options: { fail?: boolean; delayMs?: number } = {}): Promise<{ reference: string }> {
  const { fail = false, delayMs = 1400 } = options;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error('Simulated failure'));
      else resolve({ reference: `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}` });
    }, delayMs);
  });
}
