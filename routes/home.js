const { Router } = require("express");
const router = Router();

const {
  getData,
  getProductGroups,
  getExternalData,
  getMostPopular,
  getStateGroups,
} = require("../controllers/home.controller");

router.get("/data", getData);
router.get("/product-groups", getProductGroups);
router.get("/state-groups", getStateGroups);
router.get("/popular", getMostPopular);
router.get("/external", getExternalData);

module.exports = router;
