// Register in app.js
const express = require('express');
const router = express.Router();
// Removed ensureAuth to create an unprotected route

const newSignup = require('../models/Newsignup');
// New signed up users' data will enter Newsignup collection

router.get('/signUp', function (req, res) {
    res.render('signUp');
});

// Process add new signed up users - POST/newSignup
router.post('/newSignup', async function (req, res) {
    try {
        req.body.username = req.username;
        await Newsignup.create(req.body);
        res.redirect('/dashboard');
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        res.render('error/500');
    }
});

module.exports = router;