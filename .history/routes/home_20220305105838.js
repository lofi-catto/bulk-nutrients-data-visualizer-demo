const { Router } = require("express");
const router = Router();

const {
  getData,
  getMostPopular,
  getExternalData,
} = require("../controllers/home.controller");

router.get("/data", getData);
router.get("/popular", getMostPopular);
router.get("/external", getExternalData);

module.exports = router;
