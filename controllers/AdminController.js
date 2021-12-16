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
const Admin             = require('../models/Admin');
const Track             = require('../models/Track');

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
                let existingAdmin = await Admin.findOne({username: username});
                if (existingAdmin) {
                    throw new errors.Conflict('Admin already exists.');
                }
                let {salt, hash} = EncryptionManager.generateHash(password);
                newAdmin = new Admin({username: username, salt: salt, hash: hash});
                await newAdmin.save();
                return res.redirect(200, '/admin/login');
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
                let existingAdmin = await Admin.findOne({username: username});
                if (!existingAdmin) {
                    throw new errors.NotFound('Admin not found.');
                }
                if(!EncryptionManager.verifyPassword(password, existingAdmin.hash, existingAdmin.salt)) {
                    throw new errors.Unauthorized('Invalid password.');
                }
                return res.redirect(200, '/admin/addTrack');
            } catch (err) {
                return res.status(err.status).json({message: err.message});
            }
        },
    },

    // logout an admin:
    logout: async (req, res, next) => {
        req.logout();
        return res.redirect(200, '/admin/login');
    },

    // protected page:
    protected: async (req, res, next) => {
        try {
            if(!req.isAuthenticated() || req.user.role !== 'admin') {
                req.logout();
                return res.redirect(401, '/admin/login');
            }
            return res.sendFile('static/protected.html', {root: './'});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },

    // ====================================================
    // Add new Track:
    // ====================================================

    // add new track form:
    addTrack: {

        // add new track form:
        get: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }
                return res.sendFile('static/addTrack.html', {root: './'});
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },

        // process add new track form:
        post: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }
                let {videoId, clipOnset, clipOffset, possibleClasses} = req.body;
                let newTrack = new Track({
                    videoId: videoId,
                    clipOnset: clipOnset,
                    clipOffset: clipOffset,
                    possibleClasses: possibleClasses,
                    lastModifiedBy: req.user._id
                });
                await newTrack.save();
                await Admin.findOneAndUpdate({username: req.user.username}, {$push: {managedTracks: newTrack._id}});
                return res.redirect(200, '/admin/addTrack');
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        }

    },

    // add new tracks form:
    addTracksBulk: {

        // add new track form:
        get: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }
                return res.sendFile('static/addTracksBulk.html', {root: './'});
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },

        // process add new track form:
        post: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }
                console.log(JSON.parse(req.body.json));
                return res.redirect(200, '/admin/addTracksBulk');    
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        }

    },


    // ====================================================
    // Update Existing Track:
    // ====================================================

    updateTrack: {

        // update track form:
        get: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }
                let {trackId} = req.params;
                let track = await Track.findById(trackId);
                if(!track) {
                    throw new errors.NotFound('Track not found.');
                }
                return res.sendFile('static/updateTrack.html', {root: './'});
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },

        // process update track form:
        post: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }

                let {trackId} = req.body;
                let {videoId, clipOnset, clipOffset, possibleClasses} = req.body.newData;

                let track = await Track.findById(mongoose.Types.ObjectId(trackId));

                if(!track) {
                    throw new errors.NotFound('Track not found.');
                }
                await Track.findByIdAndUpdate(trackId, {
                    videoId: videoId,
                    clipOnset: clipOnset,
                    clipOffset: clipOffset,
                    possibleClasses: possibleClasses,
                    modifiedBy: req.user._id
                });
                return res.redirect(200, '/admin/updateTrack');
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        }

    },


    // ====================================================
    // Delete Track:
    // ====================================================
    
    deleteTrack: {

        // delete track form:
        get: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }
                let {trackId} = req.params;
                let track = await Track.findById(trackId);
                if(!track) {
                    throw new errors.NotFound('Track not found.');
                }
                return res.sendFile('static/deleteTrack.html', {root: './'});
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },

        // process delete track form:
        post: async (req, res, next) => {
            try {
                if(!req.isAuthenticated() || req.user.role !== 'admin') {
                    req.logout();
                    return res.redirect(401, '/admin/login');
                }
                let {trackId} = req.body;
                let track = await Track.findById(trackId);
                if(!track) {
                    throw new errors.NotFound('Track not found.');
                }
                await Track.findByIdAndRemove(trackId);
                await Admin.findOneAndUpdate({username: req.user.username}, {$pull: {managedTracks: trackId}});
                return res.redirect(200, '/admin/deleteTrack');
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        }
    },

};
