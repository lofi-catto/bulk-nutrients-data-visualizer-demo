const { Router } = require("express");
const router = Router();

const {
  getData,
  getMostPopular,
  getProcessedData,
} = require("../controllers/home.controller");

router.get("/data", getData);
router.get("/popular", getMostPopular);
router.get("/processed", getProcessedData);

module.exports = router;
