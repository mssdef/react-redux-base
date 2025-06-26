import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SongList from '../SongList';

// Mock reducers for testing
const mockReducer = (state = {
  songs: [
    { title: 'Test Song 1', duration: '3:00' },
    { title: 'Test Song 2', duration: '4:00' }
  ],
  searchTerm: ''
}, action) => {
  switch (action.type) {
    case 'FILTER_SONGS':
      return { ...state, searchTerm: action.payload };
    case 'SONG_SELECTED':
      return { ...state, selectedSong: action.payload };
    default:
      return state;
  }
};

const renderWithRedux = (component, initialState = {}) => {
  const store = createStore(mockReducer, initialState);
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('SongList Component', () => {
  test('renders song list', () => {
    renderWithRedux(<SongList />);
    expect(screen.getByText('Test Song 1')).toBeInTheDocument();
    expect(screen.getByText('Test Song 2')).toBeInTheDocument();
  });

  test('renders search input', () => {
    renderWithRedux(<SongList />);
    expect(screen.getByPlaceholderText(/Search songs/)).toBeInTheDocument();
  });

  test('filters songs when searching', () => {
    renderWithRedux(<SongList />);
    const searchInput = screen.getByPlaceholderText(/Search songs/);
    
    fireEvent.change(searchInput, { target: { value: 'Test Song 1' } });
    
    expect(screen.getByText('Test Song 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Song 2')).not.toBeInTheDocument();
  });
}); 