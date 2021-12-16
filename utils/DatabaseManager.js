// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const mongoose = require('mongoose');


// ============================================================================
// Module Logic:
// ============================================================================

module.exports = {

    // connect to mongoose database:
    connect: function() {
        let dbAddr = process.env.DATABASE_ADDR;
        let dbPort = process.env.DATABASE_PORT;
        let dbName = process.env.DATABASE_NAME;
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = mongoose.connect(`${dbAddr}:${dbPort}/${dbName}`, options)    
            .then(client => client.connection.getClient())
            .catch(err => err);    
        return mongoClient;
    },

    // disconnect from mongoose database:
    disconnect: mongoose.disconnect

};

// ============================================================================
