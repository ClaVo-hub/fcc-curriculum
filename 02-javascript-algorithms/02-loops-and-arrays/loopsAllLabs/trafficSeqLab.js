// node .\trafficSeqLab.js
// node loopsAllLabs\trafficSeqLab.js

const config1 = {
  fault: false,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 4 },
  ],
};

const config2 = {
  fault: false,
  phases: [
    { color: "red", duration: 3 },
    { color: "yellow", duration: -2 },
    { color: "green", duration: 6 },
  ],
};

const config3 = {
  fault: true,
  phases: [
    { color: "green", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "red", duration: 6 },
  ],
};

const config4 = {
  fault: false,
  phases: [],
};

/* ======= start of project ========= */

//You should have a function named runSequence with two parameters: config and cycles, where config represents a config object and cycles represents the maximum number of times the sequence can run before stopping.
//You should implement runSequence(config, cycles) using a for or while loop to iterate through each phase across the given number of cycles.

function runSequence(config, cycles) {
  // Log "Faulted phase!" and stop the simulation early if config.fault is set to true.
  if (config.fault === true) {
    console.log("Faulted phase!");
    return;
  }
  // Log "No phases found" and immediately return if config.phases is empty.
  if (!config.phases || config.phases.length === 0) {
    console.log("");
  }
  // iteration loop for cycles of each phase (outer loop / hour loop) - Was not included within instruction, should understand what fucntion must do..
  for (let i = 1; i <= cycles; i++) {
    // to iterate within the nested object array per phase - the inner loop / minute loop.
    for (const phase of config.phases) {
      // Log "Invalid phase detected" if duration <= 0.
      if (phases.duration <= 0) {
        console.log("Invalid phase detected");
        continue;
      }
      // Log "Switching to [color] for [duration] s" for each valid phase." Replace [color] and [duration] with the corresponding properties of the phase object.
      console.log(`Switching to ${phase.color} for ${phase.duration} s`);
    }
  }
}

/*---- result of function -----*/
/*
For example, runSequence(config1, 1) should log:
Switching to green for 5 s
Switching to yellow for 2 s
Switching to red for 4 s
You should have a function named generateTimeline with two parameters: config and cycles.
*/

/*------------ second function of project -------------
Record the cumulative elapsed time after each phase across the cycles into an array, adding each phase's duration to the running total as you iterate.
Process all faulted and invalid phases without validation, even if config.fault is true or duration <= 0.
Return the array of cumulative timestamps.
For example, generateTimeline(config1, 1) should return the array [5, 7, 11].
*/
//The generateTimeline function should:
function generativeTimeline(config, cycles) {
  if (!config || !config.phases) {
    return;
  }
  let sum = 0;
  let time = [];
  for (let i = 1; i <= cycles; i++) {
    for (const phase of config.phases) {
      sum += phase.duration;
      time.push(sum);
    }
  }
  return time;
}

console.log(generativeTimeline(config1, 1));
console.log(generativeTimeline(config1, 1));
console.log(generativeTimeline(config2, 2));
console.log(generativeTimeline(config4, 2));
console.log(generativeTimeline(config3, 2));

/*  ReadMe
Build a Traffic Light Sequencer
In this lab, you will simulate configurable traffic light cycles and log anomalies.

You'll work with config objects that describe the phases of a traffic light. Each config object has the following properties:

fault: a boolean flag that triggers early termination when true.
phases: an array of phase objects.
Each phase object inside phases has the following properties:

color: a string representing the light color ("green", "yellow", or "red").
duration: a positive integer representing how long the phase lasts in seconds.
You can refer to the provided config1, config2, config3, and config4 objects as examples of possible configuration objects.

Note: Do not add any extra console.log() statements, as they may cause the tests to fail.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories
You should have a function named runSequence with two parameters: config and cycles, where config represents a config object and cycles represents the maximum number of times the sequence can run before stopping.

You should implement runSequence(config, cycles) using a for or while loop to iterate through each phase across the given number of cycles.

The runSequence function should:

Log No phases found and immediately return if config.phases is empty.
Log Faulted phase! and stop the simulation early if config.fault is set to true.
Log Invalid phase detected if duration <= 0.
Log Switching to [color] for [duration] s for each valid phase. Replace [color] and [duration] with the corresponding properties of the phase object.
For example, runSequence(config1, 1) should log:
Switching to green for 5 s
Switching to yellow for 2 s
Switching to red for 4 s
You should have a function named generateTimeline with two parameters: config and cycles.

The generateTimeline function should:

Record the cumulative elapsed time after each phase across the cycles into an array, adding each phase's duration to the running total as you iterate.
Process all faulted and invalid phases without validation, even if config.fault is true or duration <= 0.
Return the array of cumulative timestamps.
For example, generateTimeline(config1, 1) should return the array [5, 7, 11].
*/
