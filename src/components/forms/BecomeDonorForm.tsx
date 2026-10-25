import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { CheckCircle2, HeartPulse, Info, Loader2, RotateCcw, Stethoscope, TriangleAlert } from 'lucide-react';
import { RequestButton } from '@/components/requests/RequestControls';
import { buttonStyles } from '@/components/site/ui';
import { bloodGroups } from '@/data/blood-requests';
import { donorCities } from '@/data/donors';
import {
  UNKNOWN_GROUP, availabilityChoiceHints, availabilityChoiceLabels, contactMethodHints, contactMethodLabels, daysSince, donorFieldOrder, emptyDonorForm,
  hasErrors, localDateString, mockSubmit, validateDonor, type Availability, type ContactMethod, type DonorField, type DonorFormValues, type Errors,
} from '@/lib/form-validation';
import { formatDate } from '@/data/sample';
import { ChoiceGroup, DemoNotice, ErrorSummary, Field, FieldError, FormPage, Required, SummaryList, cardClass, controlClass, describedBy } from './FormKit';

const labels: Record<DonorField, string> = {
  fullName: 'Full name', bloodGroup: 'Blood group', city: 'City or district', location: 'General location', contactMethod: 'Contact preference',
  availability: 'Availability', lastDonation: 'Last donation date', consent: 'Privacy policy consent',
};
const id = (f: DonorField) => `bd-${f}`;

export function BecomeDonorForm() {
  const [values, setValues] = useState<DonorFormValues>(emptyDonorForm);
  const [errors, setErrors] = useState<Errors<DonorField>>({});
  const [touched, setTouched] = useState<Partial<Record<DonorField, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [reference, setReference] = useState('');
  const [done, setDone] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inFlight = useRef(false);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => { if (done) { headingRef.current?.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }, [done]);

  const revalidate = (next: DonorFormValues, field: DonorField) => {
    const e = validateDonor(next);
    setErrors(prev => { const copy = { ...prev }; if (e[field]) copy[field] = e[field]; else delete copy[field]; return copy; });
  };
  const set = <K extends DonorField>(field: K, value: DonorFormValues[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || errors[field]) revalidate(next, field);
  };
  const blur = (field: DonorField) => { setTouched(t => ({ ...t, [field]: true })); revalidate(values, field); };
  const text = (field: 'fullName' | 'city' | 'location' | 'lastDonation', hasHint = false) => ({
    id: id(field),
    value: values[field],
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy(id(field), hasHint, errors[field]),
    onChange: (ev: { target: { value: string } }) => set(field, ev.target.value),
    onBlur: () => blur(field),
  });

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (inFlight.current) return; // ignore repeated submits while the mock request is pending
    const e = validateDonor(values);
    setErrors(e);
    setTouched(Object.fromEntries(donorFieldOrder.map(f => [f, true])));
    if (hasErrors(e)) { requestAnimationFrame(() => summaryRef.current?.focus()); return; }
    inFlight.current = true;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await mockSubmit({ fail: simulateFailure });
      if (!mounted.current) return;
      setReference(res.reference);
      setDone(true);
    } catch {
      if (mounted.current) { setSubmitError(true); requestAnimationFrame(() => summaryRef.current?.focus()); }
    } finally {
      inFlight.current = false;
      if (mounted.current) setSubmitting(false);
    }
  };
  const reset = () => { setValues(emptyDonorForm); setErrors({}); setTouched({}); setSubmitError(false); setSimulateFailure(false); setReference(''); setDone(false); };

  const summaryErrors = donorFieldOrder.filter(f => errors[f]).map(f => ({ field: f, id: id(f), label: labels[f], message: errors[f] ?? '' }));
  const recent = values.lastDonation && !errors.lastDonation && daysSince(values.lastDonation) < 90;
  const confirmation = [
    { label: labels.fullName, value: values.fullName.trim() },
    { label: labels.bloodGroup, value: values.bloodGroup === UNKNOWN_GROUP ? 'Not sure yet' : values.bloodGroup },
    { label: 'Location', value: `${values.location.trim()}, ${values.city.trim()}` },
    { label: labels.contactMethod, value: contactMethodLabels[values.contactMethod as ContactMethod] ?? '' },
    { label: labels.availability, value: availabilityChoiceLabels[values.availability as Availability] ?? '' },
    { label: labels.lastDonation, value: values.lastDonation ? formatDate(values.lastDonation) : 'Not provided' },
  ];

  return (
    <FormPage crumb="Become a Donor" eyebrow="Join the community" icon={<HeartPulse className="h-4 w-4" aria-hidden />} title="Become a Donor"
      intro="Tell us a little about yourself so we can let you know when someone nearby needs your blood group. It only takes a minute.">
      <div className="mx-auto max-w-3xl">
        <div role="note" className="mb-6 flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning-soft p-4 text-sm sm:p-5">
          <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden />
          <p><strong className="font-semibold">Registering is not a medical eligibility check.</strong> Signing up with LifeDrop does not mean you are medically able to donate. Whether you can donate safely must be assessed by a qualified healthcare provider or your local blood center, who will ask about your health at the time.</p>
        </div>

        {!done && (
          <form noValidate onSubmit={e => { void submit(e); }} aria-label="Donor registration" className={cardClass}>
            <ErrorSummary ref={summaryRef} errors={summaryErrors} />
            {submitError && (
              <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-primary-soft p-4 text-sm">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
                <div><p className="font-semibold text-destructive">We couldn’t complete your registration</p><p className="mt-1">This was a simulated error. Your details are still here. Please try again.</p></div>
              </div>
            )}
            <p className="mb-6 text-sm text-muted-foreground"><span aria-hidden className="text-destructive">*</span> Required fields</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={id('fullName')} label="Full name" required error={errors.fullName} className="sm:col-span-2">
                <input {...text('fullName')} aria-required type="text" autoComplete="name" className={controlClass(errors.fullName)} />
              </Field>
              <Field id={id('bloodGroup')} label="Blood group" required hint="Don’t know it? Choose “Not sure yet”." error={errors.bloodGroup}>
                <select id={id('bloodGroup')} value={values.bloodGroup} aria-required aria-invalid={errors.bloodGroup ? true : undefined} aria-describedby={describedBy(id('bloodGroup'), true, errors.bloodGroup)}
                  onChange={e => set('bloodGroup', e.target.value)} onBlur={() => blur('bloodGroup')} className={controlClass(errors.bloodGroup)}>
                  <option value="">Select blood group</option>
                  {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  <option value={UNKNOWN_GROUP}>Not sure yet</option>
                </select>
              </Field>
              <Field id={id('city')} label="City or district" required error={errors.city}>
                <input {...text('city')} aria-required type="text" autoComplete="address-level2" list="bd-city-options" className={controlClass(errors.city)} />
                <datalist id="bd-city-options">{donorCities.map(c => <option key={c} value={c} />)}</datalist>
              </Field>
              <Field id={id('location')} label="General location" required hint="A neighbourhood or landmark is enough. Please don’t share a street address." error={errors.location} className="sm:col-span-2">
                <input {...text('location', true)} aria-required type="text" autoComplete="off" placeholder="e.g. Near the central market" className={controlClass(errors.location)} />
              </Field>
              <div className="sm:col-span-2">
                <ChoiceGroup id={id('contactMethod')} name="contactMethod" legend="Contact preference" required hint="How should people reach you? We don’t collect contact details in this demo."
                  options={(Object.keys(contactMethodLabels) as ContactMethod[]).map(m => ({ value: m, label: contactMethodLabels[m], hint: contactMethodHints[m] }))}
                  value={values.contactMethod} onChange={v => set('contactMethod', v)} error={errors.contactMethod} columns="four" />
              </div>
              <div className="sm:col-span-2">
                <ChoiceGroup id={id('availability')} name="availability" legend="Availability preference" required
                  options={(Object.keys(availabilityChoiceLabels) as Availability[]).map(a => ({ value: a, label: availabilityChoiceLabels[a], hint: availabilityChoiceHints[a] }))}
                  value={values.availability} onChange={v => set('availability', v)} error={errors.availability} columns="two" />
              </div>
              <Field id={id('lastDonation')} label="Last donation date" hint="Only if you know it. Leave blank otherwise." error={errors.lastDonation} className="sm:col-span-2 sm:max-w-xs">
                <input {...text('lastDonation', true)} type="date" max={localDateString()} className={controlClass(errors.lastDonation)} />
              </Field>
              {recent && (
                <p role="status" className="flex items-start gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground sm:col-span-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  You donated recently. How long to wait between donations depends on your country and your health, so please follow your blood center’s advice. We’ll note your date but won’t decide your eligibility.
                </p>
              )}
            </div>

            <div className="mt-8 border-t pt-6">
              <div className={`rounded-xl border p-4 ${errors.consent ? 'border-destructive bg-primary-soft/40' : 'bg-background'}`}>
                <label htmlFor={id('consent')} className="flex cursor-pointer items-start gap-3 text-sm">
                  <input id={id('consent')} type="checkbox" checked={values.consent} aria-required aria-invalid={errors.consent ? true : undefined} aria-describedby={describedBy(id('consent'), false, errors.consent)}
                    onChange={e => set('consent', e.target.checked)} onBlur={() => blur('consent')} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" />
                  <span>I have read and agree to the <Link to="/privacy" className="font-semibold text-primary underline underline-offset-2 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Privacy Policy</Link>, and I understand that registering does not confirm I am medically eligible to donate.<Required /></span>
                </label>
                <FieldError id={id('consent')} error={errors.consent} />
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-dashed p-3 text-sm">
                <input type="checkbox" checked={simulateFailure} onChange={e => setSimulateFailure(e.target.checked)} disabled={submitting} className="mt-0.5 h-4 w-4 accent-primary" />
                <span><span className="font-semibold">Demo: simulate a submission error</span><span className="block text-muted-foreground">Tick this to preview the error state.</span></span>
              </label>

              <p role="status" aria-live="polite" className="sr-only">{submitting ? 'Submitting your registration, please wait.' : ''}</p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <DemoNotice />
                <RequestButton type="submit" size="lg" disabled={submitting} aria-busy={submitting} className="shrink-0">
                  {submitting ? <><Loader2 className="animate-spin" aria-hidden />Registering…</> : submitError ? <><RotateCcw aria-hidden />Try again</> : 'Register as donor (demo)'}
                </RequestButton>
              </div>
            </div>
          </form>
        )}

        {done && (
          <section aria-labelledby="bd-success-title" className={`${cardClass} text-center`}>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success"><CheckCircle2 className="h-8 w-8" aria-hidden /></span>
            <h2 id="bd-success-title" ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-bold focus-visible:outline-none">Thank you for registering (demo)</h2>
            <p role="status" className="mx-auto mt-2 max-w-md text-muted-foreground">This was a simulation, so you haven’t been added to any donor list and nothing was saved. Remember: a healthcare provider decides whether you are suitable to donate.</p>
            <p className="mt-5 inline-block rounded-lg bg-muted px-3 py-1.5 font-mono text-sm">Demo reference: {reference}</p>
            <div className="mt-6 text-left"><SummaryList items={confirmation} /></div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/blood-requests" search={{}} className={buttonStyles({ size: 'lg' })}>See who needs blood</Link>
              <RequestButton variant="outline" size="lg" onClick={reset}><RotateCcw aria-hidden />Start over</RequestButton>
            </div>
          </section>
        )}
      </div>
    </FormPage>
  );
}
