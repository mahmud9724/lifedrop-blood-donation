import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { CheckCircle2, Droplet, Loader2, RotateCcw, ShieldCheck, TriangleAlert } from 'lucide-react';
import { RequestButton } from '@/components/requests/RequestControls';
import { buttonStyles } from '@/components/site/ui';
import { bloodGroups, requestCities } from '@/data/blood-requests';
import { urgencyLabel } from '@/data/sample';
import {
  MAX_DETAILS, MAX_UNITS, contactMethodHints, contactMethodLabels, emptyRequestForm, hasErrors, localDateString, mockSubmit,
  requestFieldOrder, urgencyChoices, validateRequest, type ContactMethod, type Errors, type RequestField, type RequestFormValues,
} from '@/lib/form-validation';
import { formatDate } from '@/data/sample';
import {
  ChoiceGroup, DemoNotice, ErrorSummary, Field, FormPage, StepIndicator, SummaryList, cardClass, controlClass, describedBy,
} from './FormKit';

type Stage = 'edit' | 'review' | 'success';
const labels: Record<RequestField, string> = {
  bloodGroup: 'Blood group', units: 'Units required', patient: 'Patient identifier', hospital: 'Hospital or facility', city: 'City or district',
  requiredDate: 'Required date', requiredTime: 'Required time', urgency: 'Urgency level', details: 'Additional details', contactMethod: 'Preferred contact method',
};
const id = (f: RequestField) => `rb-${f}`;

export function RequestBloodForm() {
  const [values, setValues] = useState<RequestFormValues>(emptyRequestForm);
  const [errors, setErrors] = useState<Errors<RequestField>>({});
  const [touched, setTouched] = useState<Partial<Record<RequestField, boolean>>>({});
  const [stage, setStage] = useState<Stage>('edit');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [reference, setReference] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inFlight = useRef(false);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  const set = <K extends RequestField>(field: K, value: RequestFormValues[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a field has been seen, re-validate live so errors clear as soon as they are fixed.
    if (touched[field] || errors[field]) {
      const e = validateRequest(next);
      setErrors(prev => { const copy = { ...prev }; if (e[field]) copy[field] = e[field]; else delete copy[field]; return copy; });
    }
  };
  const blur = (field: RequestField) => {
    setTouched(t => ({ ...t, [field]: true }));
    const e = validateRequest(values);
    setErrors(prev => { const copy = { ...prev }; if (e[field]) copy[field] = e[field]; else delete copy[field]; return copy; });
  };
  const props = (field: RequestField, hasHint = false) => ({
    id: id(field),
    value: values[field],
    'aria-invalid': errors[field] ? true : undefined,
    'aria-required': true as const,
    'aria-describedby': describedBy(id(field), hasHint, errors[field]),
    onChange: (ev: { target: { value: string } }) => set(field, ev.target.value),
    onBlur: () => blur(field),
  });

  const goReview = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validateRequest(values);
    setErrors(e);
    setTouched(Object.fromEntries(requestFieldOrder.map(f => [f, true])));
    if (hasErrors(e)) { requestAnimationFrame(() => summaryRef.current?.focus()); return; }
    setSubmitError(false);
    setStage('review');
  };

  useEffect(() => { if (stage !== 'edit') { headingRef.current?.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }, [stage]);

  const submit = async () => {
    if (inFlight.current) return; // blocks double-clicks and Enter-key repeats before state flushes
    const final = validateRequest(values);
    if (hasErrors(final)) { setErrors(final); setStage('edit'); return; }
    inFlight.current = true;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await mockSubmit({ fail: simulateFailure });
      if (!mounted.current) return;
      setReference(res.reference);
      setStage('success');
    } catch {
      if (mounted.current) setSubmitError(true);
    } finally {
      inFlight.current = false;
      if (mounted.current) setSubmitting(false);
    }
  };

  const reset = () => {
    setValues(emptyRequestForm); setErrors({}); setTouched({}); setSubmitError(false); setSimulateFailure(false); setReference(''); setStage('edit');
  };

  const summaryErrors = requestFieldOrder.filter(f => errors[f]).map(f => ({ field: f, id: id(f), label: labels[f], message: errors[f] ?? '' }));
  const today = localDateString();
  const review = [
    { label: labels.bloodGroup, value: values.bloodGroup },
    { label: labels.units, value: `${values.units.trim()} ${Number(values.units) === 1 ? 'unit' : 'units'}` },
    { label: labels.patient, value: values.patient.trim() },
    { label: labels.hospital, value: values.hospital.trim() },
    { label: labels.city, value: values.city.trim() },
    { label: 'Required by', value: values.requiredDate ? `${formatDate(values.requiredDate)} at ${values.requiredTime}` : '' },
    { label: labels.urgency, value: urgencyLabel[values.urgency as keyof typeof urgencyLabel] ?? '' },
    { label: labels.details, value: values.details.trim() },
    { label: labels.contactMethod, value: contactMethodLabels[values.contactMethod as ContactMethod] ?? '' },
  ];

  return (
    <FormPage crumb="Request Blood" eyebrow="Ask the community for help" icon={<Droplet className="h-4 w-4" aria-hidden />} title="Request Blood"
      intro="Tell us what is needed and when. We only ask for what donors and coordinators need to respond, and never for diagnoses or medical records.">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {stage !== 'success' && <StepIndicator steps={['Details', 'Review']} current={stage === 'edit' ? 0 : 1} />}

          {stage === 'edit' && (
            <form noValidate onSubmit={goReview} aria-label="Request blood details" className={cardClass}>
              <ErrorSummary ref={summaryRef} errors={summaryErrors} />
              <p className="mb-6 text-sm text-muted-foreground"><span aria-hidden className="text-destructive">*</span> Required fields</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id={id('bloodGroup')} label="Blood group" required error={errors.bloodGroup}>
                  <select {...props('bloodGroup')} className={controlClass(errors.bloodGroup)}>
                    <option value="">Select blood group</option>
                    {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </Field>
                <Field id={id('units')} label="Units required" required hint={`Between 1 and ${MAX_UNITS}.`} error={errors.units}>
                  <input {...props('units', true)} type="text" inputMode="numeric" autoComplete="off" placeholder="e.g. 2" className={controlClass(errors.units)} />
                </Field>
                <Field id={id('patient')} label="Patient name or identifier" required hint="Initials or a reference are enough. Avoid full names and contact details." error={errors.patient} className="sm:col-span-2">
                  <input {...props('patient', true)} type="text" autoComplete="off" maxLength={60} placeholder="e.g. A.K. or Ref 21" className={controlClass(errors.patient)} />
                </Field>
                <Field id={id('hospital')} label="Hospital or medical facility" required error={errors.hospital} className="sm:col-span-2">
                  <input {...props('hospital')} type="text" autoComplete="off" placeholder="e.g. Riverside General Hospital" className={controlClass(errors.hospital)} />
                </Field>
                <Field id={id('city')} label="City or district" required error={errors.city} className="sm:col-span-2">
                  <input {...props('city')} type="text" autoComplete="off" list="rb-city-options" placeholder="e.g. Northbridge" className={controlClass(errors.city)} />
                  <datalist id="rb-city-options">{requestCities.map(c => <option key={c} value={c} />)}</datalist>
                </Field>
                <Field id={id('requiredDate')} label="Required date" required error={errors.requiredDate}>
                  <input {...props('requiredDate')} type="date" min={today} className={controlClass(errors.requiredDate)} />
                </Field>
                <Field id={id('requiredTime')} label="Required time" required hint="Local time at the hospital." error={errors.requiredTime}>
                  <input {...props('requiredTime', true)} type="time" className={controlClass(errors.requiredTime)} />
                </Field>
                <div className="sm:col-span-2">
                  <ChoiceGroup id={id('urgency')} name="urgency" legend="Urgency level" required options={urgencyChoices.map(u => ({ value: u.value, label: u.label, hint: u.hint }))}
                    value={values.urgency} onChange={v => { set('urgency', v); setTouched(t => ({ ...t, urgency: true })); }} error={errors.urgency} columns="three" />
                </div>
                <Field id={id('details')} label="Additional details" hint={`Helpful logistics only, such as ward or who to ask for. Please avoid diagnoses or personal contact details. ${values.details.length}/${MAX_DETAILS}`} error={errors.details} className="sm:col-span-2">
                  <textarea {...props('details', true)} aria-required={undefined} rows={4} className={`${controlClass(errors.details)} h-auto min-h-28 py-3`} />
                </Field>
                <div className="sm:col-span-2">
                  <ChoiceGroup id={id('contactMethod')} name="contactMethod" legend="Preferred contact method" required hint="We don’t collect your contact details in this demo."
                    options={(Object.keys(contactMethodLabels) as ContactMethod[]).map(m => ({ value: m, label: contactMethodLabels[m], hint: contactMethodHints[m] }))}
                    value={values.contactMethod} onChange={v => { set('contactMethod', v); setTouched(t => ({ ...t, contactMethod: true })); }} error={errors.contactMethod} columns="four" />
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                <DemoNotice />
                <RequestButton type="submit" size="lg" className="shrink-0">Review request</RequestButton>
              </div>
            </form>
          )}

          {stage === 'review' && (
            <section aria-labelledby="rb-review-title" className={cardClass}>
              <h2 id="rb-review-title" ref={headingRef} tabIndex={-1} className="text-2xl font-bold focus-visible:outline-none">Review your request</h2>
              <p className="mt-2 text-sm text-muted-foreground">Check the details below. Nothing has been submitted yet.</p>
              <div className="mt-6"><SummaryList items={review} /></div>
              {submitError && (
                <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-primary-soft p-4 text-sm">
                  <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
                  <div><p className="font-semibold text-destructive">We couldn’t submit your request</p><p className="mt-1">This was a simulated error. Your details are still here. Please try again.</p></div>
                </div>
              )}
              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-dashed p-3 text-sm">
                <input type="checkbox" checked={simulateFailure} onChange={e => setSimulateFailure(e.target.checked)} disabled={submitting} className="mt-0.5 h-4 w-4 accent-primary" />
                <span><span className="font-semibold">Demo: simulate a submission error</span><span className="block text-muted-foreground">Tick this to preview the error state.</span></span>
              </label>
              <p role="status" aria-live="polite" className="sr-only">{submitting ? 'Submitting your request, please wait.' : ''}</p>
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <RequestButton variant="outline" size="lg" onClick={() => setStage('edit')} disabled={submitting}>Edit details</RequestButton>
                <RequestButton size="lg" onClick={() => { void submit(); }} disabled={submitting} aria-busy={submitting}>
                  {submitting ? <><Loader2 className="animate-spin" aria-hidden />Submitting…</> : submitError ? <><RotateCcw aria-hidden />Try again</> : 'Submit request (demo)'}
                </RequestButton>
              </div>
              <div className="mt-6"><DemoNotice /></div>
            </section>
          )}

          {stage === 'success' && (
            <section aria-labelledby="rb-success-title" className={`${cardClass} text-center`}>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success"><CheckCircle2 className="h-8 w-8" aria-hidden /></span>
              <h2 id="rb-success-title" ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-bold focus-visible:outline-none">Request submitted (demo)</h2>
              <p role="status" className="mx-auto mt-2 max-w-md text-muted-foreground">This was a simulation, so no request was posted and nobody has been notified. In the live product, nearby donors would be alerted.</p>
              <p className="mt-5 inline-block rounded-lg bg-muted px-3 py-1.5 font-mono text-sm">Demo reference: {reference}</p>
              <div className="mt-6 text-left"><SummaryList items={review} /></div>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/blood-requests" search={{}} className={buttonStyles({ size: 'lg' })}>Browse blood requests</Link>
                <RequestButton variant="outline" size="lg" onClick={reset}><RotateCcw aria-hidden />Start another request</RequestButton>
              </div>
            </section>
          )}
        </div>

        <aside aria-label="Before you submit" className="h-fit rounded-2xl border bg-card p-5 shadow-card lg:sticky lg:top-24">
          <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5 text-primary" aria-hidden />Privacy first</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Use initials or a reference instead of a full patient name.</li>
            <li>Never include diagnoses, test results or ID numbers.</li>
            <li>Always confirm donation arrangements with the hospital’s blood bank.</li>
            <li>In an emergency, contact your local emergency number or the hospital directly first.</li>
          </ul>
        </aside>
      </div>
    </FormPage>
  );
}

