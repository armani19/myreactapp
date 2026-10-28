import { fireEvent, render, waitFor } from '@testing-library/react';
import SeaMonsterFooter from './SeaMonsterFooter';

test('nine tentacles begin at Events and rise gradually through the rest of the page', async () => {
  const originalRect = HTMLElement.prototype.getBoundingClientRect;
  const originalScroll = Object.getOwnPropertyDescriptor(window, 'scrollY');
  const height = jest.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(6000);
  const frame = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => setTimeout(callback, 0));
  let scrollY = 0;
  Object.defineProperty(window, 'scrollY', { configurable: true, get: () => scrollY });
  HTMLElement.prototype.getBoundingClientRect = function () {
    if (this.id === 'events') return { top: 2000 - scrollY };
    return originalRect.call(this);
  };
  const view = render(<><section id="events" /><SeaMonsterFooter /></>);
  const layer = view.container.querySelector('.sea-monster-footer');
  const startY = 2000 - window.innerHeight * .85;
  const endY = 6000 - window.innerHeight;
  try {
    expect(layer.style.getPropertyValue('--monster-progress')).toBe('0.000');
    expect(layer.querySelectorAll('.monster-rise')).toHaveLength(9);
    scrollY = startY + (endY - startY) * .2;
    fireEvent.scroll(window);
    await waitFor(() => expect(layer.style.getPropertyValue('--monster-progress')).toBe('0.200'));
    expect(layer.style.getPropertyValue('--monster-rise')).toBe('262px');
    scrollY = startY + (endY - startY) * .5;
    fireEvent.scroll(window);
    await waitFor(() => expect(layer.style.getPropertyValue('--monster-progress')).toBe('0.500'));
    expect(layer.style.getPropertyValue('--monster-rise')).toBe('190px');
    scrollY = endY;
    fireEvent.scroll(window);
    await waitFor(() => expect(layer.style.getPropertyValue('--monster-progress')).toBe('1.000'));
    expect(layer.style.getPropertyValue('--monster-rise')).toBe('70px');
    expect(layer.style.getPropertyValue('--monster-opacity')).toBe('0.450');
  } finally {
    view.unmount();
    HTMLElement.prototype.getBoundingClientRect = originalRect;
    Object.defineProperty(window, 'scrollY', originalScroll);
    height.mockRestore();
    frame.mockRestore();
  }
});
