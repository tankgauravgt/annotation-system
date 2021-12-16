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
const AdminController = require('../controllers/AdminController');


// ============================================================================
// Admin Router:
// ============================================================================

let router = require('express').Router();

// ========================================================
// Register Routes:
// ========================================================

router.get(
    '/register', 
    AdminController.register.get
);

router.post(
    '/register', 
    Validators.Admin.registerSchemaValidate, 
    AdminController.register.post
);

// ========================================================
// Login Routes:
// ========================================================

router.get(
    '/login',
    AdminController.login.get
);

router.post(
    '/login',
    passport.authenticate('admin-local', {
        failureRedirect: '/admin/login', 
        successRedirect: '/admin/addTrack'
    }),
    Validators.Admin.loginSchemaValidate,
    AdminController.login.post
);

// ========================================================
// Logout Route:
// ========================================================

router.get(
    '/logout', 
    AdminController.logout
);

// ========================================================
// Protected Route:
// ========================================================

router.get(
    '/protected',
    AdminController.protected
);

// ========================================================
// Add Track:
// ========================================================

router.get(
    '/addTrack',
    AdminController.addTrack.get
);

router.post(
    '/addTrack',
    Validators.Admin.addTrackSchemaValidate,
    AdminController.addTrack.post
);

router.get(
    '/addTracksBulk',
    AdminController.addTracksBulk.get
);

router.post(
    '/addTracksBulk',
    AdminController.addTracksBulk.post
);


// ========================================================
// Update Track:
// ========================================================

router.get(
    '/updateTrack',
    AdminController.updateTrack.get
);

router.post(
    '/updateTrack',
    Validators.Admin.updateTrackSchemaValidate,
    AdminController.updateTrack.post
);

// ============================================================================
// Exporting Admin Router:
// ============================================================================

module.exports = router;

// ============================================================================
