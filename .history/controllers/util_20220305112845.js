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
  return data.filter((d) => {
    PROPERTIES.forEach((p) => {
      if (d.hasOwnProperty(p)) return false;
      return true;
    });
  });
};

module.exports = {
  checkProperties,
};
