const { WEEKDAYS, PROPERTIES, STATES } = require("./variable");

const checkProperties = (data) => {
  return data.filter(countProperties);
};

// count to see if there is any properties missing
const countProperties = (d) => {
  let count = 0;
  for (let i = 0; i < PROPERTIES.length; i++) {
    if (d.hasOwnProperty(PROPERTIES[i].name)) {
      count++;
    }
  }

  return count === PROPERTIES.length;
};

//filter data with empty properties
const checkEmptyProperties = (data) => {
  return data.filter((d) => {
    let count = 0;
    for (let i = 0; i < PROPERTIES.length; i++) {
      if (d[PROPERTIES[i].name]) {
        count++;
      }
    }
    return count === PROPERTIES.length;
  });
};

// Don't know if a user is allowed to get multiple sample ? Asumming No in this project
//  Any data with the same full name, postcode and state will be considered duplicated
let DUPLICATES = [];
removeDuplicates = (arr) => {
  const uniqueIds = new Set();
  const duplicateIds = [];

  const unique = arr.filter((element) => {
    // use full name, post code and state to create unique ids
    const id = `${element.fullName}${element.postcode}${element.state}`;
    const isDuplicate = uniqueIds.has(id);

    uniqueIds.add(id);

    if (!isDuplicate) {
      return true;
    } else {
      if (!duplicateIds.filter((d) => d === id).length) {
        duplicateIds.push(id);
      }
      return false;
    }
  });

  DUPLICATES = arr.filter((p) =>
    duplicateIds.includes(`${p.fullName}${p.postcode}${p.state}`)
  );

  return unique;
};

const getDuplicatedUsers = () => DUPLICATES;

const removeDefected = (arr) => {
  //remove defected data (input state does not match state from postcode or both equal -1)
  //keep the state with -1, we can use the state from postcode for it instead and vise versa
  let transformed = arr.filter(
    (t) =>
      (t.state === t.stateByCode && t.state !== "-1") ||
      (t.state === "-1" && t.stateByCode) ||
      (t.state && t.stateByCode === "-1")
  );

  const newArray = transformed.map((t) => ({
    ...t,
    state: t.state === "-1" ? t.stateByCode : t.state,
  }));

  for (let i = 0; i < newArray.length; i++) {
    const a = newArray[i];
    // remove duplicated states data for now
    delete a.stateByCode;
  }

  return newArray;
};

const transformData = (data) => {
  let transformed = data.map(transform);

  transformed = removeDefected(transformed);

  //remove duplicates
  return removeDuplicates(transformed);
};

const transform = (item) => ({
  firstName: capitalizeFirstLetter(item.FirstName),
  lastName: capitalizeFirstLetter(item.LastName),
  fullName: [
    capitalizeFirstLetter(item.FirstName),
    capitalizeFirstLetter(item.LastName),
  ].join(" "),
  date: item.Date,
  dayOfWeek: getDay(item.Date),
  postcode: item.Postcode,
  stateByCode: getStateByPostcode(item.Postcode),
  state: getState(item.State),
  sample: {
    sku: `61-${item.Sample.split(" - ")[0].replace(/\s/g, "").toLowerCase()}`,
    product: item.Sample.split(" - ")[0],
    flavour: item.Sample.split(" - ")[1] || "N/A",
  },
});

// get states inputted by users and transform them into the correct format
// mark incorrect state with -1
const getState = (s) => {
  let state = "-1";

  for (let i = 0; i < STATES.length; i++) {
    // remove punctualtions from string
    if (
      s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") ===
        STATES[i].name.toLowerCase() ||
      s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") ===
        STATES[i].short.toLowerCase()
    ) {
      state = STATES[i].short;
    }
  }

  return state;
};

//capitalize first letter of users names
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//get day of week
const getDay = (string) => {
  const date = new Date(string);
  return WEEKDAYS[date.getDay()];
};

//get state by postcode
const getStateByPostcode = (code) => {
  let state = "-1";
  for (let i = 0; i < STATES.length; i++) {
    for (let j = 0; j < STATES[i].ranges.length; j++) {
      if (code >= STATES[i].ranges[j].from && code <= STATES[i].ranges[j].to) {
        state = STATES[i].short;
      }
    }
  }
  return state;
};

module.exports = {
  transformData,
  checkProperties,
  checkEmptyProperties,
  getDuplicatedUsers,
};
