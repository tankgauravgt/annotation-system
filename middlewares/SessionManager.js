// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config()
const session = require('express-session');
const MongoStore = require('connect-mongo');


// ============================================================================
// Middleware Logic:
// ============================================================================

module.exports = {
    createSessionManager: (mongoClient) => {
        return session({
            secret: process.env.SESSION_SECRET, 
            store: MongoStore.create({
                client: mongoClient,
                collection: 'sessions'
            }),
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: eval(process.env.COOKIE_MAX_AGE)
            }
        });
    }    
};
