import { fireEvent, render, waitFor } from '@testing-library/react';
import SeaMonsterFooter from './SeaMonsterFooter';

test('tentacles stay hidden until the footer is a quarter visible, then rise faintly', async () => {
  const originalRect = HTMLElement.prototype.getBoundingClientRect;
  const frame = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => setTimeout(callback, 0));
  let footerTop = window.innerHeight + 100;
  HTMLElement.prototype.getBoundingClientRect = function () {
    if (this.tagName === 'FOOTER') return { top: footerTop, height: 400 };
    return originalRect.call(this);
  };
  const view = render(<footer><SeaMonsterFooter /></footer>);
  const layer = view.container.querySelector('.sea-monster-footer');
  try {
    expect(layer.style.getPropertyValue('--monster-progress')).toBe('0.000');
    footerTop = window.innerHeight - 80;
    fireEvent.scroll(window);
    await waitFor(() => expect(layer.style.getPropertyValue('--monster-rise')).toBe('310px'));
    expect(layer.style.getPropertyValue('--monster-opacity')).toBe('0.000');
    footerTop = window.innerHeight - 250;
    fireEvent.scroll(window);
    await waitFor(() => expect(layer.style.getPropertyValue('--monster-progress')).toBe('0.500'));
    expect(layer.style.getPropertyValue('--monster-rise')).toBe('190px');
    expect(layer.style.getPropertyValue('--monster-opacity')).toBe('0.170');
    footerTop = window.innerHeight - 400;
    fireEvent.scroll(window);
    await waitFor(() => expect(layer.style.getPropertyValue('--monster-progress')).toBe('1.000'));
    expect(layer.style.getPropertyValue('--monster-rise')).toBe('70px');
    expect(layer.style.getPropertyValue('--monster-opacity')).toBe('0.340');
  } finally {
    view.unmount();
    HTMLElement.prototype.getBoundingClientRect = originalRect;
    frame.mockRestore();
  }
});
