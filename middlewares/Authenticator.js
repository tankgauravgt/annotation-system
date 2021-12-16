// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config()
const mongoose = require('mongoose');
const passport = require('passport');
const PassportLocal = require('passport-local');

// ============================================================================
// Internal Modules:
// ============================================================================

// models:
const Admin                 = require('../models/Admin');
const Annotator             = require('../models/Annotator');
const Verifier              = require('../models/Verifier');

// utils:
const EncryptionManager     = require('../utils/EncryptionManager.js');

// ============================================================================
// Middleware Logic:
// ============================================================================

const adminCustomFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const annotatorCustomFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifierCustomFields = {
    usernameField: 'username',
    passwordField: 'password'
};

// ============================================================================
// "Admin" Passport-Local Verifier Callback:
// ============================================================================

const adminVerifyCallback = async (username, password, done) => {
    try {
        // find user by username:
        const existingAdmin = await Admin.findOne({ username: username });
        
        // if user not found:
        if (!existingAdmin) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // check if password is correct:
        const isPasswordValid = EncryptionManager.verifyPassword(password, existingAdmin.hash, existingAdmin.salt);
        
        // if password is not valid:
        if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        
        // if password is valid, go ahead:
        return done(null, existingAdmin);
    
    } catch (error) {
        // if error, handle it:
        return done(error);
    }
};


// ============================================================================
// "Annotator" Passport-Local Verifier Callback:
// ============================================================================

const annotatorVerifyCallback = async (username, password, done) => {
    try {
        // find user by username:
        const existingAnnotator = await Annotator.findOne({ username: username });
        
        // if user not found:
        if (!existingAnnotator) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // check if password is correct:
        const isPasswordValid = EncryptionManager.verifyPassword(password, existingAnnotator.hash, existingAnnotator.salt);
        
        // if password is not valid:
        if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        
        // if password is valid, go ahead:
        return done(null, existingAnnotator);
    
    } catch (error) {
        // if error, handle it:
        return done(error);
    }
};


// ============================================================================
// "Verifier" Passport-Local Verifier Callback:
// ============================================================================

const verifierVerifyCallback = async (username, password, done) => {
    try {
        // find user by username:
        const existingVerifier = await Verifier.findOne({ username: username });
        
        // if user not found:
        if (!existingVerifier) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // check if password is correct:
        const isPasswordValid = EncryptionManager.verifyPassword(password, existingVerifier.hash, existingVerifier.salt);
        
        // if password is not valid:
        if (!isPasswordValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        
        // if password is valid, go ahead:
        return done(null, existingVerifier);
    
    } catch (error) {
        // if error, handle it:
        return done(error);
    }
};

// ============================================================================
// Passport-Local Strategy Object:
// ============================================================================

const adminLocalStrategy = new PassportLocal.Strategy(adminCustomFields, adminVerifyCallback);
const annotatorLocalStrategy = new PassportLocal.Strategy(annotatorCustomFields, annotatorVerifyCallback);
const verifierLocalStrategy = new PassportLocal.Strategy(verifierCustomFields, verifierVerifyCallback);

passport.use('admin-local', adminLocalStrategy);
passport.use('annotator-local', annotatorLocalStrategy);
passport.use('verifier-local', verifierLocalStrategy);


// ============================================================================
// Serialize User to Session:
// ============================================================================

passport.serializeUser((user, done) => {
    done(null, JSON.stringify({id: user._id, role: user.role}));
});

// ============================================================================
// Deserialize User from Session:
// ============================================================================

passport.deserializeUser((obj, done) => {
    
    const {id, role} = JSON.parse(obj);
    
    if (role === 'admin') {
        Admin.findById(id, (err, user) => {
            done(err, user);
        });
    }
    
    if (role === 'annotator') {
        Annotator.findById(id, (err, user) => {
            done(err, user);
        });
    }

    if (role === 'verifier') {
        Verifier.findById(id, (err, user) => {
            done(err, user);
        });
    }

});
