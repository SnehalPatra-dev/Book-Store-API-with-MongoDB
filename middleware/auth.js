// Purpose of middleware is to control direct access to the DASHBOARD from outside
// The DASHBOARD can only be accessed via Log in 
module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.redirect('/');
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        }
        else {
            return next();
        }
    },
}