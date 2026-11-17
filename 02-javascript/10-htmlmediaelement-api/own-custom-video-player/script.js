const video = document.querySelector("#video-track");
const playerCard = document.querySelector("#player-card");
const statusDot = document.querySelector("#status-dot");
const metaBadge = document.querySelector("#meta-badge");
const currTime = document.querySelector("#current-time");
const totDuration = document.querySelector("#total-duration");
const seekSlider = document.querySelector("#seek-slider");

const rewindBtn = document.querySelector("#rewind-btn");
const playBtn = document.querySelector("#play-pause-btn");
const stopBtn = document.querySelector("#stop-btn");
const forwardBtn = document.querySelector("#forward-btn");

const muteBtn = document.querySelector("#mute-btn");
const volumeSlider = document.querySelector("#volume-slider");
const volumePct = document.querySelector("#volume-pct");
const fullscreenBtn = document.querySelector("#fullscreen-btn");
const speedButtons = document.querySelectorAll(".speed-option");

const playIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4 20 12 7 20 7 4"></polygon></svg>`;
const pauseIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;
const volumeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
const muteIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function syncProgressUI() {
  const duration = video.duration || 1;
  const pct = (video.currentTime / duration) * 100;
  seekSlider.value = video.currentTime;
  seekSlider.style.background = `linear-gradient(to right, #7dd3fc ${pct}%, #334155 ${pct}%)`;
  currTime.textContent = formatTime(video.currentTime);
}

function syncVolumeUI() {
  const val = video.muted ? 0 : video.volume;
  const pct = Math.round(val * 100);
  volumeSlider.value = val;
  volumeSlider.style.background = `linear-gradient(to right, #7dd3fc ${pct}%, #334155 ${pct}%)`;
  volumePct.textContent = `${pct}%`;
  muteBtn.innerHTML = video.muted || val === 0 ? muteIcon : volumeIcon;
}

const togglePlayPause = () => {
  if (video.paused) {
    video.play().catch((err) => console.log(err));
  } else {
    video.pause();
  }
};

const stopVideo = () => {
  video.pause();
  video.currentTime = 0;
  syncProgressUI();
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    playerCard.requestFullscreen().catch((err) => console.log(err));
  } else {
    document.exitFullscreen();
  }
};

video.addEventListener("play", () => {
  playBtn.innerHTML = pauseIcon;
  statusDot.classList.add("playing");
});

video.addEventListener("pause", () => {
  playBtn.innerHTML = playIcon;
  statusDot.classList.remove("playing");
});

video.addEventListener("ended", () => {
  playBtn.innerHTML = playIcon;
  statusDot.classList.remove("playing");
  video.currentTime = 0;
  syncProgressUI();
});

video.addEventListener("loadedmetadata", () => {
  seekSlider.max = video.duration;
  totDuration.textContent = formatTime(video.duration);
  syncProgressUI();
});

video.addEventListener("timeupdate", syncProgressUI);

video.addEventListener("click", togglePlayPause);

playBtn.addEventListener("click", togglePlayPause);
stopBtn.addEventListener("click", stopVideo);
rewindBtn.addEventListener("click", () => (video.currentTime -= 5));
forwardBtn.addEventListener("click", () => (video.currentTime += 5));
fullscreenBtn.addEventListener("click", toggleFullscreen);

seekSlider.addEventListener("input", () => {
  video.currentTime = seekSlider.value;
  syncProgressUI();
});

volumeSlider.addEventListener("input", () => {
  video.muted = false;
  video.volume = volumeSlider.value;
  syncVolumeUI();
});

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  syncVolumeUI();
});

speedButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    speedButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const rate = parseFloat(btn.dataset.speed);
    video.playbackRate = rate;
    metaBadge.textContent = `HTML5 Video • ${rate}x`;
  });
});

syncVolumeUI();
