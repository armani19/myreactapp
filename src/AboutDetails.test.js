import { render, screen } from '@testing-library/react';
import AboutDetails, { Education, Organization } from './AboutDetails';

test('certifications are readable immediately without expansion controls', () => {
  render(<AboutDetails />);
  expect(screen.getByText('Devnet Associate')).toBeVisible();
  expect(screen.getByText('PMI Project Management Ready')).toBeVisible();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByText(/Click to/)).not.toBeInTheDocument();
});

test('education and organization are independently addressable sections with visible details', () => {
  render(<><Education /><Organization /></>);
  expect(screen.getByRole('region', { name: 'My Education' })).toHaveAttribute('id', 'education');
  expect(screen.getByText(/General Average: 94.04/)).toBeVisible();
  const organization = screen.getByRole('region', { name: 'My Organization' });
  expect(organization).toHaveAttribute('id', 'organization');
  expect(organization).toHaveTextContent('Alliance of Information Technology Students');
  expect(organization).not.toHaveTextContent('Director');
});
