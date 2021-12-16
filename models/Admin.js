// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const mongoose = require('mongoose');


// ============================================================================
// Admin Schema:
// ============================================================================

const AdminSchema = new mongoose.Schema({

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
        default: 'admin'
    },

    managedVerifiers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Verifier'    
    }],

});


// ============================================================================
// Exporting Admin Model:
// ============================================================================

module.exports = mongoose.model('Admin', AdminSchema);

// ============================================================================
