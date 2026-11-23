const padBank = [
  {
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3",
  },
  {
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3",
  },
  {
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3",
  },
  {
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3",
  },
  {
    keyTrigger: "S",
    id: "Clap",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3",
  },
  {
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3",
  },
  {
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3",
  },
  {
    keyTrigger: "X",
    id: "Kick",
    url: "https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3",
  },
  {
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3",
  },
];

const state = {
  power: true,
  display: " ",
  current: padBank,
};

const display = document.getElementById("display");

const setDisplay = (text) => {
  state.display = text;
  display.innerText = text;
};

const activatePad = (pad) => {
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 100);
};

const playSound = (id, name) => {
  if (!state.power) return;
  const sound = document.getElementById(id);
  sound.currentTime = 0;
  sound.play();
  activatePad(sound.parentNode);
  setDisplay(name);
};

const renderPadBank = () => {
  const padBank = document.querySelector("#pad-bank");
  padBank.innerHTML = "";
  state.current.forEach((drum) => {
    const pad = document.createElement("button");
    pad.classList.add("drum-pad");
    pad.id = drum.id;
    pad.innerText = drum.keyTrigger;
    const audio = document.createElement("audio");
    audio.classList.add("clip");
    audio.id = drum.keyTrigger;
    audio.src = drum.url;
    pad.appendChild(audio);
    pad.addEventListener("click", () =>
      playSound(drum.keyTrigger, drum.id.replace(/-/g, " ")),
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === drum.keyTrigger.toLowerCase())
        playSound(drum.keyTrigger, drum.id.replace(/-/g, " "));
    });
    padBank.appendChild(pad);
  });
};

renderPadBank();
