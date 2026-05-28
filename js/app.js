// Spiderfy SPA Router and Audio Player Engine

const PlayerEngine = {
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  debounceTimeout: null,
  spotifyPlayer: null,
  deviceId: null,
  isPremium: false,

  initializeQueue(tracks) {
    if (!tracks || tracks.length === 0) return;
    this.queue = tracks;
    this.currentIndex = 0;
  },

  initSpotifySDK() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = window.Auth.getAccessToken();
      if (!token) return;

      this.spotifyPlayer = new Spotify.Player({
        name: 'Spiderfy Web Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      this.spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        this.deviceId = device_id;
        this.isPremium = true;
      });

      this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      this.spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });

      this.spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });

      this.spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
        this.isPremium = false;
        // Non-premium user fallback
        const fallbackStatusEl = document.getElementById('bottom-fallback-status');
        if (fallbackStatusEl) {
          fallbackStatusEl.innerText = 'Spotify Premium is required for full in-app playback.';
          fallbackStatusEl.style.color = 'var(--spidey-red)';
        }
      });

      this.spotifyPlayer.addListener('player_state_changed', state => {
        if (!state) return;
        this.isPlaying = !state.paused;
        this.updateUIState();
        
        // Update track metadata from SDK state
        const track = state.track_window.current_track;
        if (track) {
          this.updateActiveTrackMetadata(
            track.name,
            track.artists.map(a => a.name).join(', '),
            track.album.images[0]?.url,
            track.id
          );
        }
      });

      this.spotifyPlayer.connect();
    };

    // Dynamically inject script to ensure onSpotifyWebPlaybackSDKReady is defined before load
    if (!document.getElementById('spotify-sdk-script')) {
      const script = document.createElement('script');
      script.id = 'spotify-sdk-script';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  },

  async loadTrack(id, name, artist, imgUrl, previewUrl) {
    const fallbackStatusEl = document.getElementById('bottom-fallback-status');
    if (fallbackStatusEl) fallbackStatusEl.innerText = '';

    this.updateActiveTrackMetadata(name, artist, imgUrl, id);

    const queueIdx = this.queue.findIndex(t => t.id === id);
    if (queueIdx !== -1) {
      this.currentIndex = queueIdx;
    }

    if (this.isPremium && this.deviceId) {
      // Transfer playback to this Web Player device first
      try {
        const token = window.Auth.getAccessToken();
        await fetch('https://api.spotify.com/v1/me/player', {
          method: 'PUT',
          body: JSON.stringify({ device_ids: [this.deviceId], play: false }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        // Play via Spotify Connect API on our Web Playback SDK device
        const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [`spotify:track:${id}`] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        if (!res.ok) {
          throw new Error('Premium playback failed');
        }
      } catch (e) {
        console.warn('Playback error:', e);
        this.fallbackToPreview(id, name, artist, imgUrl, previewUrl);
      }
    } else {
      // Fallback to HTML5 audio preview
      this.fallbackToPreview(id, name, artist, imgUrl, previewUrl);
    }
  },
  
  async fallbackToPreview(id, name, artist, imgUrl, previewUrl) {
    const audio = document.getElementById('global-html5-audio');
    if (!audio) return;
    const fallbackStatusEl = document.getElementById('bottom-fallback-status');
    
    let activePreview = previewUrl;

    // Spotify often omits preview_url, so fallback to iTunes
    if (!activePreview || activePreview === 'null' || activePreview === 'undefined') {
      try {
        activePreview = await window.SpotifyAPI.fetchiTunesPreview(name, artist);
      } catch (e) {
        console.warn('iTunes fallback failed', e);
      }
    }

    if (!activePreview || activePreview === 'null' || activePreview === 'undefined') {
      if (fallbackStatusEl) fallbackStatusEl.innerText = 'Spotify Premium is required for full in-app playback.';
      
      // We can also let the user open it in Spotify
      if (fallbackStatusEl) {
          fallbackStatusEl.innerHTML = `Spotify Premium is required for full in-app playback. <a href="https://open.spotify.com/track/${id}" target="_blank" style="color:var(--electric-blue); text-decoration:underline;">Open in Spotify</a>`;
      }
      
      audio.src = '';
      this.pause();
      return;
    }

    audio.src = activePreview;
    this.playHTML5();
  },

  updateActiveTrackMetadata(name, artist, imgUrl, trackId) {
    const bottomArt = document.getElementById('bottom-album-art');
    const bottomTitle = document.getElementById('bottom-track-title');
    const bottomArtist = document.getElementById('bottom-track-artist');

    if (bottomArt) bottomArt.src = imgUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=80&auto=format&fit=crop&q=80';
    if (bottomTitle) bottomTitle.innerText = name;
    if (bottomArtist) bottomArtist.innerText = artist;
    
    // Also update Player Room if it's active
    const prArt = document.getElementById('pr-album-art');
    const prTitle = document.getElementById('pr-track-title');
    const prArtist = document.getElementById('pr-track-artist');
    if (prArt) prArt.src = imgUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=80';
    if (prTitle) prTitle.innerText = name;
    if (prArtist) prArtist.innerText = artist;

    // Update Dashboard visualizer if active
    const dashArt = document.getElementById('dash-np-art');
    const dashTitle = document.getElementById('dash-np-title');
    const dashArtist = document.getElementById('dash-np-artist');
    if (dashArt) dashArt.src = imgUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=80&auto=format&fit=crop&q=80';
    if (dashTitle) dashTitle.innerText = name;
    if (dashArtist) dashArtist.innerText = artist;
  },

  playIndex(index) {
    if (index < 0 || index >= this.queue.length) return;
    this.currentIndex = index;
    const track = this.queue[index];
    this.loadTrack(track.id, track.name, track.artists.map(a => a.name).join(', '), track.album?.images[0]?.url || '', track.preview_url);
  },

  togglePlay() {
    if (this.isPremium && this.spotifyPlayer) {
      this.spotifyPlayer.togglePlay().then(() => {
        console.log('Toggled playback!');
      });
    } else {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.playHTML5();
      }
    }
  },

  playHTML5() {
    const audio = document.getElementById('global-html5-audio');
    if (!audio) return;
    if (audio.src) {
        audio.play().then(() => {
        this.isPlaying = true;
        this.updateUIState();
        }).catch(e => {
        console.warn('Audio play request failed:', e);
        this.isPlaying = true;
        this.updateUIState();
        });
    }
  },

  pause() {
    if (this.isPremium && this.spotifyPlayer) {
      this.spotifyPlayer.pause().then(() => {
        this.isPlaying = false;
        this.updateUIState();
      });
    } else {
      const audio = document.getElementById('global-html5-audio');
      if (audio) audio.pause();
      this.isPlaying = false;
      this.updateUIState();
    }
  },

  playNext() {
    if (this.isPremium && this.spotifyPlayer) {
      this.spotifyPlayer.nextTrack().then(() => {
        console.log('Skipped to next track!');
      });
    } else {
      if (this.queue.length === 0) return;
      let nextIdx = this.currentIndex + 1;
      if (nextIdx >= this.queue.length) nextIdx = 0;
      this.playIndex(nextIdx);
    }
  },

  playPrev() {
    if (this.isPremium && this.spotifyPlayer) {
      this.spotifyPlayer.previousTrack().then(() => {
        console.log('Skipped to previous track!');
      });
    } else {
      if (this.queue.length === 0) return;
      let prevIdx = this.currentIndex - 1;
      if (prevIdx < 0) prevIdx = this.queue.length - 1;
      this.playIndex(prevIdx);
    }
  },

  updateUIState() {
    const playBtnSvg = document.getElementById('bottom-play-svg');
    const playBtn = document.getElementById('bottom-btn-play');

    if (this.isPlaying) {
      if (playBtnSvg) playBtnSvg.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      if (playBtn) playBtn.style.backgroundColor = 'var(--spidey-red)';
    } else {
      if (playBtnSvg) playBtnSvg.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      if (playBtn) playBtn.style.backgroundColor = 'var(--text-white)';
    }
    
    // Player Room sync
    const prPlayBtnSvg = document.getElementById('pr-play-svg');
    const prPlayBtn = document.getElementById('pr-btn-play');
    if (prPlayBtnSvg && prPlayBtn) {
      if (this.isPlaying) {
        prPlayBtnSvg.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
        prPlayBtn.style.backgroundColor = 'var(--spidey-red)';
      } else {
        prPlayBtnSvg.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
        prPlayBtn.style.backgroundColor = 'var(--text-white)';
      }
    }
  },

  handleTimeUpdate() {
    const audio = document.getElementById('global-html5-audio');
    const currentText = document.getElementById('bottom-time-current');
    const totalText = document.getElementById('bottom-time-total');
    const progressFill = document.getElementById('bottom-progress-fill');

    if (!audio || !audio.duration) return;

    const cur = audio.currentTime;
    const dur = audio.duration;
    const pct = (cur / dur) * 100;

    const curStr = `${Math.floor(cur / 60)}:${String(Math.floor(cur % 60)).padStart(2, '0')}`;
    const durStr = `${Math.floor(dur / 60)}:${String(Math.floor(dur % 60)).padStart(2, '0')}`;

    if (currentText) currentText.innerText = curStr;
    if (totalText) totalText.innerText = durStr;
    if (progressFill) progressFill.style.width = `${pct}%`;
    
    // Player Room Sync
    const prCur = document.getElementById('pr-time-current');
    const prTot = document.getElementById('pr-time-total');
    const prFill = document.getElementById('pr-progress-fill');
    if (prCur) prCur.innerText = curStr;
    if (prTot) prTot.innerText = durStr;
    if (prFill) prFill.style.width = `${pct}%`;
  },

  handleEnded() {
    this.playNext();
  },

  debounceSearch(event) {
    clearTimeout(PlayerEngine.debounceTimeout);
    const query = event.target.value.trim();
    
    // Automatically navigate to search if we aren't there
    if (window.Router.activePage !== 'search') {
      window.Router.navigate('search');
    }
    
    PlayerEngine.debounceTimeout = setTimeout(() => {
      window.UI.executeDebouncedQuery(query);
    }, 350);
  }
};

const Router = {
  activePage: 'dashboard',

  init() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const page = link.getAttribute('data-page');
        this.navigate(page);
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      this.handleAuthCallback(code, state);
    } else {
      this.bootstrapApp();
    }
    
    // Hook up global search input
    const searchInp = document.getElementById('global-search-input');
    if (searchInp) {
      searchInp.addEventListener('input', window.PlayerEngine.debounceSearch);
    }
  },

  async handleAuthCallback(code, state) {
    const landing = document.getElementById('landing-view');
    if (landing) {
      landing.style.display = 'block';
      landing.innerHTML = window.UI.renderLoading();
    }
    try {
      await window.Auth.handleCallback(code, state);
      window.history.replaceState({}, document.title, "/");
      this.bootstrapApp();
    } catch (e) {
      console.error(e);
      if (landing) landing.innerHTML = window.UI.renderError('Authentication Failure', e.message, 'Retry', 'window.Auth.login()');
    }
  },

  async bootstrapApp() {
    const landing = document.getElementById('landing-view');
    const main = document.getElementById('main-layout');

    const isLoggedIn = await window.Auth.checkTokenValidity();
    const isDemo = window.SpotifyAPI.isDemoMode();

    if (!isLoggedIn && !isDemo) {
      if (main) main.style.display = 'none';
      if (landing) {
        landing.style.display = 'block';
        landing.innerHTML = window.UI.renderLandingView ? window.UI.renderLandingView() : `<div style="text-align:center; padding:100px;"><h2>Login Required</h2><button onclick="window.Auth.login()">Login</button></div>`;
      }
    } else {
      if (landing) landing.style.display = 'none';
      if (main) main.style.display = 'flex';
      
      // Load user profile for the header
      try {
        const profile = await window.SpotifyAPI.getMe();
        const headerName = document.getElementById('user-display-name');
        const headerAvatar = document.getElementById('user-avatar-header');
        if (headerName) headerName.innerText = profile.display_name;
        if (headerAvatar && profile.images && profile.images[0]) headerAvatar.src = profile.images[0].url;
      } catch(e) { console.warn("Failed to load header profile", e); }
      
      // Initialize Spotify SDK if logged in
      if (isLoggedIn) {
          window.PlayerEngine.initSpotifySDK();
      }

      this.navigate(this.activePage);
    }
  },

  async navigate(page) {
    const viewport = document.getElementById('content-viewport');
    if (!viewport) return;

    this.activePage = page;

    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      if (link.getAttribute('data-page') === page) link.classList.add('active');
      else link.classList.remove('active');
    });

    switch(page) {
      case 'dashboard':
        await window.UI.renderHome(viewport);
        break;
      case 'universes':
        await window.UI.renderUniverses(viewport);
        break;
      case 'playlists':
        await window.UI.renderPlaylists(viewport);
        break;
      case 'recent':
        await window.UI.renderRecentJump(viewport);
        break;
      case 'search':
        window.UI.renderSearch(viewport);
        // Pre-fill if there is text in global search
        const q = document.getElementById('global-search-input')?.value;
        if(q) window.UI.executeDebouncedQuery(q);
        break;
      case 'player':
        await window.UI.renderPlayerRoom(viewport);
        break;
      case 'settings':
        window.UI.renderSettings(viewport);
        break;
      default:
        await window.UI.renderHome(viewport);
    }

    this.setupSeekBars();
  },
  
  setupSeekBars() {
    const pBar = document.getElementById('bottom-progress-bar');
    if (pBar) {
      pBar.addEventListener('click', (e) => {
        const audio = document.getElementById('global-html5-audio');
        if (!audio || !audio.duration) return;
        const rect = pBar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        
        if (window.PlayerEngine.isPremium && window.PlayerEngine.spotifyPlayer) {
          // SDK Seek (Wait, SDK seek needs duration, handled similarly)
          // For simplicity, we just seek HTML5 if not premium. Seeking SDK requires state duration.
        } else {
            audio.currentTime = pct * audio.duration;
        }
      });
    }
  }
};

window.PlayerEngine = PlayerEngine;
window.Router = Router;

document.addEventListener('DOMContentLoaded', () => {
  window.Router.init();
});
