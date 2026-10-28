import { fireEvent, render, screen } from '@testing-library/react';
import ShowcaseSlider from './ShowcaseSlider';

test('arrows, markers, and keyboard move the reel; manual scrolling updates its position', () => {
  const matchMedia = window.matchMedia;
  window.matchMedia = () => ({ matches: true });
  render(<ShowcaseSlider label="Gallery" titles={['First', 'Second', 'Third']}>
    <article key="first">First</article><article key="second">Second</article><article key="third">Third</article>
  </ShowcaseSlider>);
  const track = screen.getByLabelText('Gallery slides');
  Array.from(track.children).forEach((slide, index) => {
    Object.defineProperty(slide, 'offsetLeft', { value: 20 + index * 500 });
  });
  track.scrollTo = jest.fn(({ left }) => {
    track.scrollLeft = left;
    fireEvent.scroll(track);
  });
  const previous = screen.getByRole('button', { name: 'Previous Gallery slide' });
  const next = screen.getByRole('button', { name: 'Next Gallery slide' });
  expect(previous).toBeDisabled();
  fireEvent.click(next);
  expect(track.scrollTo).toHaveBeenLastCalledWith({ left: 500, behavior: 'instant' });
  expect(screen.getByRole('button', { name: 'Show Second' })).toHaveAttribute('aria-current', 'true');
  fireEvent.keyDown(track, { key: 'End' });
  expect(next).toBeDisabled();
  fireEvent.click(previous);
  expect(screen.getByRole('button', { name: 'Show Second' })).toHaveAttribute('aria-current', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Show First' }));
  expect(previous).toBeDisabled();
  track.scrollLeft = 980;
  fireEvent.scroll(track);
  expect(screen.getByRole('button', { name: 'Show Third' })).toHaveAttribute('aria-current', 'true');
  window.matchMedia = matchMedia;
});
