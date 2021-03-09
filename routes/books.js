const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Book = require('../models/Book');

// Show add page - GET/books/add 
router.get('/add', ensureAuth, function (req, res) {
    res.render('books/add');
    // render function will make the engine look for books/add
});


// Process add form - POST/books 
router.post('/', ensureAuth, async function (req, res) {
    try {
        req.body.user = req.user.id;
        await Book.create(req.body);
        res.redirect('/dashboard');
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        res.render('error/500');
    }
    // render function will make the engine look for 'error/500'
});

// Show all public books - GET/books
router.get('/', ensureAuth, async function (req, res) {
    try {
        const books = await Book.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('books/index', { books, });
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        res.render('error/500');
    }
});


// Show all private books - GET/books/private
router.get('/private', ensureAuth, async function (req, res) {
    try {
        const books = await Book.find({ status: 'private' }).populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('books/index', { books, });
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        res.render('error/500');
    }
});

// Show selected book - GET/books/:id 
router.get('/:id', ensureAuth, async function (req, res) {
    try {
        const books = await Book.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('books/index', { books, });
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        res.render('error/500');
    }
});

// Show single book
// GET/books/:id
router.get('/:id', ensureAuth, async function (req, res) {
    try {
        let book = await Book.findById(req.params.id).populated('user').lean();
        if (!book) {
            return res.render('error/404');
        }
        res.render('books/show', { book, });
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        res.render('error/404');
    }
});

// Show edit page
// GET/books/edit/:id
router.get('/edit/:id', ensureAuth, async function (req, res) {
    try {
        const book = await Book.findOne({
            _id: req.params.id
        }).lean()

        if (!book) {
            return res.render('error/404');
        }

        // Provision for redirection if the rightful owner is not detected. 
        // A should not be able to edit B's book edit section

        // Currently logged in user : req.user.id
        if (book.user != req.user.id) {
            res.redirect('/books');
        }
        else {
            res.render('books/edit', {
                book,
            })
        }
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        return res.render('error/500');
    }
});

// Update book
// PUT/books/:id
router.put('/:id', ensureAuth, async function (req, res) {
    try {
        let book = await Book.findById(req.params.id).lean();

        if (!book) {
            return res.render('error/404');
        }


        // Currently logged in user : req.user.id
        if (book.user != req.user.id) {
            res.redirect('/books');
        }
        else {
            book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true, });
            res.redirect('/dashboard');
        }
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        return res.render('error/500');
    }
});

// Delete book
// DELETE /books/:id
router.delete('/:id', ensureAuth, async function (req, res) {
    try {
        await Book.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        return res.render('error/500');
    }
});

// User books - to get all books for a specified user
// GET /books/user/:userId

router.get('/user/:userId', ensureAuth, async function (req, res) {
    try {
        const books = await Book.find({
            user: req.params.userId,
            status: 'public'
        })
            .populate('user')
            .lean();  // status:'public' is ensuring that only public books are available

        res.render('books/index', { books });
    }
    catch (err) {
        console.log('---DETECTED ERROR---' + err);
        return res.render('error/404');
    }
});

module.exports = router;