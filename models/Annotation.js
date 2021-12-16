// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const mongoose = require('mongoose');


// ============================================================================
// Annotation Schema:
// ============================================================================

const AnnotationSchema = new mongoose.Schema({

    submitter: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin',
        required: true
    }],
    
    annotator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Annotator',
        required: true
    }],

    verifiers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Verifier'
    }],

    track: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Track',
        required: true
    }],

    isVerified: {
        type: Boolean,
        default: false
    },

    annotationData: {
        type: String,
        required: true
    },

});


// ============================================================================
// Exporting Annotation Model:
// ============================================================================

module.exports = mongoose.model('Annotation', AnnotationSchema);

// ============================================================================
