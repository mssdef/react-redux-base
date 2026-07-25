const initialState = {
  volume: 50,
};

export default function volumeReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    default:
      return state;
  }
}
