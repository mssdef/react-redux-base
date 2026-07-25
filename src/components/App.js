import React from 'react';
import SongList from './SongList';
import SongDetail from './SongDetail';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <div className="ui container grid">
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
    </div>
  );
};

export default App;
