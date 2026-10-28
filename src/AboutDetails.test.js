import { render, screen, within } from '@testing-library/react';
import { Certifications, Education, Organization } from './AboutDetails';

test('certifications are readable immediately without expansion controls', () => {
  render(<Certifications />);
  expect(screen.getByRole('region', { name: 'Certifications' })).toHaveAttribute('id', 'certifications');
  expect(screen.getAllByRole('img', { name: /badge$/ })).toHaveLength(4);
  expect(screen.getByRole('img', { name: 'Alliance of Information Technology Students logo' })).toBeVisible();
  expect(screen.getByText('DevNet Associate')).toBeVisible();
  expect(screen.getByText('PMI Project Management Ready')).toBeVisible();
  expect(screen.getByText('Operating Systems Basics')).toBeVisible();
  const badgeLinks = [
    ['DevNet Associate', 'f85abd99-8b23-4e3f-98e6-a38cb227485f'],
    ['CCNA: Enterprise Networking, Security, and Automation', 'e541f10f-1a42-4dcf-af29-a9c9b4c5bde8'],
    ['PMI Project Management Ready', 'fbd4c6a0-46cc-4dc8-bb00-9463577bbd7d'],
    ['Operating Systems Basics', '838320cf-bf55-4d95-bb3b-a1fdb269c965'],
  ];
  badgeLinks.forEach(([name, id]) => {
    const link = screen.getByRole('link', { name: `View ${name} badge on Credly` });
    expect(link).toHaveAttribute('href', `https://www.credly.com/earner/earned/badge/${id}`);
    expect(link).toHaveAttribute('target', '_blank');
  });
  const aits = screen.getByText('Certificate of Officership').closest('li');
  expect(within(aits).queryByRole('link')).not.toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByText(/Click to/)).not.toBeInTheDocument();
});

test('education and organization are independently addressable sections with visible details', () => {
  render(<><Education /><Organization /></>);
  expect(screen.getByRole('region', { name: 'Education' })).toHaveAttribute('id', 'education');
  expect(screen.getByText(/General Average: 94.04/)).toBeVisible();
  expect(screen.getByRole('img', { name: 'FEU Institute of Technology logo' })).toBeVisible();
  expect(screen.getByRole('img', { name: 'Saint Joseph School of Gagalangin logo' })).toBeVisible();
  const organization = screen.getByRole('region', { name: 'Organization' });
  expect(organization).toHaveAttribute('id', 'organization');
  expect(organization).toHaveTextContent('Alliance of Information Technology Students');
  expect(organization).not.toHaveTextContent('Director');
});
