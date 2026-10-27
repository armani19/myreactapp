import { fireEvent, render, waitFor } from '@testing-library/react';
import OceanBackground from './OceanBackground';

test('ocean depth follows scrolling, stays within bounds, and returns to the surface', async () => {
  const originalScroll = Object.getOwnPropertyDescriptor(window, 'scrollY');
  const height = jest.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(6000);
  const frame = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => setTimeout(callback, 0));
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  const view = render(<OceanBackground />);
  const ocean = view.container.firstChild;
  try {
    expect(ocean.style.getPropertyValue('--ocean-depth')).toBe('0.0000');
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 2500 });
    fireEvent.scroll(window);
    await waitFor(() => expect(Number(ocean.style.getPropertyValue('--ocean-depth'))).toBeGreaterThan(.5));
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 7000 });
    fireEvent.scroll(window);
    await waitFor(() => expect(ocean.style.getPropertyValue('--ocean-depth')).toBe('1.0000'));
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    fireEvent.scroll(window);
    await waitFor(() => expect(ocean.style.getPropertyValue('--ocean-depth')).toBe('0.0000'));
  } finally {
    view.unmount();
    Object.defineProperty(window, 'scrollY', originalScroll);
    height.mockRestore();
    frame.mockRestore();
  }
});
