import { fireEvent, render, screen } from '@testing-library/react';
import AboutDetails from './AboutDetails';

test('mouse hover previews details and clicking pins them after the pointer leaves', () => {
  render(<AboutDetails />);
  const trigger = screen.getByRole('button', { name: /Education/ });
  const card = trigger.closest('article');
  const hover = new Event('pointerover', { bubbles: true });
  Object.defineProperty(hover, 'pointerType', { value: 'mouse' });
  fireEvent(card, hover);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  fireEvent.pointerOut(card);
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(trigger);
  fireEvent.pointerOut(card);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('education can be expanded, pinned, and closed using the keyboard', () => {
  render(<AboutDetails />);
  const trigger = screen.getByRole('button', { name: /Education/ });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(document.getElementById('education-content')).toHaveAttribute('inert');
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(document.getElementById('education-content')).not.toHaveAttribute('inert');
  expect(screen.getByText(/General Average: 94.04/)).toBeVisible();
  fireEvent.keyDown(trigger, { key: 'Escape' });
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('all certifications expand independently and organization does not repeat the role', () => {
  render(<AboutDetails />);
  fireEvent.click(screen.getByRole('button', { name: /Certifications/ }));
  expect(screen.getByText('Devnet Associate')).toBeVisible();
  expect(screen.getByText('PMI Project Management Ready')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: /Organization/ }));
  expect(screen.getByRole('button', { name: /Certifications/ })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('button', { name: /Organization/ })).toHaveAttribute('aria-expanded', 'true');
  expect(document.getElementById('organization-content')).toHaveTextContent('Alliance of Information Technology Students');
  expect(document.getElementById('organization-content')).not.toHaveTextContent('Director');
});
