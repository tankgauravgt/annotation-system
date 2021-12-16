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
const Annotator = require('../models/Annotator');

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
                let existingAnnotator = await Annotator.findOne({username: username});
                if (existingAnnotator) {
                    throw new errors.Conflict('Annotator already exists.');
                }
                let {salt, hash} = EncryptionManager.generateHash(password);
                newAnnotator = new Annotator({username: username, salt: salt, hash: hash});
                await newAnnotator.save();
                return res.redirect(200, '/annotator/login');
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
                let existingAnnotator = await Annotator.findOne({username: username});
                if (!existingAnnotator) {
                    throw new errors.NotFound('Annotator not found.');
                }
                if(!EncryptionManager.verifyPassword(password, existingAnnotator.hash, existingAnnotator.salt)) {
                    throw new errors.Unauthorized('Invalid password.');
                }
                return res.redirect(200, '/annotator/protected');   
            } catch (err) {
                return res.status(err.status).json({message: err.message});
            }
        },
    },

    // logout an annotator:
    logout: async (req, res, next) => {
        req.logout();
        return res.redirect(200, '/annotator/login');
    },

    // protected page:
    protected: async (req, res, next) => {
        try {
            if(!req.isAuthenticated() || req.user.role !== 'annotator') {
                req.logout();
                return res.redirect(401, '/annotator/login');
            }
            return res.sendFile('static/protected.html', {root: './'});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
    
};
