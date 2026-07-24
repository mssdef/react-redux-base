import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongList from '../SongList';

const mockStore = configureStore([]);

describe('SongList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      songs: [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarena', duration: '2:30' },
        { title: 'All Star', duration: '3:15' },
        { title: 'I Want it That Way', duration: '1:45' },
      ],
    });
  });

  it('should render a list of songs', () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    expect(screen.getByText('No Scrubs')).toBeTruthy();
    expect(screen.getByText('Macarena')).toBeTruthy();
    expect(screen.getByText('All Star')).toBeTruthy();
    expect(screen.getByText('I Want it That Way')).toBeTruthy();
    expect(screen.getAllByRole('button', { name: 'Select' })).toHaveLength(4);
  });
});
