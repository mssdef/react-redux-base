# Music Player - React Redux Application

A React/Redux music-player frontend. Songs are loaded from a static local JSON catalog — there is no Magento, GraphQL, or backend API involved.


## Features

- 🎵 **Song Management**: View and select songs from a curated list
- 🔍 **Search Functionality**: Filter songs by title, artist, album, genre, and year in real-time
- ▶️ **Audio Playback**: Play/pause, seek, mute, and playback speed control via the HTML `<audio>` element
- 🔀 **Shuffle & Repeat**: Shuffle queue order and cycle repeat modes (none / one / all)
- ⌨️ **Keyboard Shortcuts**: Space to play/pause, arrow keys to seek, M to mute, Escape to close full-screen player
- 🖥️ **Full-Screen Player & Mini Player**: Expanded playback view plus a persistent bottom mini player
- 📈 **Waveform Visualizer**: Live canvas waveform driven by the Web Audio API
- 🎨 **Modern UI**: Beautiful interface using Semantic UI framework
- ♿ **Accessibility**: ARIA labels and semantic HTML for better accessibility
- 🛡️ **Error Handling**: Error boundaries for graceful error recovery
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Recent Improvements

### Bugs Fixed
- ✅ Fixed typo in button className (`"buttin"` → `"button"`)
- ✅ Added missing Semantic UI CSS framework
- ✅ Improved error handling with ErrorBoundary component
- ✅ Enhanced accessibility with ARIA labels

### Features Added
- 🔍 **Search & Filter**: Real-time song filtering by title
- 🎨 **Enhanced UI**: Better styling with cards, segments, and icons
- 📊 **Visual Feedback**: Improved song selection display
- 🛡️ **Error Recovery**: Graceful error handling with user-friendly messages

### Technical Improvements
- ⬆️ **Updated Dependencies**: React 16 → React 18, modern testing libraries
- 🧹 **Code Quality**: Better code formatting and structure
- 📝 **Documentation**: Comprehensive README and inline comments
- 🔧 **Development Tools**: Added linting scripts and ESLint configuration

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
│   └── index.js          # Redux actions
├── components/
│   ├── App.js              # Main application component
│   ├── ErrorBoundary.js    # Error handling component
│   ├── SongDetail.js       # Song details, audio controls, keyboard shortcuts
│   ├── SongList.js         # Song list with search/filtering
│   ├── MiniPlayer.js       # Fixed bottom playback bar
│   ├── FullScreenPlayer.js # Full-screen player modal
│   ├── Waveform.js         # Web Audio API waveform visualizer
│   └── LoadingSpinner.js   # Reusable loading spinner
├── reducers/
│   └── index.js         # Redux reducers
└── index.js             # Application entry point
```

## Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **Redux** - State management
- **React Redux** - React bindings for Redux
- **Semantic UI** - CSS framework for beautiful UI components
- **Create React App** - Build tool and development environment

## Future Enhancements

- 📱 **PWA Support**: Progressive Web App features
- 🎨 **Dark Mode**: Theme switching capability
- 📊 **Analytics**: User interaction tracking
- 🔐 **Authentication**: User accounts and playlists
- 📱 **Mobile App**: React Native version


## Roadmap (Iteration 3)

Section 1: Immediate Priorities
- Create the app with React and Redux, including user authentication and playlists management
- Implement audio playing functionality using modern React libraries (React 18 Modern React with hooks and concurrent features) and the Semantic UI CSS framework for beautiful UI components.
- Integrate Reactive Redux to manage state and provide smooth performance with a progressive Web App (PWA) feature.
- Implement DaRk Mode to offer darker visual experience and user interface customization options.
- Test the app on various devices, including desktop and mobile browsers, and integrate Analytics to track user interactions for better insights and optimization.

Section 2: Short-term Goals (1-3 months)
- Implement User Interface (UI) mockups with designers for final visual appeal and usability testing before development.
- Create initial playlists using Semantic UI, using Music Genre, Artist, Album, and Song filters to filter songs from a curated list.
- Add search functionality to allow users to find songs based on keywords or specific metadata (e.g., title, genre, album).
- Implement Audio Playback (PLAY) function with proper playlist management for smooth streaming experience.
- Integrate Progressive Web App (PWA) feature for better user experience and performance on devices with slower internet connection.

Section 3: Medium-term Visions (3-6 months)
- Add Music Genre, Artist, Album, and Song filters to further enhance user experience by allowing users to filter songs based on their preferences.
- Integrate Social Media Sharing (SHARE) feature with popular social media platforms for easy sharing of favorite songs with friends.
- Implement Reactive Redux with ARIA labels to provide accessibility support, such as alt text and spoken captions for visually impaired users.
- Incorporate error handling mechanisms to improve user experience by providing graceful error recovery.

Section 4: Long-term Strategy (6-12 months)
- Develop a DARE (Designed for Artists, Readers, Ecophiles) User Group with a Discord server for users and artists to connect with each other and share their music preferences.
- Offer Music Video Playback feature using YouTube API to provide more visual content for musicians.
- Implement Spotify Connect API integration for seamless streaming experience among devices with different operating systems.
- Integrate Amazon Music Cloud functionality to stream songs from Amazon Prime or Amazon Music HD libraries, while maintaining a balance between music quality and streaming time for users.


