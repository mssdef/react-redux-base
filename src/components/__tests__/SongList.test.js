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

    const songs = screen.getAllByRole('listitem');
    expect(songs).toHaveLength(4);
  });
});