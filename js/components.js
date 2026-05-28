// Spiderfy UI Components Library (Next-Gen Restructure)

const UI = {
  renderLandingView() {
    return `
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; overflow: hidden; background: var(--bg-dark); font-family: var(--font-sans); z-index: 9999;">
        
        <!-- Fake Sidebar (Teaser) -->
        <div style="position: absolute; left: 0; top: 0; width: 260px; height: 100%; background: #07090F; border-right: 1px solid rgba(255,255,255,0.05); padding: 24px 16px; opacity: 0.4; filter: blur(6px); pointer-events: none;">
          <div style="margin-bottom: 36px; padding-left: 4px; display: flex; align-items: center;">
            <img src="images/logo.png" alt="Spiderfy" style="height: 52px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 0 10px rgba(255, 0, 85, 0.3)); opacity: 0.9;">
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="height:24px; background:rgba(255,255,255,0.1); border-radius:4px; width:80%;"></div>
            <div style="height:24px; background:rgba(255,255,255,0.05); border-radius:4px; width:90%;"></div>
            <div style="height:24px; background:rgba(255,255,255,0.05); border-radius:4px; width:70%;"></div>
            <div style="height:24px; background:rgba(255,255,255,0.05); border-radius:4px; width:85%;"></div>
          </div>
        </div>

        <!-- Fake Main Content (Image 1 Replica Teaser) -->
        <div style="position: absolute; left: 260px; top: 0; right: 0; bottom: 0; padding: 40px; opacity: 0.3; filter: blur(10px); pointer-events: none; overflow: hidden;">
          <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 24px; margin-bottom: 32px;">
            <!-- Active Identity Fake -->
            <div style="background: radial-gradient(circle at 100% 50%, rgba(230, 0, 76, 0.15) 0%, #151A2C 60%); border-radius: 12px; padding: 32px;">
              <span style="font-size: 0.75rem; color: var(--spidey-red); font-weight: bold;">ACTIVE IDENTITY</span>
              <h1 style="font-size: 2.5rem; font-weight: 800; margin: 8px 0 16px 0; color: white;">Miles Morales</h1>
              <p style="color: rgba(255,255,255,0.5); font-size: 0.95rem; max-width: 400px;">Your universe of sound. High-energy hip-hop, vivid stories, and limitless creativity.</p>
            </div>
            <!-- Featured Playlist Fake -->
            <div style="background: radial-gradient(circle at 0% 0%, rgba(0, 204, 255, 0.1) 0%, #151A2C 70%); border-radius: 12px; padding: 24px; display: flex; gap: 20px;">
              <div style="flex-grow: 1;">
                <span style="font-size: 0.75rem; color: var(--electric-blue); font-weight: bold;">FEATURED PLAYLIST</span>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 8px 0 12px 0; color: white;">Brooklyn Street Pulse</h3>
                <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">Booming 808s, rapid-fire flows, and street anthems.</p>
              </div>
              <div style="width: 120px; height: 120px; background: rgba(255,255,255,0.1); border-radius: 8px;"></div>
            </div>
          </div>
          <!-- Now Playing Fake -->
          <div style="background: #151A2C; border-radius: 12px; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.1);"></div>
              <div>
                <span style="font-size: 0.7rem; color: var(--electric-blue); font-weight: bold;">NOW PLAYING</span>
                <h4 style="font-size: 1.2rem; font-weight: 600; color: white; margin-top: 4px;">Sunflower</h4>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5);">Post Malone, Swae Lee</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; height: 32px;">
              ${Array(30).fill().map(() => '<div style="width:3px; background:var(--electric-blue); height: ' + (Math.random()*24 + 4) + 'px; border-radius:2px;"></div>').join('')}
            </div>
          </div>
        </div>

        <!-- Center Login Modal -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; width: 100%; max-width: 480px; text-align: center; padding: 48px; background: rgba(11, 15, 25, 0.7); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.08); border-radius: 32px; box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03) inset;">
          
          <img src="images/logo.png" alt="Spiderfy Logo" style="height: 80px; max-width: 100%; object-fit: contain; margin: 0 auto 32px auto; display: block; filter: drop-shadow(0 8px 24px rgba(230, 0, 76, 0.3));">
          <p style="color: var(--text-gray); font-size: 1.1rem; margin-bottom: 40px; line-height: 1.5;">Your sound. Your story.<br>Enter the multiverse of music.</p>
          
          <button onclick="window.Auth.login()" class="hover-scale" style="width: 100%; padding: 18px; border-radius: 30px; font-size: 1.1rem; font-weight: 600; background: white; color: black; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 10px 20px rgba(255,255,255,0.1);">
            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: currentColor;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
            Connect with Spotify
          </button>
          
          <div style="margin-top: 32px; font-size: 0.8rem; color: var(--text-dim); display: flex; align-items: center; justify-content: center; gap: 8px;">
            <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor; fill: none;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Secure connection via OAuth 2.0
          </div>
          
          <button onclick="localStorage.setItem('spidey_demo_mode', 'true'); window.location.reload();" style="margin-top: 24px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: var(--text-gray); padding: 8px 16px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='white'; this.style.borderColor='white'" onmouseout="this.style.color='var(--text-gray)'; this.style.borderColor='rgba(255,255,255,0.2)'">
            Skip to Offline Demo Mode
          </button>
        </div>
      </div>
    `;
  },

  renderLoading() {
    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div class="skeleton-loading" style="height: 48px; width: 60%; border-radius: var(--border-radius-sm);"></div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
          ${Array(6).fill().map(() => `
            <div class="glass-card skeleton-loading" style="height: 120px;"></div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderError(title, message, btnText = 'Retry', action = 'window.Router.navigate("dashboard")') {
    return `
      <div class="glass-card" style="max-width: 500px; margin: 40px auto; text-align: center; border-color: var(--spidey-red);">
        <h3 style="font-size: 1.5rem; color: var(--spidey-red); margin-bottom: 12px;">${title}</h3>
        <p style="color: var(--text-gray); margin-bottom: 24px;">${message}</p>
        <button class="btn-primary" onclick="${action}">${btnText}</button>
      </div>
    `;
  },

  // 1. DASHBOARD
  async renderHome(viewport) {
    viewport.innerHTML = this.renderLoading();
    try {
      const [topTracks, topArtists, recent, currentPlaying] = await Promise.all([
        window.SpotifyAPI.getTopTracks(),
        window.SpotifyAPI.getTopArtists(),
        window.SpotifyAPI.getRecentlyPlayed(),
        window.SpotifyAPI.getCurrentlyPlaying()
      ]);

      const name = document.getElementById('user-display-name')?.innerText || 'Miles Morales';

      // Horizontal recently played
      let recentHtml = '';
      if (recent && recent.items) {
        recent.items.slice(0, 5).forEach((item) => {
          const track = item.track;
          recentHtml += `
            <div class="glass-card hover-scale" style="min-width: 180px; padding: 12px; cursor: pointer; flex: 0 0 auto;" onclick="window.UI.openTrackModal('${track.id}', '${track.name.replace(/'/g, "\\'")}', '${track.artists.map(a => a.name).join(', ').replace(/'/g, "\\'")}', '${track.album?.images[0]?.url || ''}', '${track.preview_url || ''}')">
              <img src="${track.album?.images[0]?.url}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; margin-bottom: 12px;">
              <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${track.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-gray); margin-top: 4px;">${track.artists[0].name}</div>
            </div>
          `;
        });
      }

      // Horizontal recommended
      let recHtml = '';
      if (topTracks && topTracks.items) {
        topTracks.items.slice(0, 5).forEach((track) => {
          recHtml += `
            <div class="glass-card hover-scale" style="min-width: 180px; padding: 12px; cursor: pointer; flex: 0 0 auto;" onclick="window.UI.openTrackModal('${track.id}', '${track.name.replace(/'/g, "\\'")}', '${track.artists.map(a => a.name).join(', ').replace(/'/g, "\\'")}', '${track.album?.images[0]?.url || ''}', '${track.preview_url || ''}')">
              <img src="${track.album?.images[0]?.url}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; margin-bottom: 12px; opacity: 0.8;">
              <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${track.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-gray); margin-top: 4px;">${track.artists[0].name}</div>
            </div>
          `;
        });
      }

      // Top Artists
      let artistHtml = '';
      if (topArtists && topArtists.items) {
        topArtists.items.slice(0, 7).forEach((artist) => {
          artistHtml += `
            <div class="hover-scale" style="display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100px;">
              <img src="${artist.images[0]?.url}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--spidey-red);">
              <div style="font-size: 0.8rem; font-weight: 600; text-align: center; color: var(--text-white);">${artist.name}</div>
            </div>
          `;
        });
      }

      viewport.innerHTML = `
        <div class="page-container page-transition-enter">
          
          <!-- Top Hero Section -->
          <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 24px; margin-bottom: 32px; max-width: 1100px; margin-left: auto; margin-right: auto;">
            
            <!-- Active Identity -->
            <div style="position: relative; overflow: hidden; border-radius: 16px; border: 2.5px solid transparent; background: linear-gradient(#0c0f19, #0c0f19) padding-box, linear-gradient(135deg, #ff0055 0%, #bc00dd 50%, #00ccff 100%) border-box; padding: 32px; min-height: 280px; display: flex; align-items: center; box-shadow: 0 0 20px rgba(255, 0, 85, 0.25), 0 0 40px rgba(0, 204, 255, 0.2), 0 10px 30px rgba(0,0,0,0.6); height: 100%;">
              <!-- Crop out the baked-in straight borders from active_identity_bg.png -->
              <div style="position: absolute; top: -16px; left: -16px; right: -16px; bottom: -16px; background-image: url('/images/active_identity_bg.png'); background-size: 100% 115%; background-position: center; background-repeat: no-repeat; z-index: 1; pointer-events: none;"></div>
              
              <div style="position: relative; z-index: 5; width: 100%;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <div style="width: 6px; height: 6px; background-color: var(--spidey-red); border-radius: 50%; box-shadow: 0 0 8px var(--spidey-red);"></div>
                  <span style="font-size: 0.75rem; color: var(--spidey-red); font-weight: bold; letter-spacing: 2px;">ACTIVE IDENTITY</span>
                </div>
                <h1 style="font-size: 2.8rem; font-weight: 800; margin: 0 0 12px 0; letter-spacing: -1px;">${name}</h1>
                
                <div style="width: 50px; height: 3px; background: linear-gradient(90deg, var(--spidey-red), var(--electric-blue)); margin-bottom: 16px; border-radius: 2px;"></div>
                
                <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; max-width: 380px; line-height: 1.5; margin-bottom: 24px;">Your universe of sound. High-energy hip-hop, vivid stories, and limitless creativity.</p>
                
                <div style="display: grid; grid-template-columns: auto auto; gap: 12px; justify-content: start;">
                  <div style="display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 24px; background: rgba(255,255,255,0.03); backdrop-filter: blur(4px);">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: var(--spidey-red);"><path d="M12 3v18M8 8v8M4 11v2M16 6v12M20 10v4" stroke="var(--spidey-red)" stroke-width="2" stroke-linecap="round"/></svg>
                    <span style="font-size: 0.75rem; font-weight: 500;">Booming 808 Bass</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 24px; background: rgba(255,255,255,0.03); backdrop-filter: blur(4px);">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: none; stroke: #fff;" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 9l-15 15-4.5-4.5 15-15a3.5 3.5 0 014.95 4.95z"></path></svg>
                    <span style="font-size: 0.75rem; font-weight: 500;">Graffiti Stencils</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 24px; background: rgba(255,255,255,0.03); backdrop-filter: blur(4px);">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: #a855f7;"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    <span style="font-size: 0.75rem; font-weight: 500;">Urban Soundtracks</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 24px; background: rgba(255,255,255,0.03); backdrop-filter: blur(4px);">
                    <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: none; stroke: var(--electric-blue);" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                    <span style="font-size: 0.75rem; font-weight: 500;">Unrestrained Leaps</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Featured Playlist -->
            <div class="glass-card" style="padding: 24px; display: flex; gap: 20px; align-items: center; background: radial-gradient(circle at 0% 0%, rgba(0, 204, 255, 0.1) 0%, transparent 70%);">
              <div style="flex-grow: 1;">
                <span style="font-size: 0.75rem; color: var(--electric-blue); font-weight: bold; letter-spacing: 1px;">FEATURED PLAYLIST</span>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 8px 0 12px 0;">Brooklyn Street Pulse</h3>
                <p style="color: var(--text-gray); font-size: 0.85rem; line-height: 1.4; margin-bottom: 16px;">Booming 808s, rapid-fire flows, and street anthems that power your web-lines.</p>
                <div style="display: flex; gap: 12px; align-items: center;">
                  <button class="btn-primary" onclick="window.Router.navigate('playlists')">
                    <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Play Now
                  </button>
                  <span style="font-size: 0.75rem; color: var(--text-dim);">24 tracks • 1h 26m</span>
                </div>
              </div>
              <img src="/images/brooklyn_street_pulse.png" style="width: 140px; height: 140px; border-radius: 8px; object-fit: cover; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
            </div>
          </div>

          <!-- Now Playing Inline Visualizer -->
          <div class="glass-card" style="margin-bottom: 32px; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <div style="position: relative;">
                <img id="dash-np-art" src="${currentPlaying?.item?.album?.images[0]?.url || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=80&auto=format&fit=crop&q=80'}" style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--electric-blue);">
                <div style="position: absolute; top: -4px; right: -4px; width: 16px; height: 16px; background: var(--electric-blue); border-radius: 50%; border: 2px solid var(--bg-card);"></div>
              </div>
              <div>
                <span style="font-size: 0.7rem; color: var(--electric-blue); font-weight: bold; letter-spacing: 1px;">NOW PLAYING</span>
                <h4 style="font-size: 1.2rem; font-weight: 600; margin-top: 4px;" id="dash-np-title">${currentPlaying?.item?.name || 'Sunflower'}</h4>
                <p style="font-size: 0.85rem; color: var(--text-gray);" id="dash-np-artist">${currentPlaying?.item?.artists?.map(a => a.name).join(', ') || 'Post Malone, Swae Lee'}</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 4px; height: 32px;">
              ${Array(30).fill().map(() => `<div class="eq-bar" style="height: ${Math.random()*24 + 4}px; animation-duration: ${Math.random()*0.5 + 0.5}s;"></div>`).join('')}
            </div>
            
            <button class="btn-outline" onclick="window.Router.navigate('player')">Open Player Room</button>
          </div>

          <!-- Horizontal Lists -->
          <div style="margin-bottom: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
              <h2 style="font-size: 1.2rem; font-weight: 600;">Recently Played</h2>
              <span style="font-size: 0.8rem; color: var(--text-gray); cursor: pointer;">View all</span>
            </div>
            <div style="display: flex; gap: 20px; overflow-x: auto; padding-bottom: 16px;">
              ${recentHtml}
            </div>
          </div>

          <div style="margin-bottom: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
              <h2 style="font-size: 1.2rem; font-weight: 600;">Recommended Playlists</h2>
              <span style="font-size: 0.8rem; color: var(--text-gray); cursor: pointer;">View all</span>
            </div>
            <div style="display: flex; gap: 20px; overflow-x: auto; padding-bottom: 16px;">
              ${recHtml}
            </div>
          </div>

          <!-- Top Artists -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
              <h2 style="font-size: 1.2rem; font-weight: 600;">Top Artists</h2>
              <span style="font-size: 0.8rem; color: var(--text-gray); cursor: pointer;">View all</span>
            </div>
            <div style="display: flex; gap: 24px; overflow-x: auto; padding-bottom: 16px;">
              ${artistHtml}
            </div>
          </div>

        </div>
      `;

      // Sync the dash NP with bottom player
      const npTitle = document.getElementById('dash-np-title');
      const npArtist = document.getElementById('dash-np-artist');
      const npArt = document.getElementById('dash-np-art');
      const bTitle = document.getElementById('bottom-track-title');
      const bArtist = document.getElementById('bottom-track-artist');
      const bArt = document.getElementById('bottom-album-art');
      if (npTitle && bTitle) npTitle.innerText = bTitle.innerText;
      if (npArtist && bArtist) npArtist.innerText = bArtist.innerText;
      if (npArt && bArt) npArt.src = bArt.src;

    } catch(e) {
      viewport.innerHTML = this.renderError('Dashboard Error', e.message);
    }
  },

  // 2. MY UNIVERSES
  async renderUniverses(viewport) {
    viewport.innerHTML = this.renderLoading();
    // Simulate loading a mix of playlists/albums as "Universes"
    try {
      const topTracks = await window.SpotifyAPI.getTopTracks();
      let gridHtml = '';
      if(topTracks && topTracks.items) {
        topTracks.items.slice(0, 8).forEach(t => {
          gridHtml += `
            <div class="glass-card hover-scale" style="padding: 16px;">
              <img src="${t.album.images[0]?.url}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 4px;">${t.name} Dimension</h3>
              <p style="font-size: 0.8rem; color: var(--text-gray); line-height: 1.4; margin-bottom: 16px;">Cinematic, immersive soundscapes. Late nights in another dimension.</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-dim);">${Math.floor(Math.random()*30 + 10)} tracks</span>
                <button class="btn-outline" style="padding: 4px 12px; font-size: 0.75rem;" onclick="window.UI.openTrackModal('${t.id}', '${t.name.replace(/'/g, "\\'")}', '${t.artists.map(a => a.name).join(', ').replace(/'/g, "\\'")}', '${t.album?.images[0]?.url || ''}', '${t.preview_url || ''}')">Explore</button>
              </div>
            </div>
          `;
        });
      }

      viewport.innerHTML = `
        <div class="page-container page-transition-enter" style="display: grid; grid-template-columns: 1fr 300px; gap: 32px;">
          
          <div>
            <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 8px;">My Universes</h1>
            <p style="color: var(--text-gray); font-size: 1rem; margin-bottom: 24px;">Your sound. Your story. Infinite universes.</p>
            
            <!-- Filters -->
            <div style="display: flex; gap: 12px; margin-bottom: 24px; overflow-x: auto;">
              <span class="btn-outline" style="background: rgba(255,255,255,0.1); border-color: transparent;">All Universes</span>
              <span class="btn-outline">Hip-Hop</span>
              <span class="btn-outline">Trap</span>
              <span class="btn-outline">R&B</span>
              <span class="btn-outline">Lo-Fi</span>
              <span class="btn-outline">Electro</span>
              <span class="btn-outline">Chill</span>
            </div>

            <!-- Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px;">
              ${gridHtml}
            </div>
          </div>

          <!-- Right Sidebar -->
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div class="glass-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 1rem; font-weight: 600;">My Identities</h3>
                <span style="font-size: 0.75rem; color: var(--electric-blue); cursor: pointer;">Manage</span>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px;">
                <div style="display: flex; gap: 12px; align-items: center;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--spidey-red); display: flex; align-items: center; justify-content: center;">WS</div>
                  <div style="flex-grow: 1;">
                    <div style="font-size: 0.9rem; font-weight: 600; color: var(--spidey-red);">Web Slinger</div>
                    <div style="font-size: 0.7rem; color: var(--text-gray);">Energetic • Fearless</div>
                  </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--neon-purple); display: flex; align-items: center; justify-content: center;">SC</div>
                  <div style="flex-grow: 1;">
                    <div style="font-size: 0.9rem; font-weight: 600;">Shadow Coder</div>
                    <div style="font-size: 0.7rem; color: var(--text-gray);">Focused • Calm</div>
                  </div>
                </div>
              </div>
              <button class="btn-outline" style="width: 100%; border-style: dashed;">+ Add New Identity</button>
            </div>

            <div class="glass-card">
              <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 16px;">Listening Moods</h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div class="btn-outline" style="text-align: left; padding: 12px;">Locked In<div style="font-size:0.7rem; color:var(--text-gray); margin-top:4px;">Focus • Flow • Grind</div></div>
                <div class="btn-outline" style="text-align: left; padding: 12px;">Late Night<div style="font-size:0.7rem; color:var(--text-gray); margin-top:4px;">Chill • Reflect • Unwind</div></div>
                <div class="btn-outline" style="text-align: left; padding: 12px;">Turnt Up<div style="font-size:0.7rem; color:var(--text-gray); margin-top:4px;">Energy • Hype</div></div>
              </div>
            </div>
          </div>
        </div>
      `;
    } catch(e) {
      viewport.innerHTML = this.renderError('Universes Error', e.message);
    }
  },

  // 3. PLAYLIST GALAXY
  async renderPlaylists(viewport) {
    viewport.innerHTML = this.renderLoading();
    try {
      const [topTracks, playlists] = await Promise.all([
        window.SpotifyAPI.getTopTracks(),
        window.SpotifyAPI.getPlaylists()
      ]);
      
      let gridHtml = '';
      if(playlists && playlists.items) {
        playlists.items.slice(0, 10).forEach(p => {
          gridHtml += `
            <div class="glass-card hover-scale" style="padding: 16px; cursor: pointer;" onclick="window.UI.renderPlaylistDetail('${p.id}')">
              <img src="${p.images?.[0]?.url || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&auto=format&fit=crop&q=80'}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; margin-bottom: 12px;">
              <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</h3>
              <p style="font-size: 0.8rem; color: var(--text-gray); line-height: 1.4; margin-bottom: 16px; height: 2.8em; overflow: hidden; text-overflow: ellipsis;">${p.description || 'A collection of dimensional sounds.'}</p>
              <span style="font-size: 0.75rem; color: var(--text-dim);">${p.tracks.total} tracks</span>
            </div>
          `;
        });
      }

      viewport.innerHTML = `
        <div class="page-container page-transition-enter">
          <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 8px;">Playlist Galaxy</h1>
          <p style="color: var(--text-gray); font-size: 1rem; margin-bottom: 24px;">Discover playlists for every dimension, mood, and moment.</p>
          
          <div style="display: flex; gap: 12px; margin-bottom: 32px; overflow-x: auto;">
            <span class="btn-outline" style="border-color: var(--neon-purple); color: var(--neon-purple);">For You</span>
            <span class="btn-outline">Focus</span>
            <span class="btn-outline">Chill</span>
            <span class="btn-outline">Energy</span>
            <span class="btn-outline">Hip-Hop</span>
            <span class="btn-outline">Night Drive</span>
          </div>

          <!-- Featured Banner -->
          <div class="glass-card" style="display: flex; gap: 32px; align-items: center; padding: 0; background: linear-gradient(90deg, rgba(188,0,221,0.1) 0%, rgba(11,15,25,1) 100%); margin-bottom: 40px; border: none;">
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80" style="width: 250px; height: 250px; object-fit: cover;">
            <div style="padding: 32px;">
              <span style="font-size: 0.75rem; color: var(--spidey-red); font-weight: bold; letter-spacing: 1px;">FEATURED PLAYLIST</span>
              <h2 style="font-size: 2.5rem; font-weight: 800; margin: 8px 0 16px 0;">Night Drive</h2>
              <p style="color: var(--text-gray); font-size: 1rem; max-width: 500px; margin-bottom: 24px;">Dark roads, neon lights, and heavy bass. Your late-night escape.</p>
              <div style="display: flex; gap: 12px; align-items: center;">
                <button class="btn-primary" style="background: #5555ff;">Play Now</button>
                <span style="font-size: 0.8rem; color: var(--text-dim);">58 tracks • 3h 42m</span>
              </div>
            </div>
          </div>

          <!-- Explore Grid -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
            <h2 style="font-size: 1.2rem; font-weight: 600;">Explore Playlists</h2>
            <span style="font-size: 0.8rem; color: var(--text-gray); cursor: pointer;">View all</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
            ${gridHtml}
          </div>

          <!-- Curated Mixes -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
            <h2 style="font-size: 1.2rem; font-weight: 600;">Your Top Mixes</h2>
            <span style="font-size: 0.8rem; color: var(--text-gray); cursor: pointer;">View all</span>
          </div>
          <div style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px;">
            ${playlists?.items?.slice(0, 5).map(p => `
              <div class="glass-card hover-scale" style="display: flex; align-items: center; gap: 12px; padding: 8px 16px; min-width: 200px; cursor: pointer;" onclick="window.UI.renderPlaylistDetail('${p.id}')">
                <img src="${p.images?.[0]?.url || ''}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;">
                <div style="overflow: hidden;">
                  <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
                  <div style="font-size: 0.7rem; color: var(--text-gray);">${p.tracks.total} tracks</div>
                </div>
              </div>
            `).join('') || ''}
          </div>
        </div>
      `;
    } catch(e) {
      viewport.innerHTML = this.renderError('Playlists Error', e.message);
    }
  },

  // 4. RECENT JUMP
  async renderRecentJump(viewport) {
    viewport.innerHTML = this.renderLoading();
    try {
      const recent = await window.SpotifyAPI.getRecentlyPlayed();
      
      let listHtml = '';
      if (recent && recent.items) {
        recent.items.forEach((item) => {
          const t = item.track;
          const d = new Date(item.played_at);
          const formattedDate = `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()} • ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
          
          listHtml += `
            <div class="hover-track" style="display: grid; grid-template-columns: 20px 3fr 2fr 1fr; gap: 16px; align-items: center; padding: 12px 16px; position: relative; cursor: pointer;" onclick="window.UI.openTrackModal('${t.id}', '${t.name.replace(/'/g, "\\'")}', '${t.artists.map(a => a.name).join(', ').replace(/'/g, "\\'")}', '${t.album?.images[0]?.url || ''}', '${t.preview_url || ''}')">
              <!-- Timeline Dot -->
              <div style="width: 10px; height: 10px; border-radius: 50%; border: 2px solid var(--spidey-red); background: var(--bg-dark); z-index: 2;"></div>
              
              <div style="display: flex; gap: 16px; align-items: center;">
                <img src="${t.album?.images[0]?.url}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;">
                <div style="overflow: hidden;">
                  <div style="font-weight: 600; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.name}</div>
                  <div style="font-size: 0.8rem; color: var(--text-gray); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.artists[0].name}</div>
                </div>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-gray);">${formattedDate}</div>
              <div style="font-size: 0.85rem; color: var(--text-dim); text-align: right;">${Math.floor(t.duration_ms / 60000)}:${String(Math.floor((t.duration_ms % 60000)/1000)).padStart(2, '0')}</div>
            </div>
          `;
        });
      }

      viewport.innerHTML = `
        <div class="page-container page-transition-enter" style="display: grid; grid-template-columns: 1fr 300px; gap: 32px;">
          
          <div>
            <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 8px;">Recent Jump</h1>
            <p style="color: var(--text-gray); font-size: 1rem; margin-bottom: 24px;">Your listening history across dimensions.</p>
            
            <div style="display: flex; gap: 12px; margin-bottom: 32px;">
              <span class="btn-outline" style="border-color: var(--spidey-red); color: var(--spidey-red);">Today</span>
              <span class="btn-outline">This Week</span>
              <span class="btn-outline">This Month</span>
              <span class="btn-outline">All Time</span>
            </div>

            <!-- Timeline List -->
            <div class="glass-card" style="padding: 16px 0; position: relative;">
              <div style="position: absolute; left: 21px; top: 20px; bottom: 20px; width: 2px; background: rgba(255,255,255,0.05); z-index: 1;"></div>
              
              <div style="display: grid; grid-template-columns: 20px 3fr 2fr 1fr; gap: 16px; padding: 0 16px 12px 16px; border-bottom: 1px solid var(--glass-border); margin-bottom: 12px;">
                <div></div>
                <div style="font-size: 0.75rem; color: var(--text-dim); letter-spacing: 1px;">TRACK / PLAYLIST</div>
                <div style="font-size: 0.75rem; color: var(--text-dim); letter-spacing: 1px;">DATE PLAYED</div>
                <div style="font-size: 0.75rem; color: var(--text-dim); letter-spacing: 1px; text-align: right;">DURATION</div>
              </div>

              ${listHtml}
              
              <div style="text-align: center; margin-top: 16px;">
                <button class="btn-outline" style="border: none; color: var(--text-gray);">Load more ⌄</button>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div class="glass-card">
              <span style="font-size: 0.7rem; color: var(--spidey-red); font-weight: bold; letter-spacing: 1px;">THIS WEEK</span>
              <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 24px;">Top Genres</h3>
              
              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${[
                  {name: 'Hip-Hop', val: 40, col: 'var(--spidey-red)'},
                  {name: 'Electronic', val: 25, col: 'var(--neon-purple)'},
                  {name: 'R&B', val: 15, col: 'var(--text-gray)'},
                  {name: 'Alternative', val: 10, col: 'var(--text-dim)'},
                  {name: 'Ambient', val: 10, col: 'var(--text-dim)'}
                ].map(g => `
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
                      <span>${g.name}</span>
                      <span style="color: var(--text-gray);">${g.val}%</span>
                    </div>
                    <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px;">
                      <div style="width: ${g.val}%; height: 100%; background: ${g.col}; border-radius: 2px;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

        </div>
      `;
    } catch(e) {
      viewport.innerHTML = this.renderError('Recent Jump Error', e.message);
    }
  },

  // 5. SEARCH DIMENSIONS
  renderSearch(viewport) {
    viewport.innerHTML = `
      <div class="page-container page-transition-enter">
        
        <!-- Tabs -->
        <div style="display: flex; gap: 32px; border-bottom: 1px solid var(--glass-border); margin-bottom: 32px;">
          <span style="padding-bottom: 12px; font-weight: 600; color: var(--spidey-red); border-bottom: 2px solid var(--spidey-red); cursor: pointer;">Top Results</span>
          <span style="padding-bottom: 12px; font-weight: 500; color: var(--text-gray); cursor: pointer;">Tracks</span>
          <span style="padding-bottom: 12px; font-weight: 500; color: var(--text-gray); cursor: pointer;">Artists</span>
          <span style="padding-bottom: 12px; font-weight: 500; color: var(--text-gray); cursor: pointer;">Albums</span>
          <span style="padding-bottom: 12px; font-weight: 500; color: var(--text-gray); cursor: pointer;">Playlists</span>
        </div>

        <div id="search-results-viewport" style="min-height: 250px;">
          <div style="text-align: center; color: var(--text-dim); padding: 80px 20px;">
            <svg style="width: 48px; height: 48px; stroke: var(--text-dim); margin-bottom: 12px; opacity: 0.5;"><use href="#icon-search"></use></svg>
            <p style="font-size: 1.1rem;">Search for any track, artist, or album...</p>
          </div>
        </div>
      </div>
    `;
  },

  async executeDebouncedQuery(query) {
    const viewport = document.getElementById('search-results-viewport');
    if (!viewport) return;

    if (!query || !query.trim()) {
      viewport.innerHTML = `
        <div style="text-align: center; color: var(--text-dim); padding: 80px 20px;">
          <svg style="width: 48px; height: 48px; stroke: var(--text-dim); margin-bottom: 12px; opacity: 0.5;"><use href="#icon-search"></use></svg>
          <p style="font-size: 1.1rem;">Search for any track, artist, album, or playlist...</p>
        </div>
      `;
      return;
    }

    viewport.innerHTML = this.renderLoading();

    try {
      const data = await window.SpotifyAPI.searchAll(query);
      
      let html = '';
      if (data && data.tracks && data.tracks.items && data.tracks.items.length > 0) {
        const top = data.tracks.items[0];
        
        // Top Result Card
        html += `
          <div class="glass-card" style="padding: 24px; display: flex; gap: 24px; align-items: center; margin-bottom: 40px; background: radial-gradient(circle at 100% 50%, rgba(188, 0, 221, 0.1) 0%, transparent 60%);">
            <img src="${top.album?.images[0]?.url}" style="width: 140px; height: 140px; border-radius: 8px; object-fit: cover;">
            <div>
              <span style="font-size: 0.75rem; color: var(--spidey-red); font-weight: bold; letter-spacing: 1px;">TOP RESULT</span>
              <h2 style="font-size: 2rem; font-weight: 700; margin: 4px 0 8px 0;">${top.name}</h2>
              <p style="color: var(--text-gray); font-size: 1rem; margin-bottom: 16px;">${top.artists.map(a=>a.name).join(', ')}</p>
              <button class="play-btn-circle" style="width: 48px; height: 48px; background: var(--spidey-red); color: white;" onclick="window.UI.openTrackModal('${top.id}', '${top.name.replace(/'/g, "\\'")}', '${top.artists.map(a => a.name).join(', ').replace(/'/g, "\\'")}', '${top.album?.images[0]?.url || ''}', '${top.preview_url || ''}')">
                <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; fill: white;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </button>
            </div>
          </div>
        `;

        // Tracks List
        html += `<h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">Tracks</h3><div style="margin-bottom: 40px;">`;
        data.tracks.items.slice(1, 5).forEach(t => {
          html += `
            <div class="hover-track" style="display: grid; grid-template-columns: 3fr 2fr 1fr; gap: 16px; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer;" onclick="window.UI.openTrackModal('${t.id}', '${t.name.replace(/'/g, "\\'")}', '${t.artists.map(a => a.name).join(', ').replace(/'/g, "\\'")}', '${t.album?.images[0]?.url || ''}', '${t.preview_url || ''}')">
              <div style="display: flex; gap: 16px; align-items: center;">
                <img src="${t.album?.images[0]?.url}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;">
                <div style="overflow: hidden;">
                  <div style="font-weight: 600; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.name}</div>
                  <div style="font-size: 0.8rem; color: var(--text-gray);">${t.artists.map(a=>a.name).join(', ')}</div>
                </div>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-gray); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.album.name}</div>
              <div style="font-size: 0.85rem; color: var(--text-dim); text-align: right;">${Math.floor(t.duration_ms / 60000)}:${String(Math.floor((t.duration_ms % 60000)/1000)).padStart(2, '0')}</div>
            </div>
          `;
        });
        html += `</div>`;
        
        // Artists Grid
        if (data.artists && data.artists.items && data.artists.items.length > 0) {
          html += `<h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">Artists</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; margin-bottom: 40px;">`;
          data.artists.items.slice(0, 5).forEach(a => {
            html += `
              <div class="glass-card" style="padding: 16px; text-align: center;">
                <img src="${a.images && a.images.length > 0 ? a.images[0].url : 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&auto=format&fit=crop&q=80'}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 12px; display: inline-block;">
                <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${a.name}</div>
              </div>
            `;
          });
          html += `</div>`;
        }
        
        // Albums Grid
        if (data.albums && data.albums.items && data.albums.items.length > 0) {
          html += `<h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">Albums</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; margin-bottom: 40px;">`;
          data.albums.items.slice(0, 5).forEach(a => {
            html += `
              <div class="glass-card" style="padding: 16px;">
                <img src="${a.images && a.images.length > 0 ? a.images[0].url : ''}" style="width: 100%; aspect-ratio: 1; border-radius: 8px; object-fit: cover; margin-bottom: 12px;">
                <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${a.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-gray);">${a.artists[0]?.name || ''}</div>
              </div>
            `;
          });
          html += `</div>`;
        }
        
        // Playlists Grid
        if (data.playlists && data.playlists.items && data.playlists.items.length > 0) {
          html += `<h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 16px;">Playlists</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; margin-bottom: 40px;">`;
          data.playlists.items.slice(0, 5).forEach(p => {
            html += `
              <div class="glass-card" style="padding: 16px;">
                <img src="${p.images && p.images.length > 0 ? p.images[0].url : ''}" style="width: 100%; aspect-ratio: 1; border-radius: 8px; object-fit: cover; margin-bottom: 12px;">
                <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-gray);">By ${p.owner?.display_name || 'Spotify'}</div>
              </div>
            `;
          });
          html += `</div>`;
        }

      } else {
        html = `<p style="text-align: center; color: var(--text-gray); padding: 40px;">No results found.</p>`;
      }
      viewport.innerHTML = html;

    } catch (e) {
      viewport.innerHTML = this.renderError('Search Error', e.message);
    }
  },

  // 6. PLAYER ROOM
  async renderPlayerRoom(viewport) {
    // Check if something is playing
    const audio = document.getElementById('global-html5-audio');
    const isPlaying = audio && audio.src && audio.src !== '';
    
    if (!isPlaying) {
      viewport.innerHTML = `
        <div class="page-container page-transition-enter" style="text-align: center; padding: 100px;">
          <h2 style="font-size: 2rem; margin-bottom: 16px;">Player Room</h2>
          <p style="color: var(--text-gray);">Play a track from anywhere to open the dedicated player room.</p>
        </div>
      `;
      return;
    }

    // Sync with sidebar player
    const bTitle = document.getElementById('bottom-track-title')?.innerText || 'Unknown Track';
    const bArtist = document.getElementById('bottom-track-artist')?.innerText || 'Unknown Artist';
    const bArt = document.getElementById('bottom-album-art')?.src || '';
    
    // Attempt to load queue
    const topTracks = await window.SpotifyAPI.getTopTracks();
    let queueHtml = '';
    if (topTracks && topTracks.items) {
      topTracks.items.slice(0,5).forEach(t => {
        queueHtml += `
          <div class="hover-track" style="display: flex; gap: 12px; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.03);">
            <img src="${t.album.images[0]?.url}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;">
            <div style="flex-grow: 1; overflow: hidden;">
              <div style="font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-gray);">${t.artists[0].name}</div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-gray);">${Math.floor(t.duration_ms / 60000)}:${String(Math.floor((t.duration_ms % 60000)/1000)).padStart(2, '0')}</div>
          </div>
        `;
      });
    }

    viewport.innerHTML = `
      <div class="page-container page-transition-enter" style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px;">
        
        <!-- Left: Huge Player -->
        <div class="glass-card" style="padding: 40px; display: flex; flex-direction: column; align-items: center; background: radial-gradient(circle at 50% 30%, rgba(188, 0, 221, 0.1) 0%, transparent 60%);">
          <span style="font-size: 0.75rem; color: var(--spidey-red); font-weight: bold; letter-spacing: 1px; margin-bottom: 16px; align-self: flex-start;">NOW PLAYING</span>
          
          <img id="pr-album-art" src="${bArt}" style="width: 350px; height: 350px; border-radius: 12px; object-fit: cover; box-shadow: 0 20px 40px rgba(0,0,0,0.6); margin-bottom: 32px;">
          
          <div style="text-align: center; margin-bottom: 24px; width: 100%;">
            <h2 id="pr-track-title" style="font-size: 2.2rem; font-weight: 700; margin-bottom: 8px;">${bTitle}</h2>
            <p id="pr-track-artist" style="font-size: 1.1rem; color: var(--text-gray);">${bArtist}</p>
          </div>
          
          <div style="display: flex; gap: 12px; margin-bottom: 32px;">
            <span style="border: 1px solid rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; color: var(--text-gray);">Dimension: Earth-616</span>
            <span style="border: 1px solid rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; color: var(--text-gray);">Vibe: Melancholic</span>
          </div>

          <!-- Large Progress Bar -->
          <div class="progress-bar-container" style="width: 100%; max-width: 500px; margin-bottom: 32px;">
            <span class="time-stamp" id="pr-time-current">0:00</span>
            <div class="progress-slider-bg" id="pr-progress-bar" style="height: 6px;">
              <div class="progress-slider-fill" id="pr-progress-fill" style="background: var(--spidey-red);"></div>
            </div>
            <span class="time-stamp" id="pr-time-total">3:00</span>
          </div>

          <!-- Large Controls -->
          <div style="display: flex; align-items: center; gap: 40px;">
            <button class="control-btn" style="transform: scale(1.5);" onclick="window.PlayerEngine.playPrev()">
              <svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            </button>
            <button class="play-btn-circle" id="pr-btn-play" style="width: 64px; height: 64px; transform: scale(1.2);" onclick="window.PlayerEngine.togglePlay()">
              <svg viewBox="0 0 24 24" id="pr-play-svg" style="width: 24px; height: 24px; fill: black;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
            <button class="control-btn" style="transform: scale(1.5);" onclick="window.PlayerEngine.playNext()">
              <svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
            </button>
          </div>
        </div>

        <!-- Right: Queue & Related -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div class="glass-card" style="padding: 16px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 16px 12px 16px; border-bottom: 1px solid var(--glass-border);">
              <h3 style="font-size: 1.1rem; font-weight: 600;">Queue</h3>
              <span style="font-size: 0.8rem; color: var(--text-gray); cursor: pointer;">Clear</span>
            </div>
            <div style="padding-top: 12px;">
              ${queueHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    // Initialize player state visually
    window.PlayerEngine.updateUIState();
  },

  // 7. SETTINGS
  renderSettings(viewport) {
    const isDemo = window.SpotifyAPI.isDemoMode();

    viewport.innerHTML = `
      <div class="page-container page-transition-enter">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 8px;">Settings</h1>
        <p style="color: var(--text-gray); font-size: 1rem; margin-bottom: 32px;">Customize your Spiderfy experience across the multiverse.</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          
          <!-- Account -->
          <div class="glass-card">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 24px;">Account</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
              <div style="display: flex; gap: 16px; align-items: center;">
                <img src="https://images.unsplash.com/photo-1635805737707-575885ab0820?w=64&auto=format&fit=crop&q=80" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
                <div>
                  <div style="font-weight: 600; font-size: 1rem;">Miles Morales</div>
                  <div style="font-size: 0.8rem; color: var(--text-gray);">miles@spiderfy.com</div>
                </div>
              </div>
              <button class="btn-outline">Edit Profile</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--glass-border);">
              <div>
                <div style="font-weight: 600; font-size: 0.95rem;">Subscription</div>
                <div style="font-size: 0.8rem; color: var(--neon-purple);">Spiderfy Premium</div>
              </div>
              <button class="btn-outline">Manage</button>
            </div>
          </div>

          <!-- Playback -->
          <div class="glass-card">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 24px;">Playback</h3>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <div style="font-weight: 500; font-size: 0.95rem;">Demo Mode (Mock API)</div>
                <div style="font-size: 0.75rem; color: var(--text-gray);">Run offline with preloaded reference data.</div>
              </div>
              <label style="position: relative; display: inline-block; width: 44px; height: 24px;">
                <input type="checkbox" id="settings-demo-toggle" style="opacity: 0; width: 0; height: 0;" ${isDemo ? 'checked' : ''} onchange="localStorage.setItem('spidey_demo_mode', this.checked); window.location.reload();">
                <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isDemo ? 'var(--electric-blue)' : 'var(--text-dim)'}; transition: .3s; border-radius: 24px; display: block;">
                  <span style="position: absolute; content: ''; height: 16px; width: 16px; left: ${isDemo ? '24px' : '4px'}; bottom: 4px; background-color: white; transition: .3s; border-radius: 50%; display: block;"></span>
                </span>
              </label>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <div style="font-weight: 500; font-size: 0.95rem;">Autoplay</div>
                <div style="font-size: 0.75rem; color: var(--text-gray);">Automatically play similar tracks.</div>
              </div>
              <div style="width: 44px; height: 24px; background: #5555ff; border-radius: 24px; position: relative;"><div style="position:absolute; width:16px; height:16px; background:white; border-radius:50%; top:4px; right:4px;"></div></div>
            </div>
          </div>

          <!-- Login/Logout Button -->
          <div class="glass-card" style="grid-column: span 2; display: flex; justify-content: flex-end; background: transparent; border: none; padding: 0;">
            ${!window.Auth.getAccessToken() ? `
              <button class="btn-primary" style="background: var(--spidey-red); color: white;" onclick="window.Auth.login()">
                <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor; display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                Connect with Spotify
              </button>
            ` : `
              <button class="btn-outline" style="border-color: var(--spidey-red); color: var(--spidey-red);" onclick="window.Auth.logout()">
                <svg viewBox="0 0 24 24" style="width:16px; height:16px; stroke:currentColor; fill:none; display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sign Out
              </button>
            `}
          </div>

        </div>
      </div>
    `;
  },

  async openTrackModal(id, name, artist, imgUrl, previewUrl) {
    const container = document.getElementById('track-modal-container');
    if (!container) return;
    
    // Initial Render with basic info
    container.innerHTML = `
      <div id="track-modal-overlay" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
        <div class="glass-card page-transition-enter" style="width: 90%; max-width: 500px; padding: 32px; position: relative; border: 1px solid rgba(255,255,255,0.1);">
          <button onclick="document.getElementById('track-modal-overlay').style.opacity='0'; setTimeout(()=>document.getElementById('track-modal-container').innerHTML='', 300);" style="position: absolute; top: 16px; right: 16px; background: transparent; border: none; color: white; cursor: pointer;">
            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px; stroke: currentColor; fill: none; stroke-width: 2;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div style="display: flex; gap: 24px; margin-bottom: 24px;">
            <img src="${imgUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150&auto=format&fit=crop&q=80'}" style="width: 120px; height: 120px; border-radius: 8px; object-fit: cover; box-shadow: 0 10px 20px rgba(0,0,0,0.5);">
            <div style="display: flex; flex-direction: column; justify-content: center;">
              <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 8px;">${name}</h2>
              <p style="color: var(--text-gray); font-size: 1rem; margin-bottom: 8px;">${artist}</p>
              <div id="track-modal-extra" style="font-size: 0.8rem; color: var(--text-dim);">
                Loading details...
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 12px; margin-bottom: 24px;">
            <button class="btn-primary" style="flex: 1;" onclick="window.PlayerEngine.loadTrack('${id}', '${name.replace(/'/g, "\\'")}', '${artist.replace(/'/g, "\\'")}', '${imgUrl}', '${previewUrl || ''}'); document.getElementById('track-modal-overlay').style.opacity='0'; setTimeout(()=>document.getElementById('track-modal-container').innerHTML='', 300);">
              <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor; display: inline-block; vertical-align: middle; margin-right: 4px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Play
            </button>
            <button class="btn-outline" style="flex: 1;" onclick="window.open('https://open.spotify.com/track/${id}', '_blank')">
              Open in Spotify
            </button>
          </div>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
            <button class="btn-outline" style="width: 100%;" onclick="document.getElementById('lyrics-panel').style.display='block'; this.style.display='none';">Show Lyrics</button>
            <div id="lyrics-panel" style="display: none; background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px; margin-top: 12px; text-align: center;">
              <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 12px;">Lyrics are not available from Spotify directly.</p>
              <button class="btn-outline" style="font-size: 0.8rem; padding: 6px 16px;" onclick="window.open('https://open.spotify.com/track/${id}', '_blank')">Open lyrics on Spotify</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Trigger fade in
    setTimeout(() => {
      const overlay = document.getElementById('track-modal-overlay');
      if (overlay) overlay.style.opacity = '1';
    }, 10);
    
    // Fetch extra details
    try {
      const trackData = await window.SpotifyAPI.getTrack(id);
      const extraDiv = document.getElementById('track-modal-extra');
      if (extraDiv && trackData) {
        const releaseDate = trackData.album?.release_date || '';
        const popularity = trackData.popularity || 0;
        const duration = trackData.duration_ms ? ${"`${Math.floor(trackData.duration_ms/60000)}:${String(Math.floor((trackData.duration_ms%60000)/1000)).padStart(2, '0')}`"} : '';
        extraDiv.innerHTML = `
          <div>Duration: ${"${duration}"}</div>
          ${"${releaseDate ? `<div>Released: ${releaseDate}</div>` : ''}"}
          <div>Popularity: ${"${popularity}"}/100</div>
        `;
      }
    } catch(e) {
      console.warn('Failed to fetch extra track details', e);
      const extraDiv = document.getElementById('track-modal-extra');
      if (extraDiv) extraDiv.innerHTML = '';
    }
  }
};

window.UI = UI;
