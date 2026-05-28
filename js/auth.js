// SpideyVerse FM Spotify PKCE Authentication Controller

const Auth = {
  // Generate a random string of high entropy for state and code verifier
  generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(values)
      .map((x) => possible[x % possible.length])
      .join('');
  },

  // Base64-URL encode array buffer
  base64urlEncode(buffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  },

  // Generate Code Challenge for PKCE (SHA-256)
  async generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return this.base64urlEncode(digest);
  },

  // Trigger secure login redirect using PKCE Authorization Code Flow
  async login() {
    const clientId = window.CONFIG.getClientId();
    if (!clientId || clientId === 'YOUR_SPOTIFY_CLIENT_ID_HERE') {
      alert('Error: Please configure your Spotify Client ID in .env.local or UI Settings!');
      return;
    }

    const state = this.generateRandomString(16);
    const codeVerifier = this.generateRandomString(64);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    
    // Save state and verifier locally to complete auth later
    localStorage.setItem('spidey_auth_state', state);
    localStorage.setItem('spidey_code_verifier', codeVerifier);

    // Build standard OAuth authorize URL parameters
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: window.CONFIG.getRedirectUri(),
      state: state,
      scope: window.CONFIG.SCOPES.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    // Redirect to Spotify Auth Portal
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  },

  // Exchange auth code directly with Spotify (No Backend Needed for PKCE)
  async handleCallback(code, state) {
    const savedState = localStorage.getItem('spidey_auth_state');
    const codeVerifier = localStorage.getItem('spidey_code_verifier');

    // Verify state matches to prevent CSRF attacks
    if (!state || state !== savedState) {
      throw new Error('State mismatch error: Possible CSRF attack detected.');
    }

    if (!codeVerifier) {
      throw new Error('Code verifier missing. Login flow was interrupted.');
    }

    const clientId = window.CONFIG.getClientId();

    const payload = new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: window.CONFIG.getRedirectUri(),
      code_verifier: codeVerifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('PKCE Token exchange failed:', errBody);
      throw new Error('Failed to exchange authorization code via PKCE.');
    }

    const data = await response.json();
    this.saveTokens(data);

    // Clean up temporary auth data
    localStorage.removeItem('spidey_auth_state');
    localStorage.removeItem('spidey_code_verifier');
  },

  // Refresh the access token using the refresh_token via PKCE
  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('spidey_refresh_token');
    const clientId = window.CONFIG.getClientId();

    if (!refreshToken) {
      this.logout();
      return;
    }

    const payload = new URLSearchParams({
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload
    });

    if (!response.ok) {
      console.warn('Secure refresh token is expired or revoked. Logging out.');
      this.logout();
      return;
    }

    const data = await response.json();
    // Spotify does not always return a new refresh token on refresh
    if (!data.refresh_token) {
        data.refresh_token = refreshToken;
    }
    this.saveTokens(data);
  },

  // Save tokens to local storage with calculations for expiry times
  saveTokens(data) {
    localStorage.setItem('spidey_access_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('spidey_refresh_token', data.refresh_token);
    }
    // Set absolute expiration timestamp (current time + expires_in seconds)
    const expiresAt = Date.now() + data.expires_in * 1000;
    localStorage.setItem('spidey_token_expires_at', expiresAt);
  },

  // Verify and proactively refresh token if close to expiry
  async checkTokenValidity() {
    const accessToken = localStorage.getItem('spidey_access_token');
    const expiresAt = localStorage.getItem('spidey_token_expires_at');

    if (!accessToken || !expiresAt) {
      return false;
    }

    // Refresh token if within 5 minutes of expiring
    const timeRemaining = parseInt(expiresAt) - Date.now();
    if (timeRemaining < 5 * 60 * 1000) {
      console.log('Access token expiring soon, refreshing securely now...');
      await this.refreshAccessToken();
    }
    return true;
  },

  // Return the active Access Token
  getAccessToken() {
    return localStorage.getItem('spidey_access_token');
  },

  // Clear session
  logout() {
    localStorage.removeItem('spidey_access_token');
    localStorage.removeItem('spidey_refresh_token');
    localStorage.removeItem('spidey_token_expires_at');
    localStorage.removeItem('spidey_auth_state');
    localStorage.removeItem('spidey_code_verifier');
    
    // Redirect to Landing Page Route (handled by SPA router)
    window.location.href = '/';
  }
};

window.Auth = Auth;
