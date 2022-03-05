const { Router } = require("express");
const router = Router();

const {
  getData,
  getProductGroups,
  getExternalData,
  getMostPopular,
  getStateGroups,
  getDayGroups,
} = require("../controllers/home.controller");

router.get("/data", getData);
router.get("/product-groups", getProductGroups);
router.get("/state-groups", getStateGroups);
router.get("/day-groups", getDayGroups);
router.get("/popular", getMostPopular);
router.get("/external", getExternalData);

module.exports = router;
