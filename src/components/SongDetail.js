import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, shuffleNext, setPlaybackSpeed, setVolume } from '../actions';
import FullScreenPlayer from './FullScreenPlayer';
import Waveform from './Waveform';

const SongDetail = () => {
  const song = useSelector(state => state.selectedSong);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playbackSpeed = useSelector(state => state.playbackSpeed);
  const volume = useSelector(state => state.volume);
  const shuffle = useSelector(state => state.shuffle);
  const repeatMode = useSelector(state => state.repeatMode);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleEnded = () => {
    setIsPlaying(false);
    if (repeatMode === 'one') return;
    dispatch(shuffle ? shuffleNext() : nextSong());
  };

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  const handleSpeedChange = useCallback((e) => {
    const speed = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.playbackRate = speed;
    dispatch(setPlaybackSpeed(speed));
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current && playbackSpeed) audioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const handleVolumeChange = useCallback((e) => {
    const nextVolume = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.volume = nextVolume;
    dispatch(setVolume(nextVolume));
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const seek = useCallback((delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime + delta);
    setCurrentTime(audio.currentTime);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
        return;
      }
      if (!song) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seek(-10);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seek(10);
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [song, togglePlay, seek, toggleMute, isFullScreen]);

  if (song) {
    return (
      <section className="ui segment">
        {isFullScreen && (
          <FullScreenPlayer
            song={song}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onClose={() => setIsFullScreen(false)}
          />
        )}
        <h3 className="ui header" id="selected-song-header">Selected Song</h3>
        <div className="ui card fluid" role="region" aria-labelledby="selected-song-header">
          <div className="content">
            {song.artworkUrl && (
              <img
                className="ui image"
                src={song.artworkUrl}
                alt={`${song.title} artwork`}
                style={{ width: '100%', marginBottom: '0.5em' }}
              />
            )}
            <div className="header" role="heading" aria-level="4">{song.title}</div>
            <div className="meta">
              {song.artist && <span className="artist">{song.artist}</span>}
              {song.artist && song.album && <span> &mdash; </span>}
              {song.album && <span className="album">{song.album}</span>}
            </div>
            <div className="meta">
              {song.genre && <span className="genre">{song.genre}</span>}
              {song.genre && song.year && <span> &middot; </span>}
              {song.year && <span className="year">{song.year}</span>}
              <span style={{ marginLeft: song.genre || song.year ? '0.5em' : 0 }} className="duration">{currentTime} / {song.duration}</span>
            </div>
          </div>
          <div className="extra content">
            <audio ref={audioRef} onEnded={handleEnded} aria-label={`Audio player for ${song.title}`} />
            <button
              className="ui button primary fluid"
              aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
              type="button"
              onClick={togglePlay}
            >
              <i className={`${isPlaying ? 'pause' : 'play'} icon`} aria-hidden="true"></i>
              {isPlaying ? 'Pause' : 'Play'} Song
            </button>
            <button
              className="ui button fluid"
              aria-label="Expand to full screen"
              type="button"
              onClick={() => setIsFullScreen(true)}
              style={{ marginTop: '0.5em' }}
            >
              <i className="expand icon" aria-hidden="true"></i>
              Full Screen
            </button>
            <button
              className="ui button fluid"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              type="button"
              onClick={toggleMute}
            >
              <i className={`volume ${isMuted ? 'off' : 'up'} icon`} aria-hidden="true"></i>
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <Waveform audioRef={audioRef} isPlaying={isPlaying} />
            <input
              type="range"
              min="0"
              max={song.duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              className="ui range input fluid"
              aria-label={`Seek bar for ${song.title}`}
            />
            <div className="ui labeled input" style={{ marginTop: '0.5em' }}>
              <label className="ui label" htmlFor="volume">Volume</label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="ui range input fluid"
                aria-label="Volume"
              />
            </div>
            <div className="ui labeled input" style={{ marginTop: '0.5em' }}>
              <label className="ui label" htmlFor="playback-speed">Speed</label>
              <select
                id="playback-speed"
                className="ui compact selection dropdown"
                value={playbackSpeed}
                onChange={handleSpeedChange}
                aria-label="Playback speed"
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <option key={speed} value={speed}>{speed}×</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="ui segment">
      <h3 className="ui header" id="selected-song-header">Selected Song</h3>
      <div
        className="ui placeholder"
        role="status"
        aria-label="No song selected"
        aria-labelledby="selected-song-header"
      >
        <div className="paragraph">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <p className="ui text center aligned">
          Please select a song from the list to view details.
        </p>
      </div>
    </div>
  );
};

export default SongDetail;
