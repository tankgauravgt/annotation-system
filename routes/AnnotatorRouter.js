// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const passport = require('passport');


// ============================================================================
// Internal Modules:
// ============================================================================

// middlewares:
const Validators = require('../middlewares/Validators');

// controllers:
const AnnotatorController = require('../controllers/AnnotatorController');


// ============================================================================
// Annotator Router:
// ============================================================================

let router = require('express').Router();

// ========================================================
// Register Routes:
// ========================================================

router.get(
    '/register', 
    AnnotatorController.register.get
);

router.post(
    '/register', 
    Validators.Annotator.registerSchemaValidate, 
    AnnotatorController.register.post
);

// ========================================================
// Login Routes:
// ========================================================

router.get(
    '/login',
    AnnotatorController.login.get
);

router.post(
    '/login',
    passport.authenticate('annotator-local', {
        failureRedirect: '/annotator/login', 
        successRedirect: '/annotator/protected'
    }),
    Validators.Annotator.loginSchemaValidate,
    AnnotatorController.login.post
);

// ========================================================
// Logout Route:
// ========================================================

router.get(
    '/logout', 
    AnnotatorController.logout
);

// ========================================================
// Protected Route:
// ========================================================

router.get(
    '/protected',
    AnnotatorController.protected
);


// ============================================================================
// Exporting Annotator Router:
// ============================================================================

module.exports = router;

// ============================================================================
