// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const mongoose = require('mongoose');


// ============================================================================
// Track Schema:
// ============================================================================

const TrackSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    clipOnset: {
        type: Number,
        required: true
    },
    clipOffset: {
        type: Number,
        required: true
    },
    possibleClasses: {
        type: [String],
        required: true
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Admin',
        required: true
    },
    isAnnotated: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    latestAnnotation: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Annotation',
        default: null
    },
});


// ============================================================================
// Exporting Track Model:
// ============================================================================

module.exports = mongoose.model('Track', TrackSchema);

// ============================================================================
