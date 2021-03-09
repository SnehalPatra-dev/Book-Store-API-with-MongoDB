const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth with Google - handling GET 
// GET/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//Google auth callback - GET/auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => { res.redirect('/dashboard') }
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;