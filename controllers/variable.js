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
    ranges: [
      {
        from: 3000,
        to: 3999,
      },
      {
        from: 8000,
        to: 8999,
      },
    ],
  },
  {
    id: 2,
    name: "New South Wales",
    short: "NSW",
    ranges: [
      {
        from: 1000,
        to: 2599,
      },
      {
        from: 2620,
        to: 2899,
      },
      {
        from: 2921,
        to: 2999,
      },
    ],
  },
  {
    id: 3,
    name: "Tasmania",
    short: "TAS",
    ranges: [
      {
        from: 7000,
        to: 7999,
      },
    ],
  },
  {
    id: 4,
    name: "Queensland",
    short: "QLD",
    ranges: [
      {
        from: 4000,
        to: 4999,
      },
      {
        from: 9000,
        to: 9999,
      },
    ],
  },
  {
    id: 5,
    name: "Western Australia",
    short: "WA",
    ranges: [
      {
        from: 6000,
        to: 6999,
      },
    ],
  },
  {
    id: 6,
    name: "South Australia",
    short: "SA",
    ranges: [
      {
        from: 5000,
        to: 5999,
      },
    ],
  },
  {
    id: 7,
    name: "Northern Territory",
    short: "NT",
    ranges: [
      {
        from: 0800,
        to: 0999,
      },
    ],
  },
  {
    id: 8,
    name: "Australian Capital Territory",
    short: "ACT",
    ranges: [
      {
        from: 200,
        to: 299,
      },
      {
        from: 2600,
        to: 2619,
      },
      {
        from: 2900,
        to: 2920,
      },
    ],
  },
];

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

module.exports = {
  PROPERTIES,
  WEEKDAYS,
  STATES,
};
