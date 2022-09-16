const { expressjwt } = require("express-jwt");

exports.isLoggedIn = expressjwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWTSECRET,
    algorithms: ["HS256"],
});
// req.auth.id
