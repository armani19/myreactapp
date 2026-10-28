import { render, screen, waitFor, within } from '@testing-library/react';
import Internships from './Internships';

const originalFetch = global.fetch;

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
  expect(within(section).getByRole('link', { name: 'View CV image in a new tab' })).toHaveAttribute('href', expect.stringContaining('/assets/cv/ArmaniMagnificoCV.jpg'));
  expect(within(section).getByRole('link', { name: 'View CV image in a new tab' })).toHaveAttribute('target', '_blank');
  expect(within(section).getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', expect.stringContaining('/assets/cv/ArmaniMagnificoCV.pdf'));
  expect(within(section).getByRole('link', { name: 'Download PDF' })).toHaveAttribute('download', 'ArmaniMagnificoCV.pdf');
  expect(within(section).getByRole('link', { name: 'Email Me' })).toHaveAttribute('href', expect.stringContaining('armanimagnifico4195@gmail.com'));
  await within(section).findByRole('img', { name: '3 public GitHub contributions in the past 12 months' });
});

test('GitHub activity appears below the internship card with real contribution data', async () => {
  render(<Internships />);
  const section = screen.getByRole('region', { name: 'Open for Internships' });
  const activity = within(section).getByRole('article', { name: 'A year of building, in little squares.' });
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
