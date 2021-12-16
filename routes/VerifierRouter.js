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
const VerifierController = require('../controllers/VerifierController');


// ============================================================================
// Verifier Router:
// ============================================================================

let router = require('express').Router();

// ========================================================
// Register Routes:
// ========================================================

router.get(
    '/register', 
    VerifierController.register.get
);

router.post(
    '/register', 
    Validators.Verifier.registerSchemaValidate, 
    VerifierController.register.post
);

// ========================================================
// Login Routes:
// ========================================================

router.get(
    '/login',
    VerifierController.login.get
);

router.post(
    '/login',
    passport.authenticate('verifier-local', {
        failureRedirect: '/verifier/login', 
        successRedirect: '/verifier/protected'
    }),
    Validators.Verifier.loginSchemaValidate,
    VerifierController.login.post
);

// ========================================================
// Logout Route:
// ========================================================

router.get(
    '/logout', 
    VerifierController.logout
);

// ========================================================
// Protected Route:
// ========================================================

router.get(
    '/protected',
    VerifierController.protected
);


// ============================================================================
// Exporting Verifier Router:
// ============================================================================

module.exports = router;

// ============================================================================
