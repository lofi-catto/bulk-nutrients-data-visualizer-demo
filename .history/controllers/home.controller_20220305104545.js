const fetch = require("cross-fetch");
const { response } = require("express");
const EXTRERNAL_URL =
  "https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json";

let ORIGINAL = [];
let PROCESSED = [];

const getData = async (req, res = response) => {
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
    PROCESSED = processData(data);

    res.json(ORIGINAL);
  } catch (err) {
    console.error(err);
  }
};

const processData = (data) => {
  const newData = data.map((block) => ({
    ...block,
    test: "khoi",
  }));
  return newData;
};

const getMostPopular = async (req, res = response) => {
  res.json(PROCESSED);
};

module.exports = {
  getData,
  getMostPopular,
};
