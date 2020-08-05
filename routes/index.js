const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get("/", (req, res, err) => {
    res.render("welcome");
})

//Dashboard
router.get("/dashboard", (req, res) => {
    res.render('dashboard', { name: req.user.name });
});

module.exports = router;