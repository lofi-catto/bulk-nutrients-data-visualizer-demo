const fetch = require("cross-fetch");
const { response } = require("express");
const EXTRERNAL_URL =
  "https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json";

const ORIGINAL = [];
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

    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

const getMostPopular = async (req, res = response) => {
  res.json(ORIGINAL);
};

module.exports = {
  getData,
  getMostPopular,
};
