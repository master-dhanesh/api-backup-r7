var express = require("express");
var router = express.Router();

const {
    homepage,
    signup,
    signin,
    logout,
    upload,
} = require("../controllers/indexController");
const { isLoggedIn } = require("../utils/isloggedin");
/**@api GET / homepage */
router.get("/", isLoggedIn, homepage);

/**@api POST / signup */
router.post("/signup", signup);

/**@api POST / signin */
router.post("/signin", signin);

/**@api POST / logout */
router.post("/logout", logout);

/**@api POST / upload/:id */
router.post("/upload/:id", upload);

module.exports = router;
