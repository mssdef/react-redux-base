import React from 'react';

const ARTWORK_COLORS = ['#6435c9', '#2185d0', '#21ba45', '#db2828', '#e07b53', '#a333c8'];

const artworkColor = (title) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
  return ARTWORK_COLORS[Math.abs(hash) % ARTWORK_COLORS.length];
};

const FullScreenPlayer = ({ song, isPlaying, onTogglePlay, onClose }) => {
  const color = artworkColor(song.title);

  return (
    <div
      role="dialog"
      aria-label="Full screen player"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1b1c1d',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2em',
      }}
    >
      <button
        className="ui icon button inverted"
        aria-label="Close full screen"
        type="button"
        onClick={onClose}
        style={{ position: 'absolute', top: '1em', right: '1em' }}
      >
        <i className="compress icon" aria-hidden="true"></i>
      </button>

      <div
        aria-label="Album artwork"
        style={{
          width: '240px',
          height: '240px',
          borderRadius: '12px',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <i className="music icon" aria-hidden="true" style={{ fontSize: '5em', color: 'rgba(255,255,255,0.8)' }}></i>
      </div>

      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h2 style={{ margin: 0, fontSize: '1.8em' }}>{song.title}</h2>
        <p style={{ margin: '0.4em 0 0', color: 'rgba(255,255,255,0.6)' }}>{song.duration}</p>
      </div>

      <button
        className="ui circular icon button inverted huge"
        aria-label={isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
        type="button"
        onClick={onTogglePlay}
      >
        <i className={`${isPlaying ? 'pause' : 'play'} icon`} aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default FullScreenPlayer;
