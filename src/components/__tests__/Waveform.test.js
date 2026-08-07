import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import Waveform from '../Waveform';

const makeAudioRef = () => ({ current: document.createElement('audio') });

const makeMocks = () => {
  const analyser = {
    fftSize: 2048,
    frequencyBinCount: 1024,
    getByteTimeDomainData: jest.fn(),
    connect: jest.fn(),
  };
  const source = { connect: jest.fn() };
  const audioCtx = {
    createAnalyser: jest.fn().mockReturnValue(analyser),
    createMediaElementSource: jest.fn().mockReturnValue(source),
    destination: {},
  };
  return { analyser, source, audioCtx };
};

beforeEach(() => {
  const { audioCtx } = makeMocks();
  Object.defineProperty(window, 'AudioContext', {
    writable: true,
    configurable: true,
    value: jest.fn().mockReturnValue(audioCtx),
  });
  window.requestAnimationFrame = jest.fn();
  window.cancelAnimationFrame = jest.fn();
  HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    fillRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
  });
});

describe('Waveform', () => {
  it('renders a canvas with aria-label', () => {
    const audioRef = makeAudioRef();
    render(<Waveform audioRef={audioRef} isPlaying={false} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas.getAttribute('aria-label')).toBe('Waveform visualizer');
  });

  it('renders canvas with correct dimensions', () => {
    const audioRef = makeAudioRef();
    render(<Waveform audioRef={audioRef} isPlaying={false} />);
    const canvas = document.querySelector('canvas');
    expect(canvas.getAttribute('width')).toBe('300');
    expect(canvas.getAttribute('height')).toBe('80');
  });

  it('creates AudioContext and connects nodes when audio element is present', () => {
    const { analyser, audioCtx } = makeMocks();
    window.AudioContext = jest.fn().mockReturnValue(audioCtx);

    const audioRef = makeAudioRef();
    render(<Waveform audioRef={audioRef} isPlaying={false} />);

    expect(window.AudioContext).toHaveBeenCalledTimes(1);
    expect(audioCtx.createAnalyser).toHaveBeenCalledTimes(1);
    expect(audioCtx.createMediaElementSource).toHaveBeenCalledWith(audioRef.current);
    expect(analyser.connect).toHaveBeenCalledWith(audioCtx.destination);
  });

  it('starts animation loop when isPlaying is true', () => {
    const { analyser } = makeMocks();
    window.AudioContext = jest.fn().mockReturnValue({
      createAnalyser: jest.fn().mockReturnValue(analyser),
      createMediaElementSource: jest.fn().mockReturnValue({ connect: jest.fn() }),
      destination: {},
    });
    let rafCallCount = 0;
    window.requestAnimationFrame = jest.fn((cb) => {
      if (rafCallCount++ === 0) cb();
      return rafCallCount;
    });

    const audioRef = makeAudioRef();
    render(<Waveform audioRef={audioRef} isPlaying={true} />);

    expect(window.requestAnimationFrame).toHaveBeenCalled();
    expect(analyser.getByteTimeDomainData).toHaveBeenCalled();
  });

  it('does not call getByteTimeDomainData when isPlaying is false', () => {
    const { analyser } = makeMocks();
    window.AudioContext = jest.fn().mockReturnValue({
      createAnalyser: jest.fn().mockReturnValue(analyser),
      createMediaElementSource: jest.fn().mockReturnValue({ connect: jest.fn() }),
      destination: {},
    });

    const audioRef = makeAudioRef();
    render(<Waveform audioRef={audioRef} isPlaying={false} />);

    expect(analyser.getByteTimeDomainData).not.toHaveBeenCalled();
  });

  it('cancels animation frame on unmount', () => {
    const { analyser } = makeMocks();
    window.AudioContext = jest.fn().mockReturnValue({
      createAnalyser: jest.fn().mockReturnValue(analyser),
      createMediaElementSource: jest.fn().mockReturnValue({ connect: jest.fn() }),
      destination: {},
    });
    window.requestAnimationFrame = jest.fn(() => 42);

    const audioRef = makeAudioRef();
    const { unmount } = render(<Waveform audioRef={audioRef} isPlaying={true} />);
    unmount();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('does not start animation when no audio ref is present', () => {
    const audioRef = { current: null };
    render(<Waveform audioRef={audioRef} isPlaying={true} />);
    expect(window.AudioContext).not.toHaveBeenCalled();
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });
});
