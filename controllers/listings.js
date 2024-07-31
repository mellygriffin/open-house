const express = require('express');
const router = express.Router();

const Listing = require('../models/listing');

//GET to /listings/index
router.get('/', async (req, res) => {
    try {
        const populatedListings = await Listing.find({}).populate('owner');
        res.render('listings/index.ejs', {
            listings: populatedListings,
        });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

//GET to /listings/new
router.get('/new', async (req, res) => {
    try {
        res.render('listings/new.ejs');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

//POST create to /listings
router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        await Listing.create(req.body);
        res.render('/');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});


module.exports = router;
