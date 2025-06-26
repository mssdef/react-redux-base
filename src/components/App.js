import React from 'react';
import PropTypes from 'prop-types';
import SongList from './SongList';
import SongDetail from './SongDetail';

const App = () => {
  return (
    <div className="ui container" role="main">
      <div className="ui segment">
        <h1 className="ui header">
          <i className="music icon" aria-hidden="true"></i>
          <div className="content">
            Music Player
            <div className="sub header">Select a song to view details</div>
          </div>
        </h1>
      </div>
      
      <div className="ui stackable grid">
        <div className="ui row">
          <div className="column sixteen wide tablet eight wide computer">
            <div className="ui segment">
              <h2 className="ui header" id="song-list-header">Song List</h2>
              <SongList />
            </div>
          </div>
          <div className="column sixteen wide tablet eight wide computer">
            <SongDetail />
          </div>
        </div>
      </div>
      
      <div className="ui segment" style={{ marginTop: '2rem' }}>
        <div className="ui text center aligned">
          <p>
            <i className="heart icon" style={{ color: '#e74c3c' }} aria-hidden="true"></i>
            Made with React & Redux
          </p>
          <p className="ui text small">
            Version 0.1.0 - A modern music player application
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
