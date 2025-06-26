# Music Player - React Redux Application

A modern React/Redux application for managing and playing music tracks with search functionality and improved user experience.

## Features

- 🎵 **Song Management**: View and select songs from a curated list
- 🔍 **Search Functionality**: Filter songs by title in real-time
- 🎨 **Modern UI**: Beautiful interface using Semantic UI framework
- ♿ **Accessibility**: ARIA labels and semantic HTML for better accessibility
- 🛡️ **Error Handling**: Error boundaries for graceful error recovery
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⌨️ **Keyboard Navigation**: Full keyboard support for accessibility
- 🧪 **Testing**: Comprehensive test coverage with React Testing Library

## Recent Improvements

### Bugs Fixed
- ✅ Fixed typo in button className (`"buttin"` → `"button"`)
- ✅ Added missing Semantic UI CSS framework
- ✅ Improved error handling with ErrorBoundary component
- ✅ Enhanced accessibility with ARIA labels
- ✅ Updated ReactDOM.render to createRoot (React 18 compatibility)
- ✅ Added proper PropTypes for type checking
- ✅ Fixed Redux store configuration with DevTools

### Features Added
- 🔍 **Search & Filter**: Real-time song filtering by title
- 🎨 **Enhanced UI**: Better styling with cards, segments, and icons
- 📊 **Visual Feedback**: Improved song selection display
- 🛡️ **Error Recovery**: Graceful error handling with user-friendly messages
- ⌨️ **Keyboard Support**: Enter key to select first search result
- 📱 **Responsive Grid**: Stackable grid for mobile devices
- 🎵 **Play Button**: Added play button in song details
- 🧪 **Unit Tests**: Basic test coverage for components

### Technical Improvements
- ⬆️ **Updated Dependencies**: React 16 → React 18, modern testing libraries
- 🧹 **Code Quality**: Better code formatting and structure
- 📝 **Documentation**: Comprehensive README and inline comments
- 🔧 **Development Tools**: Added linting scripts and ESLint configuration
- 🔄 **Functional Components**: Converted class components to functional with hooks
- 🎯 **Action Validation**: Added input validation in action creators
- 🏗️ **Redux DevTools**: Enabled Redux DevTools for debugging
- 📦 **Semantic UI React**: Added proper Semantic UI React dependency

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
```bash
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues

## Project Structure

```
src/
├── actions/
│   └── index.js          # Redux actions with validation
├── components/
│   ├── App.js           # Main application component
│   ├── ErrorBoundary.js # Error handling component
│   ├── LoadingSpinner.js # Loading state component
│   ├── SongDetail.js    # Song details display
│   ├── SongList.js      # Song list with search
│   └── __tests__/       # Test files
├── reducers/
│   └── index.js         # Redux reducers
└── index.js             # Application entry point
```

## Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **Redux** - State management with DevTools
- **React Redux** - React bindings for Redux
- **Semantic UI React** - React components for beautiful UI
- **PropTypes** - Runtime type checking
- **React Testing Library** - Testing utilities
- **Create React App** - Build tool and development environment

## Accessibility Features

- ♿ **ARIA Labels**: Proper labeling for screen readers
- ⌨️ **Keyboard Navigation**: Full keyboard support
- 🎯 **Focus Management**: Proper focus indicators
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **High Contrast**: Semantic UI's accessible color scheme

## Future Enhancements

- 🎵 **Audio Playback**: Actual music playing functionality
- 📱 **PWA Support**: Progressive Web App features
- 🎨 **Dark Mode**: Theme switching capability
- 📊 **Analytics**: User interaction tracking
- 🔐 **Authentication**: User accounts and playlists
- 📱 **Mobile App**: React Native version
- 🎼 **Playlist Management**: Create and manage playlists
- 🔄 **Real-time Updates**: WebSocket integration for live updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
