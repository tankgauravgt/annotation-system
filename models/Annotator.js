// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const mongoose = require('mongoose');


// ============================================================================
// Annotator Schema:
// ============================================================================

const AnnotatorSchema = new mongoose.Schema({

    username: { 
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'annotator'
    },

    annotations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Annotation'
    }],

    managedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Verifier'
    }

});


// ============================================================================
// Exporting Annotator Model:
// ============================================================================

module.exports = mongoose.model('Annotator', AnnotatorSchema);

// ============================================================================
