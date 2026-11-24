const poll = new Map();

function addOption(option) {
  if (option === "") {
    return "Option cannot be empty.";
  }

  if (!poll.has(option)) {
    const voters = new Set();
    poll.set(option, voters);
    return `Option "${option}" added to the poll.`;
  } else {
    return `Option "${option}" already exists.`;
  }
}

function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }
  const voters = poll.get(option);
  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  } else {
    voters.add(voterId);
    return `Voter ${voterId} voted for "${option}".`;
  }
}

const displayResults = () => {
  let result = "Poll Results:\n";
  for (const [option, voters] of poll) {
    result += `${option}: ${voters.size} votes\n`;
  }
  return result.trim();
};

addOption("Turkey");
addOption("Morocco");
addOption("Spain");
addOption("Malaysia");

vote("Malaysia", "traveler1");
vote("Turkey", "Ana");
vote("Turkey", "Boby");
vote("Morocco", "Charley");
vote("Morocco", "Darsy");

console.log(displayResults());
