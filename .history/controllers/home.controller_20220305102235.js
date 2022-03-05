const fetch = require("cross-fetch");
const { response } = require("express");
const EXTRERNAL_URL =
  "https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json";

const getData = async (req, res = response) => {
  try {
    const resp = await fetch(
      "https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.status >= 400) {
      throw new Error("Bad response from server");
    }

    const data = await resp.json();

    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getData,
};
