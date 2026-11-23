const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const playingSong = document.getElementById("player-song-title");
const songArtist = document.getElementById("player-song-artist");

const statusDot = document.getElementById("status-dot");
const currTime = document.querySelector("#current-time");
const totDuration = document.querySelector("#total-duration");
const seekSlider = document.querySelector("#seek-slider");

const rewindBtn = document.getElementById("rewind-btn");
const stopBtn = document.getElementById("stop-btn");
const fwdBtn = document.getElementById("forward-btn");

const muteBtn = document.getElementById("mute-btn");
const volumeSlider = document.getElementById("volume-slider");
const volumePct = document.getElementById("volume-pct");

const playIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4 20 12 7 20 7 4"></polygon></svg>`;
const pauseIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;
const volumeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
const muteIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

const allSongs = [
  {
    id: 0,
    title: "Bad at Love",
    artist: "Halsey",
    duration: "3:01",
    src: "./assets/bad-at-love.mp3",
    img: "./images/bad-at-love.png",
  },
  {
    id: 1,
    title: "Someone you Loved",
    artist: "Conor Maynard",
    duration: "2:28",
    src: "./assets/conor-maynard-someone-you-loved.mp3",
    img: "./images/someone-you-loved.png",
  },
  {
    id: 2,
    title: "Dangerous Woman",
    artist: "Ariana Grande",
    duration: "3:56",
    src: "./assets/dangerous-woman.mp3",
    img: "./images/dangerous-woman.png",
  },
  {
    id: 3,
    title: "Lost Control",
    artist: "Alan Walker",
    duration: "3:42",
    src: "./assets/lost-control.mp3",
    img: "./images/lost-control.png",
  },
  {
    id: 4,
    title: "A River Flows In You (remix)",
    artist: "Yiruma",
    duration: "6:40",
    src: "./assets/a-river-flows-in-you-remix.mp3",
    img: "./images/yiruma.png",
  },
];

const audio = new Audio();

const userData = {
  songs: allSongs,
  currentSong: null,
  songCurrentTime: 0,
};

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function syncProgressUI() {
  const duration = audio.duration || 1;
  const pct = (audio.currentTime / duration) * 100;
  seekSlider.value = audio.currentTime;
  seekSlider.style.background = `linear-gradient(to right, #7dd3fc ${pct}%, #334155 ${pct}%)`;
  currTime.textContent = formatTime(audio.currentTime);
}

function syncVolumeUI() {
  const val = audio.muted ? 0 : audio.volume;
  const pct = Math.round(val * 100);
  volumeSlider.value = val;
  volumeSlider.style.background = `linear-gradient(to right, #7dd3fc ${pct}%, #334155 ${pct}%)`;
  volumePct.textContent = `${pct}%`;
  muteBtn.innerHTML = audio.muted || val === 0 ? muteIcon : volumeIcon;
}

const togglePlayPause = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
  } else if (audio.paused) {
    audio.play().catch((err) => console.log(err));
  } else {
    audio.pause();
  }
};

const stopTrack = () => {
  audio.pause();
  audio.currentTime = 0;
  userData.songCurrentTime = 0;
  syncProgressUI();
};

const playSong = (id, start = true) => {
  const song = userData.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData.currentSong === null || start) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }
  userData.currentSong = song;

  changeAlbumArt();
  setPlayerDisplay();
  highlightCurrentSong();
  setPlayButtonAccessibleText();
  audio.play().catch((err) => console.log(err));
};

const getCurrentSongIndex = () => userData.songs.indexOf(userData.currentSong);

const getNextSong = () => userData.songs[getCurrentSongIndex() + 1];

const getPreviousSong = () => userData.songs[getCurrentSongIndex() - 1];

const playPreviousSong = () => {
  if (userData.currentSong === null) return;
  const previousSong = getPreviousSong();
  if (previousSong) {
    playSong(previousSong.id);
  } else {
    playSong(userData.songs[0].id);
  }
};

const playNextSong = () => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id);
    return;
  }
  const nextSong = getNextSong();
  if (nextSong) {
    playSong(nextSong.id);
  } else {
    audio.pause();
    audio.currentTime = 0;
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    setPlayerDisplay();
    changeAlbumArt();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
};

const setPlayerDisplay = () => {
  const currentTitle = userData.currentSong?.title;
  const currentArtist = userData.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const changeAlbumArt = () => {
  const albumImg = document.getElementById("album-img");
  albumImg.src = userData.currentSong?.img || "";
};

const highlightCurrentSong = () => {
  const previousCurrentSong = document.querySelector(
    '.playlist-song[aria-current="true"]',
  );
  previousCurrentSong?.removeAttribute("aria-current");
  const songToHighlight = document.getElementById(
    `song-${userData.currentSong?.id}`,
  );

  songToHighlight?.setAttribute("aria-current", "true");
};

const setPlayButtonAccessibleText = () => {
  const song = userData.currentSong;
  if (!song) {
    playButton.setAttribute("aria-label", "Play");
    return;
  }
  playButton.setAttribute(
    "aria-label",
    audio.paused ? `Play ${song.title}` : `Pause ${song.title}`,
  );
};

audio.addEventListener("play", () => {
  playButton.innerHTML = pauseIcon;
  playButton.classList.add("playing");
  setPlayButtonAccessibleText();
  statusDot.classList.add("playing");
});

audio.addEventListener("pause", () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.innerHTML = playIcon;
  playButton.classList.remove("playing");
  setPlayButtonAccessibleText();
  statusDot.classList.remove("playing");
});

playButton.addEventListener("click", togglePlayPause);

const songs = document.querySelectorAll(".playlist-song");

songs.forEach((song) => {
  const id = song.getAttribute("id").slice(5);
  const songBtn = song.querySelector("button");
  songBtn.addEventListener("click", () => {
    playSong(Number(id));
  });
});

stopBtn.addEventListener("click", stopTrack);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);

rewindBtn.addEventListener("click", () => (audio.currentTime -= 5));
fwdBtn.addEventListener("click", () => (audio.currentTime += 5));
audio.addEventListener("ended", playNextSong);

audio.addEventListener("loadedmetadata", () => {
  seekSlider.max = audio.duration;
  totDuration.textContent = formatTime(audio.duration);
  syncProgressUI();
});

audio.addEventListener("timeupdate", syncProgressUI);

seekSlider.addEventListener("input", () => {
  audio.currentTime = seekSlider.value;
  syncProgressUI();
});

volumeSlider.addEventListener("input", () => {
  audio.muted = false;
  audio.volume = volumeSlider.value;
  syncVolumeUI();
});

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  syncVolumeUI();
});

syncVolumeUI();
