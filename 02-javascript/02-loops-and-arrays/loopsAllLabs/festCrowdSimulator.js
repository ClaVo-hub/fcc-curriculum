/*Your initializeThroughput function will prepare an object to track how many attendees each gate processes. */

/*During each simulation tick:
A certain number of attendees arrive at the gate (from its [queue]).
The gate processes attendees based on its [capacity].
If more attendees arrive than the gate can handle, some will remain (overflow).
You will now build a function that handles this logic for one gate at a single tick. 
Create an empty function named processGateFlow that accepts two parameters:
[gate]: The gate object being processed.
[tickIndex]: The current simulation tick position in the [queue] array.
Now it is time to process attendees through the gate. Inside the while loop:
Decrement currentTickQueue by 1 to show one attendee has passed. Use the decrement operator (--).
Increment processed by 1 to track how many attendees were processed. Use the increment operator (++).
*/

function processGateFlow() {}

/*When a gate cannot process all attendees during a tick, some attendees remain in the queue. 
To handle this overflow, you will build a function that reroutes overflow attendees to another gate.
Create an empty function named rerouteOverflow with the following parameters:
gates: The full array of gate objects.
currentGate: The gate where the overflow occurred.
tickIndex: The current tick position in the queue.
overflowAmount: The number of attendees that could not be processed. */

/*
When rerouting overflow, you should send attendees to the next gate in the gates array. 
To do this, you need to find the index of the next gate. Normally, you could add 1 to the current index. 
However, if the current gate is the last one in the array, you need to wrap back to the first gate. 
You can use the modulo operator (%) to handle this:
    const nextIndex = (currentIndex + 1) % array.length;
This works because when currentIndex + 1 equals the array.length, the result becomes 0.

Using this approach, create a variable named nextGateIndex that stores the index of the next gate in the gates array.
*/

/*Now that you have functions to process individual ticks and handle overflow, it’s time to create a controller function for a single gate. 
This function will handle all the actions for one gate during a single tick of the simulation.

Create an empty function named handleGateAtTick with parameters:
gates: The full array of gate objects.
gate: The current gate being processed.
tickIndex: The current tick index for the simulation.
throughputSummary: An object tracking total processed attendees per gate. */

/*It will be helpful to have a function for displaying a summary of throughput during a simulation. 
Create an empty function named printSummary with a parameter summary. */

/*Now you can build a function for simulating the festival. 
Create an empty function named simulateFestival with parameters gates and timeBlock. */

const morningGates = [
  { id: "North", capacity: 5, queue: [3, 6, 2, 4] },
  { id: "East", capacity: 3, queue: [2, 4, 3, 5] },
  { id: "South", capacity: 4, queue: [1, 2, 3, 1] },
  { id: "West", capacity: 2, queue: [4, 1, 2, 3] },
];

const nightGates = [
  { id: "North", capacity: 4, queue: [6, 2, 5, 1] },
  { id: "East", capacity: 2, queue: [3, 3, 4, 2] },
  { id: "South", capacity: 5, queue: [2, 1, 2, 3] },
  { id: "West", capacity: 3, queue: [5, 2, 1, 4] },
];

function initializeThroughput(gates) {
  const summary = {};
  for (const gate of gates) {
    summary[gate.id] = 0;
  }
  return summary;
}

function processGateFlow(gate, tickIndex) {
  let currentTickQueue = gate.queue[tickIndex];
  let processed = 0;
  while (currentTickQueue > 0 && processed < gate.capacity) {
    currentTickQueue--;
    processed++;
  }
  return {
    processed: processed,
    overflow: currentTickQueue,
  };
}

function rerouteOverflow(gates, currentGate, tickIndex, overflowAmount) {
  const currentIndex = gates.indexOf(currentGate);
  const nextGateIndex = (currentIndex + 1) % gates.length;
  gates[nextGateIndex].queue[tickIndex] += overflowAmount;
  console.log(
    overflowAmount + " attendees rerouted to " + gates[nextGateIndex].id,
  );
}

function handleGateAtTick(gates, gate, tickIndex, throughputSummary) {
  console.log("\nProcessing " + gate.id + "...");
  console.log(gate.queue[tickIndex] + " attendees arriving.");
  const result = processGateFlow(gate, tickIndex);
  throughputSummary[gate.id] += result.processed;
  if (result.overflow > 0) {
    console.log("Overflow of " + result.overflow + " attendees. Rerouting...");
    rerouteOverflow(gates, gate, tickIndex, result.overflow);
  }
}

function printSummary(summary) {
  console.log("\nThroughput Summary");
  for (const gateId in summary) {
    console.log(gateId + ": " + summary[gateId] + " attendees processed");
  }
}

function simulateFestival(gates, timeBlock) {
  console.log("\n" + timeBlock + " Simulation");
  const throughputSummary = initializeThroughput(gates);
  const maxTicks = gates[0].queue.length;
  let tickIndex = 0;
  while (tickIndex < maxTicks) {
    console.log("\nTick " + (tickIndex + 1));
    for (const gate of gates) {
      handleGateAtTick(gates, gate, tickIndex, throughputSummary);
    }
    tickIndex++;
  }
  printSummary(throughputSummary);
}

simulateFestival(morningGates, "Morning");
simulateFestival(morningGates, "Night");
