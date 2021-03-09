const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Book = require('../models/Book');

// Log in page - handling GET 
router.get('/', ensureGuest, function (req, res) {
    res.render('login', { layout: 'login', });
    // render function will make the engine look for a template named login
});

//Dashboard - route GET /dashboard
router.get('/dashboard', ensureAuth, async function (req, res) {

    try {
        const books = await Book.find({ user: req.user.id }).lean();


        res.render('dashboard', {
            name: req.user.firstName,
            books
        });

    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        res.render('error/500');
    }

    // render function will make the engine look for a template named dashboard
});

module.exports = router;