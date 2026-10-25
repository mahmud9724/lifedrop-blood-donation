import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BecomeDonorForm } from '@/components/forms/BecomeDonorForm';
import { RequestBloodForm } from '@/components/forms/RequestBloodForm';
import { localDateString, emptyDonorForm, emptyRequestForm, validateDonor, validateRequest, type DonorFormValues, type RequestFormValues } from '@/lib/form-validation';

const now = new Date(2026, 9, 25, 12, 0, 0); // 25 Oct 2026, 12:00 local
const validRequest: RequestFormValues = {
  bloodGroup: 'O-', units: '2', patient: 'A.K.', hospital: 'Riverside General Hospital', city: 'Northbridge',
  requiredDate: '2026-10-26', requiredTime: '09:30', urgency: 'urgent', details: 'Ask for the blood bank desk.', contactMethod: 'phone',
};
const validDonor: DonorFormValues = {
  fullName: 'Amara Hossain', bloodGroup: 'A+', city: 'Lakeview', location: 'Near the central market', contactMethod: 'email',
  availability: 'weekends', lastDonation: '', consent: true,
};

describe('validateRequest', () => {
  it('accepts a complete request', () => expect(validateRequest(validRequest, now)).toEqual({}));
  it('requires every mandatory field', () => {
    expect(Object.keys(validateRequest(emptyRequestForm, now)).sort()).toEqual(
      ['bloodGroup', 'contactMethod', 'city', 'hospital', 'patient', 'requiredDate', 'requiredTime', 'units', 'urgency'].sort(),
    );
  });
  it('validates unit counts', () => {
    expect(validateRequest({ ...validRequest, units: '0' }, now).units).toBeTruthy();
    expect(validateRequest({ ...validRequest, units: '11' }, now).units).toBeTruthy();
    expect(validateRequest({ ...validRequest, units: '1.5' }, now).units).toBeTruthy();
    expect(validateRequest({ ...validRequest, units: '10' }, now).units).toBeUndefined();
  });
  it('rejects past dates and past times today', () => {
    expect(validateRequest({ ...validRequest, requiredDate: '2026-10-24' }, now).requiredDate).toBeTruthy();
    expect(validateRequest({ ...validRequest, requiredDate: '2026-10-25', requiredTime: '08:00' }, now).requiredTime).toBeTruthy();
    expect(validateRequest({ ...validRequest, requiredDate: '2026-10-25', requiredTime: '18:00' }, now)).toEqual({});
  });
  it('keeps contact details out of identifier and notes fields', () => {
    expect(validateRequest({ ...validRequest, patient: 'a@b.com' }, now).patient).toBeTruthy();
    expect(validateRequest({ ...validRequest, details: 'Call 01712345678' }, now).details).toBeTruthy();
    expect(validateRequest({ ...validRequest, details: 'x'.repeat(301) }, now).details).toBeTruthy();
  });
});

describe('validateDonor', () => {
  it('accepts a complete registration, with or without a last donation date', () => {
    expect(validateDonor(validDonor, now)).toEqual({});
    expect(validateDonor({ ...validDonor, lastDonation: '2026-08-01', bloodGroup: 'unknown' }, now)).toEqual({});
  });
  it('requires consent and core fields', () => {
    expect(Object.keys(validateDonor(emptyDonorForm, now)).sort()).toEqual(
      ['availability', 'bloodGroup', 'city', 'consent', 'contactMethod', 'fullName', 'location'].sort(),
    );
  });
  it('rejects future donation dates, odd names and street-address style locations', () => {
    expect(validateDonor({ ...validDonor, lastDonation: '2026-11-01' }, now).lastDonation).toBeTruthy();
    expect(validateDonor({ ...validDonor, fullName: 'R2D2 !!' }, now).fullName).toBeTruthy();
    expect(validateDonor({ ...validDonor, location: '12345 Main Street' }, now).location).toBeTruthy();
  });
});

function renderInRouter(ui: ReactNode) {
  const root = createRootRoute();
  const index = createRoute({ getParentRoute: () => root, path: '/', component: () => <>{ui}</> });
  const router = createRouter({ routeTree: root.addChildren([index]), history: createMemoryHistory({ initialEntries: ['/'] }) });
  return render(<RouterProvider router={router} />);
}

afterEach(() => vi.useRealTimers());

const type = (label: RegExp, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const click = (el: HTMLElement) => fireEvent.click(el);

describe('Become a Donor form', () => {
  it('shows the eligibility disclaimer and accessible errors, and does not submit when invalid', async () => {
        renderInRouter(<BecomeDonorForm />);
    expect(await screen.findByText(/does not mean you are medically able to donate/i)).toBeInTheDocument();
    click(screen.getByRole('button', { name: /register as donor/i }));
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText(/problems/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByText(/thank you for registering/i)).not.toBeInTheDocument();
  });

  it('blocks repeat submissions and then shows the demo confirmation', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    renderInRouter(<BecomeDonorForm />);
    await screen.findByLabelText(/full name/i);
    type(/full name/i, 'Amara Hossain');
    type(/blood group/i, 'A+');
    type(/city or district/i, 'Lakeview');
    type(/general location/i, 'Near the market');
    click(screen.getByRole('radio', { name: /^Email/ }));
    click(screen.getByRole('radio', { name: /^Weekends/ }));
    click(screen.getByRole('checkbox', { name: /privacy policy/i }));
    const submit = screen.getByRole('button', { name: /register as donor/i });
    click(submit);
    expect(screen.getByRole('button', { name: /registering/i })).toBeDisabled();
    click(screen.getByRole('button', { name: /registering/i }));
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    await waitFor(() => expect(screen.getByRole('heading', { name: /thank you for registering \(demo\)/i })).toBeInTheDocument());
    expect(screen.getByText(/nothing was saved/i)).toBeInTheDocument();
  });
});

describe('Request Blood form', () => {
  it('requires fields, then goes to a review step and shows the demo confirmation', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    renderInRouter(<RequestBloodForm />);
    click(await screen.findByRole('button', { name: /review request/i }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByLabelText(/units required/i)).toHaveAttribute('aria-invalid', 'true');

    type(/blood group/i, 'O-');
    type(/units required/i, '2');
    type(/patient name or identifier/i, 'A.K.');
    type(/hospital or medical facility/i, 'Riverside General Hospital');
    type(/city or district/i, 'Northbridge');
    type(/required date/i, localDateString(new Date(Date.now() + 3 * 86_400_000)));
    type(/required time/i, '09:30');
    click(screen.getByRole('radio', { name: /^Urgent/ }));
    click(screen.getByRole('radio', { name: /^Phone call/ }));
    click(screen.getByRole('button', { name: /review request/i }));

    expect(await screen.findByRole('heading', { name: /review your request/i })).toBeInTheDocument();
    expect(screen.getByText('Riverside General Hospital')).toBeInTheDocument();
    click(screen.getByRole('button', { name: /submit request/i }));
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(await screen.findByRole('heading', { name: /request submitted \(demo\)/i })).toBeInTheDocument();
  });
});
