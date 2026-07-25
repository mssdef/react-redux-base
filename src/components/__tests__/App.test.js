import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';

const mockStore = configureStore([]);

describe('App component', () => {
  test('renders volume control slider', () => {
    const store = mockStore({ volume: 0.5 });
    const { getByRole } = render(<Provider store={store}><App /></Provider>);
    const slider = getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider.value).toBe('0.5');
  });

  test('updates volume on slider change', () => {
    const store = mockStore({ volume: 0.5 });
    const { getByRole } = render(<Provider store={store}><App /></Provider>);
    const slider = getByRole('slider');
    fireEvent.change(slider, { target: { value: '0.7' } });
    expect(store.getActions()).toEqual([{ type: SET_VOLUME, payload: 0.7 }]);
  });
});