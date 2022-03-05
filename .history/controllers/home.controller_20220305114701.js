const fetch = require("cross-fetch");
const { response } = require("express");
const { checkProperties } = require("./util");
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

const getMostPopular = async (req, res = response) => {
  res.json(PROCESSED);
};

const processData = (data) => {
  let newData = checkProperties(data);

  return newData;
};

module.exports = {
  getExternalData,
  getMostPopular,
  getData,
};
