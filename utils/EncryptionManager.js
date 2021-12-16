// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const crypto = require('crypto');


// ============================================================================
// Module Logic:
// ============================================================================

module.exports = {
    
    generateHash: function(password) {
        let salt = crypto.randomBytes(16).toString('hex');
        let hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex');
        return { salt: salt, hash: hash };
    },

    verifyPassword: function(password, hash, salt) {
        let hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex');
        return hashPassword === hash;
    }
};

// ============================================================================
