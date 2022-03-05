const fetch = require("cross-fetch");
const { response } = require("express");
const { checkProperties, transformData } = require("./util");
const EXTRERNAL_URL =
  "https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json";

let ORIGINAL = [];
let PROCESSED = [];

const getExternalData = async (req, res = response) => {
  try {
    const resp = await fetch(`${EXTRERNAL_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    const data = await resp.json();
    ORIGINAL = data;
    PROCESSED = processData(ORIGINAL);

    // res.json({ data: ORIGINAL, count: ORIGINAL.length });
  } catch (err) {
    console.error(err);
  }
};

const getData = async (req, res = response) => {
  try {
    res.json({ data: PROCESSED, count: PROCESSED.length });
  } catch (err) {
    console.error(err);
  }
};

// group all data into products
const getProductGroups = async (req, res = response) => {
  const groups = PROCESSED.reduce((groups, item) => {
    const group = groups[item.sample.sku] || [];
    group.push(item);
    groups[item.sample.sku] = group;
    return groups;
  }, {});

  res.json(groups);
};

// group all data into state
const getStateGroups = async (req, res = response) => {
  const groups = PROCESSED.reduce((groups, item) => {
    const group = groups[item.stateByCode] || [];
    group.push(item);
    groups[item.stateByCode] = group;
    return groups;
  }, {});

  res.json(groups);
};

// group all data into day of week
const getDayGroups = async (req, res = response) => {
  const groups = PROCESSED.reduce((groups, item) => {
    const group = groups[item.dayOfWeek] || [];
    group.push(item);
    groups[item.dayOfWeek] = group;
    return groups;
  }, {});

  res.json(groups);
};

// group all data into products then order by count
const getMostPopular = async (req, res = response) => {
  const arr = [];
  const groups = PROCESSED.reduce((groups, item) => {
    const group = groups[item.sample.sku] || [];
    group.push(item);
    groups[item.sample.sku] = group;
    return groups;
  }, {});

  for (const [key, value] of Object.entries(groups)) {
    arr.push({
      sku: `${key}`,
      orders: value,
      count: value.length,
    });
  }

  arr.sort(function (a, b) {
    var keyA = a.count,
      keyB = b.count;
    // Compare the 2 counts
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  res.json(arr);
};

const processData = (data) => {
  // check for missing properties in original data
  // transform original data into the needed format
  let newData = transformData(checkProperties(data));

  return newData;
};

module.exports = {
  getExternalData,
  getProductGroups,
  getStateGroups,
  getDayGroups,
  getMostPopular,
  getData,
};
