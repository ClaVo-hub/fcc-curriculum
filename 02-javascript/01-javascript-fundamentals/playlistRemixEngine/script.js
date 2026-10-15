const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122,
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108,
    },
    {
      trackId: "trk103",
      artist: "Lunar Arcade",
      title: "Midnight Frequency",
      votes: 4,
      bpm: 128,
    },
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122,
    },
  ],
  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115,
    },
    {
      trackId: "trk202",
      artist: "Velvet Comet",
      title: "Satellite Hearts",
      votes: 6,
      bpm: 124,
    },
  ],
];

function flattenPlaylists(list) {
  // Safety check: if input is not an array, return []
  if (!Array.isArray(list)) {
    return [];
  }
  let result = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      const trackCopy = { ...list[i][j], source: [i, j] };
      result.push(trackCopy);
    }
  }
  return result;
}

function scoreTracks(flattenedList) {
  let result = [];
  for (let i = 0; i < flattenedList.length; i++) {
    flattenedList[i].score =
      flattenedList[i].votes * 10 - Math.abs(flattenedList[i].bpm - 120);
    result.push(flattenedList[i]);
  }
  return result;
}

function dedupeTracks(scoredTracks) {
  let result = [];
  let seenIds = [];
  for (let i = 0; i < scoredTracks.length; i++) {
    let current = scoredTracks[i];
    if (!seenIds.includes(current.trackId)) {
      seenIds.push(current.trackId);
      result.push(current);
    }
  }
  return result;
}

function enforceArtistQuota(deduped, max) {
  let result = [];
  for (let i = 0; i < deduped.length; i++) {
    let current = deduped[i];
    let currentCount = result.filter(
      (track) => track.artist === current.artist,
    ).length;
    if (currentCount < max) {
      result.push(current);
    }
  }
  return result;
}

function buildSchedule(quota) {
  let result = [];
  let slot = 1;
  for (let i = 0; i < quota.length; i++) {
    let trackId = quota[i].trackId;
    result.push({ slot, trackId });
    slot++;
  }
  return result;
}

function remixPlaylist(playlists, maxPerArtist) {
  const flattened = flattenPlaylists(playlists);
  const scored = scoreTracks(flattened);
  const deduped = dedupeTracks(scored);
  const quotaEnforced = enforceArtistQuota(deduped, maxPerArtist);
  const finalSchedule = buildSchedule(quotaEnforced);

  return finalSchedule;
}

console.log(remixPlaylist(playlists, 2));
