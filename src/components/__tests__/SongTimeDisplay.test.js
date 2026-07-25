import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongDetail from '../SongDetail';

const mockStore = configureStore();

describe('SongTimeDisplay', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      selectedSong: {
        title: 'Test Song',
        duration: 300 // 5 minutes in seconds
      }
    });
  });

  it('should display current time and duration', () => {
    render(
      <Provider store={store}>
        <SongDetail />
      </Provider>
    );

    const timeDisplay = screen.getByText(/0 \/ 300/);
    expect(timeDisplay).toBeInTheDocument();
  });
});