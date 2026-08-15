describe('volume reducer localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  it('defaults volume to 1 when localStorage has no stored value', () => {
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.volume).toBe(1);
  });

  it('initializes volume from a value stored in localStorage', () => {
    localStorage.setItem('volume', '0.3');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: '@@INIT' });
    expect(state.volume).toBe(0.3);
  });

  it('still responds to VOLUME_CHANGED after initializing from localStorage', () => {
    localStorage.setItem('volume', '0.3');
    const reducers = require('../index').default;
    const state = reducers(undefined, { type: 'VOLUME_CHANGED', payload: 0.7 });
    expect(state.volume).toBe(0.7);
  });
});
