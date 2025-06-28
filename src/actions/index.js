import axios from 'axios';

// Action Types
export const actionTypes = {
  // Song Management
  FETCH_SONGS_REQUEST: 'FETCH_SONGS_REQUEST',
  FETCH_SONGS_SUCCESS: 'FETCH_SONGS_SUCCESS',
  FETCH_SONGS_FAILURE: 'FETCH_SONGS_FAILURE',
  SELECT_SONG: 'SELECT_SONG',
  FILTER_SONGS: 'FILTER_SONGS',
  SORT_SONGS: 'SORT_SONGS',
  
  // User Management (Version 1.0)
  USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
  USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
  USER_REGISTER_FAILURE: 'USER_REGISTER_FAILURE',
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
  USER_LOGOUT: 'USER_LOGOUT',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  
  // Playlist Management
  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  ADD_TO_PLAYLIST: 'ADD_TO_PLAYLIST',
  REMOVE_FROM_PLAYLIST: 'REMOVE_FROM_PLAYLIST',
  DELETE_PLAYLIST: 'DELETE_PLAYLIST',
  FETCH_PLAYLISTS: 'FETCH_PLAYLISTS',
  
  // Audio Playback
  PLAY_SONG: 'PLAY_SONG',
  PAUSE_SONG: 'PAUSE_SONG',
  STOP_SONG: 'STOP_SONG',
  SET_VOLUME: 'SET_VOLUME',
  SET_PLAYBACK_RATE: 'SET_PLAYBACK_RATE',
  SEEK_TO_POSITION: 'SEEK_TO_POSITION',
  
  // UI State
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Search and Recommendations
  SEARCH_SONGS: 'SEARCH_SONGS',
  GET_RECOMMENDATIONS: 'GET_RECOMMENDATIONS',
  UPDATE_SEARCH_HISTORY: 'UPDATE_SEARCH_HISTORY'
};

// Action Creators

// Song Management Actions
export const fetchSongsRequest = () => ({
  type: actionTypes.FETCH_SONGS_REQUEST
});

export const fetchSongsSuccess = (songs) => ({
  type: actionTypes.FETCH_SONGS_SUCCESS,
  payload: songs
});

export const fetchSongsFailure = (error) => ({
  type: actionTypes.FETCH_SONGS_FAILURE,
  payload: error
});

export const selectSong = (song) => ({
  type: actionTypes.SELECT_SONG,
  payload: song
});

export const filterSongs = (searchTerm) => ({
  type: actionTypes.FILTER_SONGS,
  payload: searchTerm
});

export const sortSongs = (sortBy, sortOrder = 'asc') => ({
  type: actionTypes.SORT_SONGS,
  payload: { sortBy, sortOrder }
});

// User Management Actions (Version 1.0)
export const userRegisterRequest = () => ({
  type: actionTypes.USER_REGISTER_REQUEST
});

export const userRegisterSuccess = (user) => ({
  type: actionTypes.USER_REGISTER_SUCCESS,
  payload: user
});

export const userRegisterFailure = (error) => ({
  type: actionTypes.USER_REGISTER_FAILURE,
  payload: error
});

export const userLoginRequest = () => ({
  type: actionTypes.USER_LOGIN_REQUEST
});

export const userLoginSuccess = (user) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  payload: user
});

export const userLoginFailure = (error) => ({
  type: actionTypes.USER_LOGIN_FAILURE,
  payload: error
});

export const userLogout = () => ({
  type: actionTypes.USER_LOGOUT
});

export const updateUserProfile = (profile) => ({
  type: actionTypes.UPDATE_USER_PROFILE,
  payload: profile
});

// Playlist Management Actions
export const createPlaylist = (playlist) => ({
  type: actionTypes.CREATE_PLAYLIST,
  payload: playlist
});

export const addToPlaylist = (playlistId, song) => ({
  type: actionTypes.ADD_TO_PLAYLIST,
  payload: { playlistId, song }
});

export const removeFromPlaylist = (playlistId, songId) => ({
  type: actionTypes.REMOVE_FROM_PLAYLIST,
  payload: { playlistId, songId }
});

export const deletePlaylist = (playlistId) => ({
  type: actionTypes.DELETE_PLAYLIST,
  payload: playlistId
});

export const fetchPlaylists = (playlists) => ({
  type: actionTypes.FETCH_PLAYLISTS,
  payload: playlists
});

// Audio Playback Actions
export const playSong = (song) => ({
  type: actionTypes.PLAY_SONG,
  payload: song
});

export const pauseSong = () => ({
  type: actionTypes.PAUSE_SONG
});

export const stopSong = () => ({
  type: actionTypes.STOP_SONG
});

export const setVolume = (volume) => ({
  type: actionTypes.SET_VOLUME,
  payload: volume
});

export const setPlaybackRate = (rate) => ({
  type: actionTypes.SET_PLAYBACK_RATE,
  payload: rate
});

export const seekToPosition = (position) => ({
  type: actionTypes.SEEK_TO_POSITION,
  payload: position
});

// UI State Actions
export const toggleDarkMode = () => ({
  type: actionTypes.TOGGLE_DARK_MODE
});

export const setLoading = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error
});

export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR
});

// Search and Recommendations Actions
export const searchSongs = (query) => ({
  type: actionTypes.SEARCH_SONGS,
  payload: query
});

export const getRecommendations = (recommendations) => ({
  type: actionTypes.GET_RECOMMENDATIONS,
  payload: recommendations
});

export const updateSearchHistory = (searchTerm) => ({
  type: actionTypes.UPDATE_SEARCH_HISTORY,
  payload: searchTerm
});

// Async Action Creators (Thunks)

// Fetch songs from API
export const fetchSongs = () => {
  return async (dispatch) => {
    dispatch(fetchSongsRequest());
    dispatch(setLoading(true));
    
    try {
      // Mock API call - replace with actual API endpoint
      const response = await axios.get('/api/songs');
      dispatch(fetchSongsSuccess(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(fetchSongsFailure(error.message));
      dispatch(setError('Failed to fetch songs'));
      dispatch(setLoading(false));
    }
  };
};

// User registration
export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch(userRegisterRequest());
    dispatch(setLoading(true));
    
    try {
      // Mock API call - replace with actual API endpoint
      const response = await axios.post('/api/auth/register', userData);
      dispatch(userRegisterSuccess(response.data));
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      dispatch(userRegisterFailure(error.message));
      dispatch(setError('Registration failed'));
      dispatch(setLoading(false));
      throw error;
    }
  };
};

// User login
export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    dispatch(setLoading(true));
    
    try {
      // Mock API call - replace with actual API endpoint
      const response = await axios.post('/api/auth/login', credentials);
      dispatch(userLoginSuccess(response.data));
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      dispatch(userLoginFailure(error.message));
      dispatch(setError('Login failed'));
      dispatch(setLoading(false));
      throw error;
    }
  };
};

// Search songs with API
export const searchSongsAPI = (query) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    
    try {
      // Mock API call - replace with actual API endpoint
      const response = await axios.get(`/api/songs/search?q=${query}`);
      dispatch(searchSongs(response.data));
      dispatch(updateSearchHistory(query));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Search failed'));
      dispatch(setLoading(false));
    }
  };
};

// Get personalized recommendations
export const fetchRecommendations = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    
    try {
      // Mock API call - replace with actual API endpoint
      const response = await axios.get('/api/recommendations');
      dispatch(getRecommendations(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Failed to load recommendations'));
      dispatch(setLoading(false));
    }
  };
}; 