const { Router } = require("express");
const router = Router();

const {
  getData,
  getProductGroups,
  getExternalData,
  getMostPopular,
  getStateGroups,
  getFlavourGroups,
  getDayGroups,
} = require("../controllers/home.controller");

router.get("/data", getData);
router.get("/product-groups", getProductGroups);
router.get("/state-groups", getStateGroups);
router.get("/flavour-groups", getFlavourGroups);
router.get("/day-groups", getDayGroups);
router.get("/popular", getMostPopular);
router.get("/external", getExternalData);

module.exports = router;
