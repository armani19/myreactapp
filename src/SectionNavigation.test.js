import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SectionNavigation, { sections } from './SectionNavigation';

test('dot navigation keeps accessible names and tracks the section reached by scrolling', async () => {
  let position = 0;
  const targets = sections.map(([, id], index) => {
    const section = document.createElement('section');
    section.id = id;
    section.getBoundingClientRect = () => ({ top: index * 1000 - position });
    document.body.appendChild(section);
    return section;
  });
  const frame = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => setTimeout(callback, 0));
  const view = render(<SectionNavigation />);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'location');
  expect(screen.getByRole('link', { name: 'Education' })).toHaveAttribute('href', '#education');
  position = 5000;
  fireEvent.scroll(window);
  await waitFor(() => expect(screen.getByRole('link', { name: 'Education' })).toHaveAttribute('aria-current', 'location'));
  expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  position = 6000;
  fireEvent.scroll(window);
  await waitFor(() => expect(screen.getByRole('link', { name: 'Organization' })).toHaveAttribute('aria-current', 'location'));
  view.unmount();
  targets.forEach(section => section.remove());
  frame.mockRestore();
});
