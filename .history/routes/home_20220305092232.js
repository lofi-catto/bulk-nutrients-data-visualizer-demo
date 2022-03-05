const { Router } = require("express");
const router = Router();

const { getArtworks } = require("../controllers/home");

router.get("/getartworks/:keyword", getArtworks);

module.exports = router;
