const fetch = require("cross-fetch");
const { response } = require("express");
const EXTRERNAL_URL =
  "https://secure.bulknutrients.com.au/content/bEzWsxcHPewMt/sampledata.json";

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

    const { data = [] } = await resp.json();
    // const dataWithUrls = data.map((image) => ({
    //   ...image,
    //   image_url: `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
    // }));

    // res.json(dataWithUrls);
    res.json(await resp.json());
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getData,
};
