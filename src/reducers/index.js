import volumeReducer from './volumeReducer';

const rootReducer = combineReducers({
  ...,
  volume: volumeReducer,
});

export default rootReducer;