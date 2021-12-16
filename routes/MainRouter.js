// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const passport = require('passport');


// ============================================================================
// Internal Modules:
// ============================================================================

// routers:
const AdminRouter = require('./AdminRouter');
const AnnotatorRouter = require('./AnnotatorRouter');
const VerifierRouter = require('./VerifierRouter');


// ============================================================================
// Main Router:
// ============================================================================

let router = require('express').Router();

// ========================================================
// Root Router Routes:
// ========================================================

router.get('/', async (req, res, next) => {
    try {
        res.sendFile('static/index.html', { root: './' });
    } catch (err) {
        res.status(500).send(err);
    }
})

router.use('/admin', AdminRouter);
router.use('/annotator', AnnotatorRouter);
router.use('/verifier', VerifierRouter);


// ============================================================================
// Exporting Root Router:
// ============================================================================

module.exports = router;

// ============================================================================
