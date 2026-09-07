const manifest = {
  containerId: 1,
  destination: "Monterey, California, USA",
  weight: 831,
  unit: "lb",
  hazmat: false
};

let normalizeUnits = (manifest) => {
  let copyManifest = {...manifest};
  if (copyManifest.unit === "lb") {
    copyManifest.unit = "kg";
    copyManifest.weight *= 0.45;
    return copyManifest;
  } else {
    return copyManifest;
  }
}

function validateManifest (manifest) {
  let errors = {};

 if (manifest.containerId === undefined) {
  errors.containerId = "Missing";
 } else if (Number.isInteger(manifest.containerId) !== true || manifest.containerId <= 0 ) {
  errors.containerId = "Invalid"
 };

if (manifest.destination === undefined) {
 errors.destination = "Missing";
} else if (typeof(manifest.destination) === "string") {
  let trimmed = manifest.destination.trim();
 if (trimmed === "") {errors.destination = "Invalid"; }
} else if (typeof(manifest.destination) !== "string") {
  errors.destination = "Invalid";
};

if (manifest.weight === undefined) {
  errors.weight = "Missing";
} else if (typeof(manifest.weight) !== "number" || Number.isNaN(manifest.weight) === true || manifest.weight <= 0) {
  errors.weight = "Invalid";
};

if (manifest.unit === undefined) {
  errors.unit = "Missing";
} else if (manifest.unit !== "kg" && manifest.unit !== "lb") { 
  errors.unit = "Invalid";
};

if (manifest.hazmat === undefined) {
  errors.hazmat = "Missing";
} else if (typeof(manifest.hazmat) !== "boolean") {
  errors.hazmat = "Invalid";
};

return errors;
};

function processManifest(manifest) {
  let errors = validateManifest(manifest);
  let normalizedUnit = normalizeUnits(manifest);

  if (Object.keys(errors).length === 0) { 
  console.log(`Validation success: ${manifest.containerId}`);
  console.log(`Total weight: ${normalizedUnit.weight} kg`);
  } else if (Object.keys(errors).length !== 0) {
    console.log(`Validation error: ${manifest.containerId}`);
    console.log(errors);
  }
}

/*
console.log(normalizeUnits({ containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true }));

console.log(validateManifest({}));
console.log(validateManifest({ containerId: null, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false })); 
console.log(validateManifest({ containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" }));
console.log(validateManifest({containerId: -2}));
console.log(validateManifest({containerId: 3.50}));
console.log(validateManifest({destination: "   "}));
console.log(validateManifest({weight: NaN}));
*/

// console.log(processManifest({ containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false }));
// console.log(processManifest({ containerId: -88, destination: "Soledad", weight: NaN }));
//console.log(processManifest({ destination: "Watsonville", hazmat: true }));
