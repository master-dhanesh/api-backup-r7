var express = require("express");
var router = express.Router();

const { homepage, signup, signin } = require("../controllers/indexController");

/**@api GET / homepage */
router.get("/", homepage);

/**@api POST / signup */
router.post("/signup", signup);

/**@api POST / signin */
router.post("/signin", signin);

module.exports = router;
