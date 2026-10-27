import { fireEvent, render, waitFor } from '@testing-library/react';
import CursorGlow from './CursorGlow';

test('mouse glow follows the pointer and disappears when the window loses focus', async () => {
  const originalMedia = window.matchMedia;
  window.matchMedia = jest.fn(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  const frame = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => setTimeout(callback, 0));
  const view = render(<CursorGlow />);
  const glow = view.container.firstChild;
  try {
    const movement = new MouseEvent('pointermove', { clientX: 180, clientY: 120 });
    Object.defineProperty(movement, 'pointerType', { value: 'mouse' });
    fireEvent(window, movement);
    await waitFor(() => expect(glow.style.transform).toBe('translate3d(180px, 120px, 0)'));
    expect(glow.style.opacity).toBe('1');
    fireEvent.blur(window);
    expect(glow.style.opacity).toBe('0');
  } finally {
    view.unmount();
    frame.mockRestore();
    window.matchMedia = originalMedia;
  }
});
