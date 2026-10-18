import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, HeartHandshake, HeartPulse, Users, ShieldCheck, Flag, Stethoscope, Check, ArrowRight, Info } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { buttonStyles, SectionHeading, DropIcon } from "@/components/site/ui";
import { NewsCard, RequestCard, StatCard } from "@/components/site/Cards";
import { demoStats, sampleArticles, sampleRequests } from "@/data/sample";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeDrop — Every Drop Can Save a Life" },
      { name: "description", content: "LifeDrop connects blood donors with people who urgently need blood in their community." },
      { property: "og:title", content: "LifeDrop — Every Drop Can Save a Life" },
      { property: "og:description", content: "A community-driven platform connecting blood donors with people in need." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Search, title: "Find a Donor", text: "Search the community by blood group and city to see who may be able to help." },
  { icon: HeartHandshake, title: "Request or Donate Blood", text: "Post a request with hospital details, or respond to someone who needs your blood group." },
  { icon: HeartPulse, title: "Help Save a Life", text: "Coordinate with the hospital and donate safely at an official blood center." },
];

const trust = [
  { icon: Users, title: "Community-driven donations", text: "LifeDrop is powered by everyday people choosing to help their neighbors." },
  { icon: ShieldCheck, title: "Privacy-conscious discovery", text: "Donor contact details stay private until the donor chooses to respond." },
  { icon: Flag, title: "Report suspicious requests", text: "Anyone can flag a request that looks wrong so our team can review it." },
  { icon: Stethoscope, title: "Responsible donation", text: "We encourage donating only at licensed centers and following medical advice." },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
              <DropIcon className="h-4 w-4 text-primary" /> Connecting communities through blood donation
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Every Drop Can <span className="text-primary">Save a Life</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              LifeDrop brings together willing blood donors and people who urgently need blood — so finding help nearby takes minutes, not hours.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/request-blood" className={buttonStyles({ size: "lg" })}>Request Blood</Link>
              <Link to="/donate" className={buttonStyles({ variant: "outline", size: "lg" })}>Become a Donor</Link>
            </div>
          </div>
          <div className="relative">
            <img src={hero} alt="A smiling donor giving blood while a nurse adjusts the cuff" width={1200} height={1200} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift lg:aspect-square" />
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-lift">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary"><HeartPulse className="h-5 w-5" /></span>
              <div><p className="text-sm font-semibold">One donation</p><p className="text-xs text-muted-foreground">can help more than one patient</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page py-16" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Platform statistics</h2>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {demoStats.map((s) => <StatCard key={s.id} stat={s} />)}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><Info className="h-3.5 w-3.5" aria-hidden /> Demo figures for preview only — not real platform data.</p>
      </section>

      {/* How it works */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <SectionHeading eyebrow="How it works" title="Three simple steps" description="Getting or giving help shouldn't be complicated." align="center" />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border bg-card p-8 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary"><s.icon className="h-6 w-6" aria-hidden /></span>
                  <span className="text-4xl font-extrabold text-border">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Urgent requests */}
      <section className="container-page py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Urgent requests" title="People who need help now" description="Sample requests shown for preview purposes." />
          <Link to="/requests" className={buttonStyles({ variant: "outline" })}>View All Requests <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleRequests.map((r) => <RequestCard key={r.id} request={r} />)}
        </div>
      </section>

      {/* Become a donor */}
      <section className="container-page pb-20">
        <div className="grid gap-10 overflow-hidden rounded-3xl bg-secondary p-8 text-secondary-foreground md:p-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Become a donor. Be someone's reason for tomorrow.</h2>
            <p className="mt-4 text-lg opacity-85">Join a community of people ready to help when it matters most. You decide when you're available.</p>
            <Link to="/donate" className={buttonStyles({ variant: "inverse", size: "lg", className: "mt-8" })}>Register as Donor</Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {["Get alerts for your blood group nearby", "Control your availability anytime", "Your contact stays private by default", "Track your donation history"].map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-2xl bg-background/10 p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden /><span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* News */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="News & awareness" title="Learn, share, and get involved" />
            <Link to="/news" className={buttonStyles({ variant: "outline" })}>All Articles <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleArticles.map((a) => <NewsCard key={a.id} article={a} />)}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container-page py-20">
        <SectionHeading eyebrow="Trust & safety" title="Built with care for everyone involved" align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="rounded-2xl border p-6">
              <t.icon className="h-7 w-7 text-primary" aria-hidden />
              <h3 className="mt-4 font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
