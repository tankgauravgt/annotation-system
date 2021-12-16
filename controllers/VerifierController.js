// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const mongoose = require('mongoose');
const errors = require('http-errors');

// ============================================================================
// Internal Modules:
// ============================================================================

// models:
const Verifier = require('../models/Verifier');

// utils:
const EncryptionManager = require('../utils/EncryptionManager');


// ============================================================================
// Controller Methods:
// ============================================================================

module.exports = {

    // ====================================================
    // registration functionality:
    // ====================================================
    
    register: {
        
        // registration form:
        get: async (req, res, next) => {
            try {
                res.sendFile('static/register.html', {root: './'});
            } catch (err) {
                return res.status(err.status).json({message: err.message});
            }
        },

        // process registration form:
        post: async (req, res, next) => {
            try {
                let {username, password} = req.body;
                let existingVerifier = await Verifier.findOne({username: username});
                if (existingVerifier) {
                    throw new errors.Conflict('Verifier already exists.');
                }
                let {salt, hash} = EncryptionManager.generateHash(password);
                newVerifier = new Verifier({username: username, salt: salt, hash: hash});
                await newVerifier.save();
                return res.redirect(200, '/verifier/login');
            } catch (err) {
                return res.status(err.status).json({message: err.message});
            }
        }
    },


    // ====================================================
    // login functionality:
    // ====================================================
    
    login: {

        // login form:
        get: async function(req, res, next) {
            try {
                return res.sendFile('static/login.html', {root: './'});
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },

        // process login form:
        post: async (req, res, next) => {
            try {
                let {username, password} = req.body;
                let existingVerifier = await Verifier.findOne({username: username});
                if (!existingVerifier) {
                    throw new errors.NotFound('Verifier not found.');
                }
                if(!EncryptionManager.verifyPassword(password, existingVerifier.hash, existingVerifier.salt)) {
                    throw new errors.Unauthorized('Invalid password.');
                }
                return res.redirect(200, '/verifier/protected');   
            } catch (err) {
                return res.status(err.status).json({message: err.message});
            }
        },
    },

    // logout an verifier:
    logout: async (req, res, next) => {
        req.logout();
        return res.redirect(200, '/verifier/login');
    },

    // protected page:
    protected: async (req, res, next) => {
        try {
            if(!req.isAuthenticated() || req.user.role !== 'verifier') {
                req.logout();
                return res.redirect(401, '/verifier/login');
            }
            return res.sendFile('static/protected.html', {root: './'});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

};
