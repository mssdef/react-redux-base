import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@material-ui/core';
import volumeReducer, { setVolume } from '../reducers/volumeReducer';

const App = () => {
  const dispatch = useDispatch();
  const volume = useSelector(state => state.volume);

  const handleSliderChange = (event, value) => {
    dispatch(setVolume(value));
  };

  return (
    <div>
      <h1>Volume Control</h1>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default App;