const audio = document.querySelector("#audio-track");
const currTime = document.querySelector("#current-time");
const seekSlider = document.querySelector("#seek-slider");
const totDuration = document.querySelector("#total-duration");
const rewindBtn = document.querySelector("#rewind-btn");
const playBtn = document.querySelector("#play-pause-btn");
const stopBtn = document.querySelector("#stop-btn");
const forwardBtn = document.querySelector("#forward-btn");
const muteBtn = document.querySelector("#mute-btn");
const volume = document.querySelector("#volume-slider");
const speedBtn = document.querySelector("#speed-btn");

const playIcon = `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>`;
const pauseIcon = `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;

const volumeIcon = `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
const muteIcon = `<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

/* helper function to turn seconds into M:SS format */
function formatTime(sec) {
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/*play & pause function*/
const togglePlayPause = () => {
  if (audio.paused) {
    audio.play().catch((err) => console.log(err));
    playBtn.innerHTML = pauseIcon;
  } else {
    audio.pause();
    playBtn.innerHTML = playIcon;
  }
};

/*stop & reset function */
const stopTrack = () => {
  audio.pause();
  audio.currentTime = 0;
  playBtn.innerHTML = playIcon;
};

const skipRewind = () => {
  audio.currentTime -= 5;
};

const skipFwd = () => {
  audio.currentTime += 5;
};

audio.addEventListener("loadedmetadata", (e) => {
  seekSlider.max = audio.duration;
  totDuration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", (e) => {
  seekSlider.value = audio.currentTime;
  currTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", (e) => {
  playBtn.innerHTML = playIcon;
  audio.currentTime = 0;
});

seekSlider.addEventListener("input", () => {
  audio.currentTime = seekSlider.value;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

const playbackSpeed = () => {
  const rate = audio.playbackRate;
  if (rate === 1) {
    audio.playbackRate = 1.5;
    speedBtn.textContent = "x1.5";
  } else if (rate === 1.5) {
    audio.playbackRate = 2;
    speedBtn.textContent = "x2";
  } else {
    audio.playbackRate = 1;
    speedBtn.textContent = "x1";
  }
};

playBtn.addEventListener("click", togglePlayPause);

stopBtn.addEventListener("click", stopTrack);

rewindBtn.addEventListener("click", skipRewind);

forwardBtn.addEventListener("click", skipFwd);

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteBtn.innerHTML = audio.muted ? muteIcon : volumeIcon;
});

speedBtn.addEventListener("click", playbackSpeed);
