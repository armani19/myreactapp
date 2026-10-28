import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import Internships from './Internships';

const originalFetch = global.fetch;

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
});

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      total: { lastYear: 3 },
      contributions: [
        { date: '2026-10-25', count: 2, level: 2 },
        { date: '2026-10-26', count: 0, level: 0 },
        { date: '2026-10-27', count: 1, level: 1 },
      ],
    }),
  });
});

afterEach(() => { global.fetch = originalFetch; });

test('internship section presents the supplied availability, setup, and all six interests', async () => {
  render(<Internships />);
  const section = screen.getByRole('region', { name: 'Open for Internships' });
  expect(section).toHaveAttribute('id', 'internships');
  expect(within(section).getByText('Dec 2026 – Jul 2027')).toBeVisible();
  expect(within(section).getByText('Academic OJT')).toBeVisible();
  expect(within(section).getByText('Onsite / Hybrid')).toBeVisible();
  expect(within(section).getAllByRole('listitem')).toHaveLength(6);
  expect(within(section).getByRole('button', { name: 'View CV' })).toHaveAttribute('aria-haspopup', 'dialog');
  expect(within(section).getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', expect.stringContaining('/assets/cv/ArmaniMagnificoCV.pdf'));
  expect(within(section).getByRole('link', { name: 'Download PDF' })).toHaveAttribute('download', 'ArmaniMagnificoCV.pdf');
  expect(within(section).getByRole('link', { name: 'Email Me' })).toHaveAttribute('href', expect.stringContaining('armanimagnifico4195@gmail.com'));
  await within(section).findByRole('img', { name: '3 public GitHub contributions in the past 12 months' });
});

test('CV opens in a popup and returns focus to its trigger when closed', async () => {
  render(<Internships />);
  const trigger = screen.getByRole('button', { name: 'View CV' });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Armani Magnifico CV' });
  expect(within(dialog).getByRole('img', { name: 'Armani Magnifico CV' })).toHaveAttribute('src', expect.stringContaining('/assets/cv/ArmaniMagnificoCV.jpg'));
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close CV viewer' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
  expect(trigger).toHaveFocus();
  await screen.findByRole('img', { name: '3 public GitHub contributions in the past 12 months' });
});

test('GitHub activity appears below the internship card with real contribution data', async () => {
  render(<Internships />);
  const section = screen.getByRole('region', { name: 'Open for Internships' });
  const activity = within(section).getByRole('article', { name: 'Public contribution activity from my GitHub profile' });
  expect(activity.compareDocumentPosition(within(section).getByText('Seeking Opportunities').closest('article')) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
  expect(within(activity).getByRole('link', { name: /View GitHub/ })).toHaveAttribute('href', 'https://github.com/armani19');
  await waitFor(() => expect(within(activity).getByRole('img', { name: '3 public GitHub contributions in the past 12 months' })).toBeInTheDocument());
  expect(within(activity).getByTitle('2026-10-25: 2 contributions')).toHaveClass('level-2');
  expect(within(activity).getByTitle('2026-10-27: 1 contribution')).toHaveClass('level-1');
  expect(global.fetch).toHaveBeenCalledWith('https://github-contributions-api.jogruber.de/v4/armani19?y=last', expect.objectContaining({ signal: expect.any(AbortSignal) }));
});

test('GitHub activity links to the profile when the feed is unavailable', async () => {
  global.fetch.mockRejectedValue(new Error('offline'));
  render(<Internships />);
  await waitFor(() => expect(screen.getByText('Activity is temporarily unavailable. You can view it on GitHub.')).toBeVisible());
  expect(screen.getByRole('link', { name: /View GitHub/ })).toHaveAttribute('href', 'https://github.com/armani19');
});
