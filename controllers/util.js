const e = require("express");

const PROPERTIES = [
  {
    id: 1,
    name: "Date",
  },
  {
    id: 2,
    name: "FirstName",
  },
  {
    id: 3,
    name: "LastName",
  },
  {
    id: 4,
    name: "Postcode",
  },
  {
    id: 5,
    name: "Sample",
  },
  {
    id: 6,
    name: "State",
  },
];

const STATES = [
  {
    id: 1,
    name: "Victoria",
    short: "VIC",
  },
  {
    id: 2,
    name: "New South Wales",
    short: "NSW",
  },
  {
    id: 3,
    name: "Tasmania",
    short: "TAS",
  },
  {
    id: 4,
    name: "Queensland",
    short: "QLD",
  },
  {
    id: 5,
    name: "Western Australia",
    short: "WA",
  },
  {
    id: 6,
    name: "South Australia",
    short: "SA",
  },
  {
    id: 7,
    name: "Northern Territory",
    short: "NT",
  },
  {
    id: 8,
    name: "Australian Capital Territory",
    short: "ACT",
  },
];

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

//  Big question: Can a person request multiple sample ?
//  If yes -> Don't really need to check for duplicates
//  Assuming NO in this project
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
  //remove defected states
  transformed = transformed.filter((t) => t.state !== "-1");
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
  postcode: item.Postcode,
  product: item.Sample.split(" - ")[0],
  flavour: item.Sample.split(" - ")[1],
  state: getState(item.State),
});

// get states inputted by users and transform them into the correct format
// mark wrong state with -1
const getState = (string) => {
  let state = "-1";

  for (let i = 0; i < STATES.length; i++) {
    if (
      string.toUpperCase().indexOf(STATES[i].name.toUpperCase()) !== -1 ||
      string.toUpperCase().indexOf(STATES[i].short.toUpperCase()) !== -1
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

module.exports = {
  removeDuplicates,
  transformData,
  checkProperties,
};
