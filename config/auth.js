module.exports = {
    ensureAuthenticated: function (req, res, next) {
        console.log("================> authenticated");
        if (req.isAuthenticated()) {
            return next;
        }
        req.flash('error_msg', 'Please login to view resource');
        res.redirect('/users/login');
    }
}