// SpideyVerse FM Spotify API Wrapper Client

const SpotifyAPI = {
  // Checks if the client is currently running in offline Demo Mode
  isDemoMode() {
    return localStorage.getItem('spidey_demo_mode') === 'true' || !window.Auth.getAccessToken();
  },

  // Perform standard fetch request with authorization token and automatic token refresh
  async fetchWithAuth(url, options = {}) {
    if (this.isDemoMode()) {
      throw new Error('Running in Demo Mode. Real API requests are bypassed.');
    }

    // Proactively verify token and refresh if needed before sending request
    await window.Auth.checkTokenValidity();

    const accessToken = window.Auth.getAccessToken();
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    let response = await fetch(url, { ...options, headers });

    // Handle token expiration / session invalidation
    if (response.status === 401) {
      console.warn('API returned 401 Unauthorized. Retrying after token refresh...');
      await window.Auth.refreshAccessToken();
      const newAccessToken = window.Auth.getAccessToken();
      headers['Authorization'] = `Bearer ${newAccessToken}`;
      response = await fetch(url, { ...options, headers });
    }

    // Handle developer quota limitations
    if (response.status === 403) {
      throw new Error('API Access Denied (403): Your Spotify account may not be whitelisted in the developer dashboard, or scopes are missing. Please enable Demo Mode in Settings to explore the site with rich preloaded data.');
    }

    // Handle rate-limits
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 5;
      throw new Error(`Rate limit exceeded (429). Please try again in ${retryAfter} seconds.`);
    }

    if (!response.ok) {
      throw new Error(`Spotify API request failed with status: ${response.status}`);
    }

    // Handle 204 No Content (such as no active playback)
    if (response.status === 204) {
      return null;
    }

    return response.json();
  },

  // API Methods
  async getMe() {
    if (this.isDemoMode()) {
      return this.getMockProfile();
    }
    return this.fetchWithAuth('https://api.spotify.com/v1/me');
  },

  async getTopTracks(timeRange = 'medium_term') {
    if (this.isDemoMode()) {
      return this.getMockTopTracks();
    }
    return this.fetchWithAuth(`https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=${timeRange}`);
  },

  async getTopArtists(timeRange = 'medium_term') {
    if (this.isDemoMode()) {
      return this.getMockTopArtists();
    }
    return this.fetchWithAuth(`https://api.spotify.com/v1/me/top/artists?limit=12&time_range=${timeRange}`);
  },

  async getRecentlyPlayed() {
    if (this.isDemoMode()) {
      return this.getMockRecentlyPlayed();
    }
    return this.fetchWithAuth('https://api.spotify.com/v1/me/player/recently-played?limit=20');
  },

  async getPlaylists() {
    if (this.isDemoMode()) {
      return this.getMockPlaylists();
    }
    return this.fetchWithAuth('https://api.spotify.com/v1/me/playlists?limit=15');
  },

  async getPlaylistTracks(playlistId) {
    if (this.isDemoMode()) {
      return this.getMockPlaylistTracks(playlistId);
    }
    return this.fetchWithAuth(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=30`);
  },

  async getCurrentlyPlaying() {
    if (this.isDemoMode()) {
      return this.getMockCurrentlyPlaying();
    }
    try {
      return await this.fetchWithAuth('https://api.spotify.com/v1/me/player/currently-playing');
    } catch (e) {
      console.warn('Could not load current playing track, falling back to mock or empty', e);
      return null;
    }
  },

  // Spotify Search Tracks API integration
  async searchTracks(query) {
    if (this.isDemoMode()) {
      return this.getMockSearchTracks(query);
    }
    return this.fetchWithAuth(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=24`);
  },

  // iTunes Search API Fallback for 30-second audio previews
  async fetchiTunesPreview(trackName, artistName) {
    try {
      const query = `${trackName} ${artistName}`;
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`;
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].previewUrl || null;
      }
      return null;
    } catch (e) {
      console.warn('iTunes fallback preview search failed:', e);
      return null;
    }
  },

  // High-fidelity Mock Data Generators for offline testing and developer showcases
  getMockProfile() {
    return {
      display_name: 'Miles Morales',
      email: 'miles.morales@brooklyn.vision',
      id: 'miles_morales_1610',
      images: [
        { url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&auto=format&fit=crop&q=80' }
      ],
      product: 'premium',
      country: 'US'
    };
  },

  getMockTopArtists() {
    return {
      items: [
        { id: '1', name: 'Post Malone', genres: ['rap', 'pop'], images: [{ url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&auto=format&fit=crop&q=80' }] },
        { id: '2', name: 'Metro Boomin', genres: ['hip hop', 'rap'], images: [{ url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80' }] },
        { id: '3', name: 'Swae Lee', genres: ['melodic rap', 'pop'], images: [{ url: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=200&auto=format&fit=crop&q=80' }] },
        { id: '4', name: 'Lil Uzi Vert', genres: ['trap', 'hip hop'], images: [{ url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80' }] },
        { id: '5', name: 'Daft Punk', genres: ['electronic', 'synthpop'], images: [{ url: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=200&auto=format&fit=crop&q=80' }] },
        { id: '6', name: 'Arctic Monkeys', genres: ['indie rock', 'garage rock'], images: [{ url: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=200&auto=format&fit=crop&q=80' }] },
        { id: '7', name: 'SZA', genres: ['pop', 'rnb'], images: [{ url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&auto=format&fit=crop&q=80' }] },
        { id: '8', name: 'Vince Staples', genres: ['hip hop', 'underground rap'], images: [{ url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80' }] }
      ]
    };
  },

  getMockTopTracks() {
    return {
      items: [
        {
          id: 't1',
          name: 'Sunflower',
          duration_ms: 158000,
          preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Free audio sample for mockup
          album: {
            name: 'Spider-Man: Into the Spider-Verse',
            images: [{ url: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=300&auto=format&fit=crop&q=80' }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/3vG61z1tHkSpCACx5zSnp3' },
          artists: [{ name: 'Post Malone' }, { name: 'Swae Lee' }]
        },
        {
          id: 't2',
          name: "What's Up Danger",
          duration_ms: 182000,
          preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          album: {
            name: 'Spider-Man: Into the Spider-Verse',
            images: [{ url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80' }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/5548Z57ZtXwD2zZ5o16010' },
          artists: [{ name: 'Blackway' }, { name: 'Black Caviar' }]
        },
        {
          id: 't3',
          name: 'Am I Dreaming',
          duration_ms: 213000,
          preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          album: {
            name: 'Spider-Man: Across the Spider-Verse',
            images: [{ url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80' }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/6K4t31J02eR270402eR201' },
          artists: [{ name: 'Metro Boomin' }, { name: 'A$AP Rocky' }, { name: 'Roisee' }]
        },
        {
          id: 't4',
          name: 'Hummingbird',
          duration_ms: 180000,
          preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
          album: {
            name: 'Spider-Man: Across the Spider-Verse',
            images: [{ url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80' }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/40t31J02eR270402eR202' },
          artists: [{ name: 'Metro Boomin' }, { name: 'James Blake' }]
        },
        {
          id: 't5',
          name: 'Harder, Better, Faster, Stronger',
          duration_ms: 224000,
          preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
          album: {
            name: 'Discovery',
            images: [{ url: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&auto=format&fit=crop&q=80' }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/54t31J02eR270402eR203' },
          artists: [{ name: 'Daft Punk' }]
        },
        {
          id: 't6',
          name: 'Do I Wanna Know?',
          duration_ms: 272000,
          preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
          album: {
            name: 'AM',
            images: [{ url: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=300&auto=format&fit=crop&q=80' }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/64t31J02eR270402eR204' },
          artists: [{ name: 'Arctic Monkeys' }]
        },
        {
          id: 't7',
          name: 'Kill Bill',
          duration_ms: 153000,
          preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
          album: {
            name: 'SOS',
            images: [{ url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&auto=format&fit=crop&q=80' }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/74t31J02eR270402eR205' },
          artists: [{ name: 'SZA' }]
        }
      ]
    };
  },

  getMockRecentlyPlayed() {
    return {
      items: [
        {
          played_at: new Date(Date.now() - 4 * 60 * 1000).toISOString(), // 4 mins ago
          track: this.getMockTopTracks().items[2]
        },
        {
          played_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
          track: this.getMockTopTracks().items[0]
        },
        {
          played_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          track: this.getMockTopTracks().items[1]
        },
        {
          played_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          track: this.getMockTopTracks().items[3]
        },
        {
          played_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          track: this.getMockTopTracks().items[4]
        },
        {
          played_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          track: this.getMockTopTracks().items[5]
        }
      ]
    };
  },

  getMockPlaylists() {
    return {
      items: [
        { id: 'pl1', name: 'Web-Slinging Beats', tracks: { total: 42 }, images: [{ url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&auto=format&fit=crop&q=80' }] },
        { id: 'pl2', name: 'Neon Gwen Sessions', tracks: { total: 28 }, images: [{ url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80' }] },
        { id: 'pl3', name: 'Spider-Punk Anthems', tracks: { total: 19 }, images: [{ url: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=200&auto=format&fit=crop&q=80' }] },
        { id: 'pl4', name: 'Noir Detective Moods', tracks: { total: 35 }, images: [{ url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80' }] },
        { id: 'pl5', name: 'Daily Bugle Reports', tracks: { total: 8 }, images: [{ url: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=200&auto=format&fit=crop&q=80' }] }
      ]
    };
  },

  getMockPlaylistTracks(playlistId) {
    const allTracks = this.getMockTopTracks().items;
    let playlistTracks = [];
    
    if (playlistId === 'pl1') {
      playlistTracks = [allTracks[0], allTracks[1], allTracks[2], allTracks[3]];
    } else if (playlistId === 'pl2') {
      playlistTracks = [allTracks[2], allTracks[3], allTracks[6]];
    } else if (playlistId === 'pl3') {
      playlistTracks = [allTracks[4], allTracks[5]];
    } else if (playlistId === 'pl4') {
      playlistTracks = [allTracks[5], allTracks[0]];
    } else {
      playlistTracks = [allTracks[6], allTracks[1]];
    }

    return {
      items: playlistTracks.map((track) => ({ track }))
    };
  },

  getMockCurrentlyPlaying() {
    const track = this.getMockTopTracks().items[0];
    return {
      is_playing: true,
      progress_ms: 78000,
      item: track
    };
  },

  getMockSearchTracks(query) {
    const allItems = this.getMockTopTracks().items;
    const filtered = allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.artists.some(a => a.name.toLowerCase().includes(query.toLowerCase()))
    );
    // If no filtered results match, return a preloaded search batch
    return {
      tracks: {
        items: filtered.length > 0 ? filtered : allItems
      }
    };
  }
};

window.SpotifyAPI = SpotifyAPI;
