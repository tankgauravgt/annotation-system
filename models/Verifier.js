// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const mongoose = require('mongoose');


// ============================================================================
// Verifier Schema:
// ============================================================================

const VerifierSchema = new mongoose.Schema({

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
        default: 'verifier'
    },

    verifiedAnnotations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Annotation'
    }]

});


// ============================================================================
// Exporting Verifier Model:
// ============================================================================

module.exports = mongoose.model('Verifier', VerifierSchema);

// ============================================================================
