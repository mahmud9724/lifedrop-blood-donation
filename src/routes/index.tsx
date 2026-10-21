import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplet, Activity, Search, HeartHandshake, HeartPulse, Users, ShieldCheck, Flag, Stethoscope, Check, ArrowRight, Info } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { buttonStyles, SectionHeading, DropIcon } from "@/components/site/ui";
import { NewsCard, RequestCard, StatCard } from "@/components/site/Cards";
import { TopDonors } from "@/components/site/TopDonors";
import { Reveal } from "@/components/site/Reveal";
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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full bg-primary-soft blur-3xl" />
          <div className="absolute -left-56 top-72 h-[26rem] w-[26rem] rounded-full bg-primary-soft/70 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>
        <div className="container-page relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-card backdrop-blur">
                <DropIcon className="h-4 w-4 text-primary" /> Connecting communities through blood donation
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                Every Drop Can <span className="text-primary">Save a Life</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
                LifeDrop brings together willing blood donors and people who urgently need blood — so finding help nearby takes minutes, not hours.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/request-blood" className={buttonStyles({ size: "lg", className: "shadow-lift transition-transform duration-300 hover:-translate-y-0.5" })}><Droplet className="h-5 w-5" aria-hidden /> Request Blood</Link>
                <Link to="/donate" className={buttonStyles({ variant: "outline", size: "lg", className: "transition-transform duration-300 hover:-translate-y-0.5" })}>Become a Donor</Link>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-10 border-t pt-6">
                <p className="text-sm font-medium text-muted-foreground">Find donors for every blood group</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Blood groups">
                  {bloodGroups.map((g) => (
                    <li key={g} className="flex h-9 min-w-11 items-center justify-center rounded-lg border bg-background px-2 text-sm font-semibold text-secondary shadow-card transition-colors duration-300 hover:border-primary hover:text-primary">{g}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary-soft via-transparent to-primary-soft/60 blur-xl" />
              <img src={hero} alt="A smiling donor giving blood while a nurse adjusts the cuff" width={1200} height={1200} className="relative aspect-[4/3] w-full rounded-3xl border object-cover shadow-lift lg:aspect-[4/5]" />
              <div className="absolute -bottom-5 left-4 right-4 flex sm:right-auto sm:left-6 items-center gap-3 rounded-2xl border bg-card p-4 shadow-lift">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary"><HeartPulse className="h-5 w-5" aria-hidden /></span>
                <div><p className="text-sm font-semibold">One donation</p><p className="text-xs text-muted-foreground">can help more than one patient</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page pb-16 pt-20" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Platform statistics</h2>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {demoStats.map((s, i) => <Reveal key={s.id} delay={i * 90} className="h-full"><StatCard stat={s} icon={[Users, HeartHandshake, Activity, HeartPulse][i]} /></Reveal>)}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><Info className="h-3.5 w-3.5" aria-hidden /> Demo figures for preview only — not real platform data.</p>
      </section>

      {/* How it works */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="How it works" title="Three simple steps" description="Getting or giving help shouldn't be complicated." align="center" /></Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border bg-card p-8 shadow-card transition-[box-shadow,border-color] duration-300 hover:border-primary/30 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary"><s.icon className="h-6 w-6" aria-hidden /></span>
                    <span aria-hidden className="text-4xl font-extrabold text-muted-foreground/25">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Urgent requests */}
      <section className="container-page py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><SectionHeading eyebrow="Urgent requests" title="People who need help now" description="Sample requests shown for preview purposes." /></Reveal>
          <Reveal delay={100}><Link to="/blood-requests" search={{}} className={buttonStyles({ variant: "outline" })}>View All Requests <ArrowRight className="h-4 w-4" aria-hidden /></Link></Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleRequests.map((r, i) => <Reveal key={r.id} delay={i * 120} className="h-full"><RequestCard request={r} /></Reveal>)}
        </div>
      </section>

      {/* Top donors */}
      <TopDonors />

      {/* Become a donor */}
      <section className="container-page pb-20">
        <Reveal>
          <div className="grid gap-10 overflow-hidden rounded-3xl bg-secondary p-6 text-secondary-foreground shadow-lift sm:p-8 md:p-14 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Become a donor. Be someone's reason for tomorrow.</h2>
              <p className="mt-4 text-lg text-secondary-foreground/90">Join a community of people ready to help when it matters most. You decide when you're available.</p>
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
        </Reveal>
      </section>

      {/* News */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal><SectionHeading eyebrow="News & awareness" title="Learn, share, and get involved" /></Reveal>
            <Reveal delay={100}><Link to="/news" className={buttonStyles({ variant: "outline" })}>All Articles <ArrowRight className="h-4 w-4" aria-hidden /></Link></Reveal>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleArticles.map((a, i) => <Reveal key={a.id} delay={i * 120} className="h-full"><NewsCard article={a} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container-page py-20">
        <Reveal><SectionHeading eyebrow="Trust & safety" title="Built with care for everyone involved" align="center" /></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-card transition-[box-shadow,border-color] duration-300 hover:border-primary/30 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary"><t.icon className="h-6 w-6" aria-hidden /></span>
                <h3 className="mt-5 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
