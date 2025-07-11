# YouTube Playlist Analyser

A modern, responsive web application built with React and Vite that allows users to analyze YouTube playlists. Simply paste a YouTube playlist URL and get detailed information about the playlist including total duration, video count, and individual video details.

## 🚀 Features

- **Quick Analysis**: Instantly analyze any public YouTube playlist by pasting the URL
- **Comprehensive Stats**: View total number of videos and total playlist duration
- **Video Details**: See individual video information including titles, descriptions, and thumbnails
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Clean UI**: Modern dark theme with intuitive user interface
- **Direct Links**: Click on any video to watch it directly on YouTube

## 🛠️ Tech Stack

- **Frontend**: React 19 with JSX
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **API**: YouTube Data API v3
- **Linting**: ESLint

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 14 or higher)
- yarn package manager
- YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Narendra-Mahara/Youtube-Playlist-Analyser.git
   cd Youtube-Playlist-Analyser
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your YouTube API key:

   ```env
   VITE_API_KEY=your_youtube_api_key_here
   ```

4. **Start the development server**

   ```bash
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to use the application.

## 🎯 How to Use

1. **Get a YouTube Playlist URL**

   - Go to any YouTube playlist
   - Copy the URL from your browser's address bar
   - The URL should contain `list=` parameter (e.g., `https://www.youtube.com/playlist?list=PLxxxxxx`)

2. **Analyze the Playlist**

   - Paste the playlist URL in the input field
   - Click the "Analyse" button
   - Wait for the analysis to complete

3. **View Results**
   - See total number of videos and playlist duration
   - Browse through individual video cards
   - Click on any video to watch it on YouTube

## 🔑 Getting YouTube API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Restrict the API key to YouTube Data API v3 for security
6. Copy the API key and add it to your `.env` file

## 📁 Project Structure

```
src/
├── Components/
│   ├── Header.jsx          # Application header component
│   └── Search.jsx          # Main search and analysis component
├── App.jsx                 # Root application component
├── index.css              # Global styles
└── main.jsx               # Application entry point
```

## 🛠️ Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## 🌟 Key Features Explained

### Duration Parsing

The app converts YouTube's ISO 8601 duration format (PT1H2M3S) into readable time format (1h 2m 3s).

### Responsive Design

- **Desktop**: Full video details with thumbnails and descriptions
- **Mobile**: Optimized layout with essential information

### Error Handling

- Validates YouTube playlist URLs
- Handles API errors gracefully
- Provides user-friendly error messages




## 👤 Author

**Narendra Mahara**

- GitHub: [@Narendra-Mahara](https://github.com/Narendra-Mahara)

