import React from 'react';
import SongList from './SongList';
import SongDetail from './SongDetail';

const App = () => {
  return (
    <div className="ui container">
      <div className="ui segment">
        <h1 className="ui header">
          <i className="music icon"></i>
          <div className="content">
            Music Player
            <div className="sub header">Select a song to view details</div>
          </div>
        </h1>
      </div>
      
      <div className="ui grid">
        <div className="ui row">
          <div className="column eight wide">
            <div className="ui segment">
              <h3 className="ui header">Song List</h3>
              <SongList />
            </div>
          </div>
          <div className="column eight wide">
            <SongDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
