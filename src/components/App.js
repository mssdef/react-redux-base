import React from 'react';
import SongList from './SongList';
import SongDetail from './SongDetail';
import ErrorBoundary from './ErrorBoundary';
import MiniPlayer from './MiniPlayer';

const App = () => {
  return (
    <div className="ui container grid" style={{ paddingBottom: '4em' }}>
      <div className="ui row">
        <div className="column eight wide">
          <ErrorBoundary>
            <SongList />
          </ErrorBoundary>
        </div>
        <div className="column eight wide">
          <SongDetail />
        </div>
      </div>
      <MiniPlayer />
    </div>
  );
};

export default App;
