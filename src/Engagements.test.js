import { render, screen, within } from '@testing-library/react';
import Engagements from './Engagements';

test('events present all three supplied milestones with photos and their dates', () => {
  render(<Engagements />);
  const section = screen.getByRole('region', { name: 'Engagements & Events' });
  expect(within(section).getAllByRole('article')).toHaveLength(3);
  expect(within(section).getAllByRole('img')).toHaveLength(3);
  expect(within(section).getByText('October 24, 2026')).toHaveAttribute('dateTime', '2026-10-24');
  expect(within(section).getByText('October 2, 2026')).toHaveAttribute('dateTime', '2026-10-02');
  expect(within(section).getByText('July 26, 2026')).toHaveAttribute('dateTime', '2026-07-26');
  expect(within(section).getByText(/Presented our project, Suki PromiseGuard/)).toBeVisible();
  expect(within(section).getByText(/Successfully passed the final defense/)).toBeVisible();
  expect(within(section).getByText(/Delivered the welcome remarks/)).toBeVisible();
});
