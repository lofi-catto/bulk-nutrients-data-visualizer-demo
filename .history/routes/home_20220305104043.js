const { Router } = require("express");
const router = Router();

const { getData, getMostPopular } = require("../controllers/home.controller");

router.get("/data", getData);
router.get("/popular", getMostPopular);

module.exports = router;
