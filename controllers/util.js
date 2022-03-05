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

//  Any data with the same full name, postcode and state will be considered duplicated
removeDuplicates = (arr) => {
  const uniqueIds = new Set();
  let count = 0;

  const unique = arr.filter((element) => {
    // use full name, post code and state to create unique ids
    const id = `${element.fullName}${element.postcode}${element.state}`;
    const isDuplicate = uniqueIds.has(id);

    uniqueIds.add(id);

    if (!isDuplicate) {
      return true;
    }
    // else {
    //   count++;
    //   console.warn(id);
    // }
  });

  return unique;
};

const transformData = (data) => {
  let transformed = data.map(transform);

  //remove defected data (input state does not match state from postcode)
  //keep the state with -1, we can use the state from postcode for it instead
  transformed = transformed.filter(
    (t) => t.state === t.stateByCode || t.state === "-1"
  );

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
  sample: {
    sku: `61-${item.Sample.split(" - ")[0].replace(/\s/g, "").toLowerCase()}`,
    product: item.Sample.split(" - ")[0],
    flavour: item.Sample.split(" - ")[1],
  },

  state: getState(item.State),
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
  let state = "";
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
};
