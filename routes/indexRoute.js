var express = require("express");
var router = express.Router();

const { homepage } = require("../controllers/indexController");

/**@api GET / homepage */
router.get("/", homepage);

module.exports = router;
