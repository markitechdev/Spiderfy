// Spiderfy Configuration Settings
const CONFIG = {
  // Configured Spotify Developer Client ID (Loaded securely via Vite Env Vars)
  // Fallback to hardcoded public client ID if env is missing during local dev
  DEFAULT_CLIENT_ID: import.meta.env?.VITE_SPOTIFY_CLIENT_ID || 'a8cd2ad43c0b4e63b6a599f812452604',
  
  // Scopes requested from Spotify to power all player features
  SCOPES: [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'user-read-currently-playing',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-library-read',
    'streaming' // Needed for Web Playback SDK
  ],

  // Returns the active Client ID, giving priority to localStorage if set via UI Settings
  getClientId() {
    const savedId = localStorage.getItem('spidey_client_id');
    if (savedId && savedId.trim() !== '') {
      return savedId.trim();
    }
    return this.DEFAULT_CLIENT_ID;
  },

  // Returns the active Redirect URI matching the current window origin
  getRedirectUri() {
    // Dynamically matches localhost:5173 or Vercel production URL
    // Can also be overridden by env variable
    const envUri = import.meta.env?.VITE_SPOTIFY_REDIRECT_URI;
    if (envUri && envUri !== 'YOUR_SPOTIFY_REDIRECT_URI_HERE') {
      return envUri;
    }
    return `${window.location.origin}/callback`;
  }
};

window.CONFIG = CONFIG;
