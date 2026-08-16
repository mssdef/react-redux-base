import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const Boom = () => {
  throw new Error('boom');
};

describe('ErrorBoundary refresh button', () => {
  let consoleErrorSpy;
  let reloadSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    reloadSpy = jest.fn();
    delete window.location;
    window.location = { reload: reloadSpy };
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('reloads the page when the refresh button is clicked', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));

    expect(reloadSpy).toHaveBeenCalledTimes(1);
  });
});
