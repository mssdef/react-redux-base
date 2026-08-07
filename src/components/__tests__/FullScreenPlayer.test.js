import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongDetail from '../SongDetail';

const mockStore = configureStore([]);

const buildStore = (overrides = {}) =>
  mockStore({
    selectedSong: { title: 'No Scrubs', duration: '4:05' },
    playbackSpeed: 1,
    shuffle: false,
    repeatMode: 'none',
    ...overrides,
  });

describe('FullScreenPlayer', () => {
  it('does not render full screen overlay by default', () => {
    render(
      <Provider store={buildStore()}>
        <SongDetail />
      </Provider>
    );

    expect(screen.queryByRole('dialog', { name: 'Full screen player' })).toBeNull();
  });

  it('renders full screen overlay when expand button is clicked', () => {
    render(
      <Provider store={buildStore()}>
        <SongDetail />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Expand to full screen' }));

    expect(screen.getByRole('dialog', { name: 'Full screen player' })).toBeTruthy();
  });

  it('shows song title and duration in full screen overlay', () => {
    render(
      <Provider store={buildStore()}>
        <SongDetail />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Expand to full screen' }));

    const dialog = screen.getByRole('dialog', { name: 'Full screen player' });
    expect(within(dialog).getByText('No Scrubs')).toBeTruthy();
    expect(within(dialog).getByText('4:05')).toBeTruthy();
  });

  it('closes full screen overlay when close button is clicked', () => {
    render(
      <Provider store={buildStore()}>
        <SongDetail />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Expand to full screen' }));
    expect(screen.getByRole('dialog', { name: 'Full screen player' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Close full screen' }));
    expect(screen.queryByRole('dialog', { name: 'Full screen player' })).toBeNull();
  });

  it('closes full screen overlay when Escape is pressed', () => {
    render(
      <Provider store={buildStore()}>
        <SongDetail />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Expand to full screen' }));
    expect(screen.getByRole('dialog', { name: 'Full screen player' })).toBeTruthy();

    fireEvent.keyDown(document, { code: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Full screen player' })).toBeNull();
  });

  it('shows play button in full screen overlay when not playing', () => {
    render(
      <Provider store={buildStore()}>
        <SongDetail />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Expand to full screen' }));

    const dialog = screen.getByRole('dialog', { name: 'Full screen player' });
    expect(within(dialog).getByRole('button', { name: 'Play No Scrubs' })).toBeTruthy();
  });

  it('shows album artwork placeholder', () => {
    render(
      <Provider store={buildStore()}>
        <SongDetail />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Expand to full screen' }));

    expect(screen.getByLabelText('Album artwork')).toBeTruthy();
  });
});
