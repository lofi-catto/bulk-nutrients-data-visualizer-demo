const { Router } = require("express");
const router = Router();

const { getData } = require("../controllers/home.controller");

router.get("/getData", getData);

module.exports = router;
