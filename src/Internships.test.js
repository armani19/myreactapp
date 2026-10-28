import { render, screen, within } from '@testing-library/react';
import Internships from './Internships';

test('internship section presents the supplied availability, setup, and all six interests', () => {
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
});
