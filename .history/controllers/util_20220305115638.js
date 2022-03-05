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
];

const checkProperties = (data) => {
  return data.filter(countProperties);
};

const countProperties = (d) => {
  let count = 0;
  for (let i = 0; i < PROPERTIES.length; i++) {
    if (d.hasOwnProperty(PROPERTIES[i].name)) {
      count++;
    }
  }

  return count === PROPERTIES.length;
};

const transformData = (data) => {
  data.map(transform);
};

const transform = (item) => ({
  ...item,
  fullName: [item.firstname, item.lastname].join(" "),
});

module.exports = {
  checkProperties,
};
