import { fireEvent, render, screen, within } from '@testing-library/react';
import CapstonePosters from './CapstonePosters';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
});

test('both posters open in a modal without navigation and return focus when closed', () => {
  render(<CapstonePosters />);
  for (const title of ['Capstone Project Poster', 'Capstone Research Poster']) {
    const trigger = screen.getByRole('button', { name: `Open full-size ${title}` });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: title });
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', expect.stringContaining(title.includes('Research') ? '4eyes-research-poster.png' : '4eyes-project-poster.png'));
    expect(within(dialog).getAllByRole('button')).toHaveLength(1);
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close poster viewer' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();
  }
});

test('image preview opens the popup and Escape or the backdrop closes it', () => {
  render(<CapstonePosters />);
  const trigger = screen.getByRole('button', { name: 'View Capstone Project Poster in full size' });
  fireEvent.click(trigger);
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true, cancelable: true }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(trigger);
  fireEvent.click(screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
});
