const footballTeam = {
  team: "South Africa",
  year: 2010,
  headCoach: "Carlos Alberto Parreira",
  players: [
    { name: "Itumeleng Khune", position: "goalkeeper", isCaptain: false },
    { name: "Moeneeb Josephs", position: "goalkeeper", isCaptain: false },
    { name: "Shu-Aib Walters", position: "goalkeeper", isCaptain: false },
    { name: "Aaron Mokoena", position: "defender", isCaptain: true },
    { name: "Matthew Booth", position: "defender", isCaptain: false },
    { name: "Siboniso Gaxa", position: "defender", isCaptain: false },
    { name: "Bongani Khumalo", position: "defender", isCaptain: false },
    { name: "Tsepo Masilela", position: "defender", isCaptain: false },
    { name: "Anele Ngcongca", position: "defender", isCaptain: false },
    { name: "Siyabonga Sangweni", position: "defender", isCaptain: false },
    { name: "Lucas Thwala", position: "defender", isCaptain: false },
    { name: "Siphiwe Tshabalala", position: "midfielder", isCaptain: false },
    { name: "Steven Pienaar", position: "midfielder", isCaptain: false },
    { name: "Teko Modise", position: "midfielder", isCaptain: false },
    { name: "Kagisho Dikgacoi", position: "midfielder", isCaptain: false },
    { name: "Lance Davids", position: "midfielder", isCaptain: false },
    { name: "Thanduyise Khuboni", position: "midfielder", isCaptain: false },
    {
      name: "Reneilwe Letsholonyane",
      position: "midfielder",
      isCaptain: false,
    },
    { name: "Surprise Moriri", position: "midfielder", isCaptain: false },
    { name: "MacBeth Sibaya", position: "midfielder", isCaptain: false },
    { name: "Katlego Mphela", position: "forward", isCaptain: false },
    { name: "Bernard Parker", position: "forward", isCaptain: false },
    { name: "Siyabonga Nomvete", position: "forward", isCaptain: false },
  ],
};

const { team, year, headCoach, players } = footballTeam;
const teamName = document.getElementById("team");
const yearPlay = document.getElementById("year");
const coachName = document.getElementById("head-coach");
teamName.innerHTML = team;
yearPlay.innerHTML = year;
coachName.innerHTML = headCoach;

const playerCards = document.getElementById("player-cards");
const selectCards = document.getElementById("players");
const selectPlayerCards = (arr = players) => {
  playerCards.innerHTML = arr
    .map(
      ({ name, position, isCaptain }) =>
        `<div class="player-card">
  <h2>${isCaptain ? "(Captain)" : ""} ${name}</h2>
  <p>Position: ${position}</p>
 </div>`,
    )
    .join("");
};

selectCards.addEventListener("change", (event) => {
  playerCards.innerHTML = "";
  switch (event.target.value) {
    case "forward":
      selectPlayerCards(
        players.filter((player) => player.position === "forward"),
      );
      break;
    case "midfielder":
      selectPlayerCards(
        players.filter((player) => player.position === "midfielder"),
      );
      break;
    case "defender":
      selectPlayerCards(
        players.filter((player) => player.position === "defender"),
      );
      break;
    case "goalkeeper":
      selectPlayerCards(
        players.filter((player) => player.position === "goalkeeper"),
      );
      break;
    default:
      selectPlayerCards();
  }
});
