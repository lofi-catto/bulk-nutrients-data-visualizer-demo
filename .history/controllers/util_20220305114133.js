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
  console.warn(count === PROPERTIES.length);

  return count === PROPERTIES.length;
};

module.exports = {
  checkProperties,
};
