const express = require("express");
const router = express.Router();

router.get("/login", (req, res, err) => {
    res.render("login");
})

router.get("/register", (req, res, err) => {
    res.render("register");
})

module.exports = router;