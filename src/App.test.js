import { fireEvent, render, screen } from '@testing-library/react';
import Projects from './Projects';

test('gallery switches through image thumbnails', () => {
  render(<Projects />);
  fireEvent.click(screen.getByRole('button', { name: 'Preview Violation Record' }));
  expect(screen.getByRole('button', { name: 'Enlarge Violation Record design' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Preview Create Incident Report' }));
  expect(screen.getByRole('button', { name: 'Enlarge Create Incident Report design' })).toBeInTheDocument();
});

test('detail tabs support keyboard selection and show matching information', () => {
  render(<Projects />);
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Overview' }), { key: 'ArrowRight' });
  const roleTab = screen.getByRole('tab', { name: 'My role' });
  expect(roleTab).toHaveAttribute('aria-selected', 'true');
  expect(roleTab).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Microsoft Power Apps');
  fireEvent.click(screen.getByRole('tab', { name: 'Collaboration' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Guidance Counseling Office');
});
