import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chat from '../Chat';
import '@testing-library/jest-dom';

describe('Chat', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends message and displays reply on success', async () => {
    const mockFetch = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => ({ reply: 'Hi there!' }),
      } as any);

    render(<Chat />);

    fireEvent.change(screen.getByPlaceholderText(/ask me something/i), {
      target: { value: 'Hello' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith(
      '/api/chat',
      expect.objectContaining({
        method: 'POST',
      })
    ));

    await screen.findByText('Hi there!');
  });

  it('shows error message when request fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    } as any);

    render(<Chat />);

    fireEvent.change(screen.getByPlaceholderText(/ask me something/i), {
      target: { value: 'Hello' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await screen.findByText('Server error');
  });
});
