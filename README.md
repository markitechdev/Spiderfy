# 🕸️ Spiderfy - Multiverse Music Web Player

Spiderfy is a sleek, music-first Spider-Man multiverse themed web player inspired by Spotify. It connects securely to your Spotify account via standard OAuth Authorization Code flow (using a secure Python-based backend) and visualizes listening habits across multiverse dimensions!

---

## 🎨 Creative Theme Dimensions
Depending on the dominant genres of your listening history, the visual styling dynamically shifts:
*   🎥 **Noir City (Earth-90214)**: Dominated by *Indie / Folk / Acoustic*. Features slick greys and dark vintage vinyl aesthetics.
*   🌸 **Neon Queens (Earth-65 - Gwen)**: Dominated by *Pop / Dance*. Features gorgeous neon pink, cyan, and synthesizer panels.
*   🎵 **Brooklyn Street Pulse (Earth-1610 - Miles)**: Dominated by *Hip-Hop / Rap*. Features high-energy street graffiti red, yellow, and bold meters.
*   🎸 **Radioactive Garage (Earth-138 - Spider-Punk)**: Dominated by *Rock / Punk*. Features spiky alternative zines, halftone details, and garage punk collars.
*   ⚡ **Neo-Tokyo 2099 (Earth-928 - Miguel)**: Dominated by *Electronic / Synth*. Features cyber orange and cyan neon grids.
*   🕸️ **The Great Web (Earth-616 - Peter)**: Balanced/Default. Features classic bright neon red and blue web-lines.

---

## 🚀 Key Features
1.  **Music-First AppShell**: Clean left sidebar on desktop (240px wide) and collapsible tab-bar on mobile viewports.
2.  **Persistent Bottom Player Bar**: Always-visible Spotify-style bar featuring album cover art, song title, play/pause controls, progress seek timeline, volume bar, and open-in-Spotify links.
3.  **Debounced Spotify Track Search**: Scans tracks directly with an input debouncer (350ms delay) to optimize bandwidth.
4.  **CORS iTunes Preview Fallback**: Spotify tracks often have `null` direct preview streams. Spiderfy dynamically queries the iTunes Search API to retrieve and play a 30-second fallback preview instantly!
5.  **Secure Backend token exchange**: Exchanges codes and refreshes tokens via Python backend routes, keeping your developer **Client Secret** 100% hidden and secure!

---

## 🛠️ Step-by-Step Setup Guide

### 1. Configure Local Environment (Secure API Keys)
Create a file called **`.env.local`** inside the project's root folder (`c:\Users\Mark\Desktop\WebsiteSpiderman\.env.local`):
```text
SPOTIFY_CLIENT_ID=your_real_client_id
SPOTIFY_CLIENT_SECRET=your_real_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```
*Note: `.env.local` is listed inside `.gitignore` and is completely ignored by Git for security protection.*

### 2. Register Redirect URI in Spotify Dashboard
Log into the [Spotify Developer Portal](https://developer.spotify.com/):
1.  Edit your App Settings.
2.  Add **Redirect URIs**: `http://localhost:3000/callback`
3.  Ensure the **Web API** and **Web Playback SDK** APIs are enabled.

### 3. Launch the Server
Execute the custom Python dev server:
```bash
python server.py
```
Open **[http://localhost:3000/](http://localhost:3000/)** in your browser.

*Don't want to connect your real Spotify account? Just toggle the **Demo Mode** checkbox in Settings or the home page to immediately explore preloaded listening universes offline!*
