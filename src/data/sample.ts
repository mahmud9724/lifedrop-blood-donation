// Fictional sample data. Replace with API responses later — shapes mirror expected payloads.
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

export type Urgency = "critical" | "urgent" | "normal";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface BloodRequest {
  id: string;
  bloodGroup: BloodGroup;
  units: number;
  hospital: string;
  city: string;
  requiredDate: string; // ISO
  urgency: Urgency;
}

export interface Stat { id: string; label: string; value: number; suffix?: string }
export interface Article { id: string; image: string; category: string; title: string; excerpt: string; date: string }

export const demoStats: Stat[] = [
  { id: "donors", label: "Registered Donors", value: 12480 },
  { id: "fulfilled", label: "Blood Requests Fulfilled", value: 3215 },
  { id: "active", label: "Active Blood Requests", value: 86 },
  { id: "lives", label: "Lives Impacted", value: 9640 },
];

export const sampleRequests: BloodRequest[] = [
  { id: "req-1042", bloodGroup: "O-", units: 2, hospital: "Riverside General Hospital", city: "Northbridge", requiredDate: "2026-10-19", urgency: "critical" },
  { id: "req-1043", bloodGroup: "B+", units: 1, hospital: "St. Elara Medical Center", city: "Lakeview", requiredDate: "2026-10-21", urgency: "urgent" },
  { id: "req-1044", bloodGroup: "AB+", units: 3, hospital: "Greenfield Community Clinic", city: "Ashford", requiredDate: "2026-10-25", urgency: "normal" },
];

export const sampleArticles: Article[] = [
  { id: "a1", image: news1, category: "Community", title: "Organizing a blood drive in your neighborhood", excerpt: "A simple checklist for coordinating with local hospitals and volunteers to host a welcoming donation event.", date: "2026-10-12" },
  { id: "a2", image: news2, category: "Awareness", title: "Understanding blood groups and compatibility", excerpt: "An introduction to the ABO and Rh systems and why matching matters. Always follow your healthcare provider's guidance.", date: "2026-10-05" },
  { id: "a3", image: news3, category: "Donor Care", title: "Preparing for your first donation", excerpt: "What to expect on the day, from registration to rest. Your local blood center can answer specific eligibility questions.", date: "2026-09-28" },
];

export const urgencyLabel: Record<Urgency, string> = { critical: "Critical", urgent: "Urgent", normal: "Scheduled" };

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
