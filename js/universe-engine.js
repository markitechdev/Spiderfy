// SpideyVerse FM Universe Engine
// Analyzes listening preferences (genres, artists) and maps them to Spider-Verse Dimensions

const UniverseEngine = {
  // Universe Dimension Configurations
  UNIVERSES: {
    noir: {
      id: 'noir',
      name: 'Noir City',
      dimension: 'Earth-90214',
      character: 'Spider-Man Noir',
      themeColor: '#4f5660',
      gradient: 'linear-gradient(135deg, #111115 0%, #2b2c34 100%)',
      glowColor: '0 0 15px rgba(255, 255, 255, 0.25)',
      cardBorder: 'rgba(255, 255, 255, 0.15)',
      accentColor: '#ffffff',
      description: 'Your soundscape is draped in dark shadows, smooth jazz, and acoustic intimacy. You move through the rain-slicked alleyways of a vintage monochrome metropolis, where every note feels like a mystery waiting to be solved. Grab a fedora and let the record spin.',
      vibes: ['Acoustic Warmth', 'Vintage Brass', 'Shadowy Melancholy', 'Rain-Slicked Vinyl'],
      cssClass: 'universe-noir'
    },
    gwen: {
      id: 'gwen',
      name: 'Neon Queens',
      dimension: 'Earth-65',
      character: 'Spider-Gwen (Ghost-Spider)',
      themeColor: '#ff009d',
      gradient: 'linear-gradient(135deg, #0d0014 0%, #ff009d 50%, #00ccff 100%)',
      glowColor: '0 0 20px rgba(255, 0, 157, 0.5), 0 0 40px rgba(0, 204, 255, 0.3)',
      cardBorder: 'rgba(255, 0, 157, 0.3)',
      accentColor: '#ff009d',
      description: 'Bright pastel synths, bubblegum energy, and soaring dance beats define your timeline. Your music feels like a ballet of splashes, where drum kicks create ripples of magenta and cyan paint. You are agile, stylish, and pulsing with melodic grace.',
      vibes: ['Pastel Synthesis', 'Ballet Drums', 'Synthpop Glow', 'Cyan Splatters'],
      cssClass: 'universe-gwen'
    },
    miles: {
      id: 'miles',
      name: 'Brooklyn Street Pulse',
      dimension: 'Earth-1610',
      character: 'Miles Morales',
      themeColor: '#ff0055',
      gradient: 'linear-gradient(135deg, #090919 0%, #ff0055 60%, #bc00dd 100%)',
      glowColor: '0 0 20px rgba(255, 0, 85, 0.6), 0 0 40px rgba(188, 0, 221, 0.3)',
      cardBorder: 'rgba(255, 0, 85, 0.3)',
      accentColor: '#ff0055',
      description: 'Booming 808s, rapid-fire hip-hop meters, and high-energy street tracks power your web-lines. Your auditory signature is raw, creative, and unrestrained, reminiscent of spray-paint murals on brick walls and leap-of-faith skylines. Elevate your frequency.',
      vibes: ['Booming 808 Bass', 'Graffiti Stencils', 'Urban Soundtracks', 'Unrestrained Leaps'],
      cssClass: 'universe-miles'
    },
    punk: {
      id: 'punk',
      name: 'Radioactive Garage',
      dimension: 'Earth-138',
      character: 'Spider-Punk (Hobie Brown)',
      themeColor: '#ff2c00',
      gradient: 'linear-gradient(135deg, #110300 0%, #ff2c00 70%, #ffc400 100%)',
      glowColor: '0 0 20px rgba(255, 44, 0, 0.6), 0 0 40px rgba(255, 196, 0, 0.3)',
      cardBorder: 'rgba(255, 44, 0, 0.4)',
      accentColor: '#ff2c00',
      description: 'Your timeline is a high-octane garage jam loaded with fuzzy electric guitars, fast drums, and anti-establishment rock hooks. Your music refuses to be normalized or packaged. It is zine-styled, spiky, and unapologetically loud. Rock out with your webs out.',
      vibes: ['Fuzzy Distortion', 'Spiked Collars', 'Zine Halftones', 'Anarchic Rebellion'],
      cssClass: 'universe-punk'
    },
    miguel: {
      id: 'miguel',
      name: 'Neo-Tokyo 2099',
      dimension: 'Earth-928',
      character: 'Spider-Man 2099',
      themeColor: '#00ccff',
      gradient: 'linear-gradient(135deg, #050d24 0%, #00ccff 60%, #ff0055 100%)',
      glowColor: '0 0 20px rgba(0, 204, 255, 0.6), 0 0 40px rgba(255, 0, 85, 0.3)',
      cardBorder: 'rgba(0, 204, 255, 0.3)',
      accentColor: '#00ccff',
      description: 'You reside in the high-tech, cybernetic digital grid. Heavy synthesizers, electronic matrices, glitched basslines, and fast BPM cyberpunk tracks are weaving your destiny. You are precise, cyber-enhanced, and traveling faster than light speed.',
      vibes: ['Digital Web Matrix', 'Heavy Cyber Synths', 'Hologram Lasers', 'Fast-BPM Glitches'],
      cssClass: 'universe-miguel'
    },
    peter: {
      id: 'peter',
      name: 'The Great Web',
      dimension: 'Earth-616',
      character: 'Spider-Man (Peter Parker)',
      themeColor: '#ff0055',
      gradient: 'linear-gradient(135deg, #090919 0%, #ff0055 50%, #00ccff 100%)',
      glowColor: '0 0 20px rgba(255, 0, 85, 0.5), 0 0 40px rgba(0, 204, 255, 0.5)',
      cardBorder: 'rgba(255, 0, 85, 0.25)',
      accentColor: '#ff0055',
      description: 'You carry the classic, balanced core of the spider-web. A harmonious mixture of melodic pop-rock, classic anthems, and everyday beats that keep you swinging through the hustle and bustle of New York. Responsive, timeless, and completely heroic.',
      vibes: ['Classic Webbing', 'Pop-Rock Anthems', 'Timeless Hustle', 'Heroic Balances'],
      cssClass: 'universe-peter'
    }
  },

  // Analyzes artist genres and maps them to a universe config
  analyze(topTracks, topArtists) {
    if (!topArtists || !topArtists.items || topArtists.items.length === 0) {
      return this.UNIVERSES.peter; // Return classic fallback
    }

    const genreCounts = {};
    let totalGenreTokens = 0;

    // Collect all genres and count frequencies
    topArtists.items.forEach((artist) => {
      if (artist.genres) {
        artist.genres.forEach((genre) => {
          const lowerGenre = genre.toLowerCase();
          genreCounts[lowerGenre] = (genreCounts[lowerGenre] || 0) + 1;
          totalGenreTokens++;
        });
      }
    });

    // Score universes based on genres
    let scores = {
      noir: 0,
      gwen: 0,
      miles: 0,
      punk: 0,
      miguel: 0,
      peter: 0
    };

    // Keyword mapping weights
    const genreKeywords = {
      noir: ['indie', 'folk', 'acoustic', 'jazz', 'blues', 'singer-songwriter', 'classical', 'soul', 'country'],
      gwen: ['pop', 'dance', 'disco', 'k-pop', 'electropop', 'teen', 'club', 'bubblegum'],
      miles: ['hip hop', 'rap', 'trap', 'r&b', 'urban', 'lo-fi', 'drill', 'gangsta'],
      punk: ['rock', 'punk', 'metal', 'grunge', 'alternative rock', 'hardcore', 'psychedelic', 'skate punk'],
      miguel: ['electronic', 'synth', 'techno', 'house', 'edm', 'synthwave', 'trance', 'ambient', 'glitch']
    };

    // Aggregate scores
    Object.entries(genreCounts).forEach(([genre, count]) => {
      let matched = false;
      Object.entries(genreKeywords).forEach(([universeId, keywords]) => {
        if (keywords.some((kw) => genre.includes(kw))) {
          scores[universeId] += count;
          matched = true;
        }
      });
      if (!matched) {
        scores.peter += count * 0.5; // generic items bump the classic web slightly
      }
    });

    // Add weights from top tracks duration or tempo/danceability if available in a full app,
    // but genres from top artists are the most reliable indicators of actual aesthetic tastes.
    
    // Find the highest scoring universe
    let maxScore = -1;
    let winningUniverseId = 'peter';

    Object.entries(scores).forEach(([universeId, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winningUniverseId = universeId;
      }
    });

    // Ensure we have a valid fallback if scores are completely zero
    if (maxScore === 0) {
      winningUniverseId = 'peter';
    }

    return this.UNIVERSES[winningUniverseId];
  }
};

window.UniverseEngine = UniverseEngine;
