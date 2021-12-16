// ============================================================================
// External Modules:
// ============================================================================

require('dotenv').config();
const express = require('express');
const passport = require('passport');


// ============================================================================
// Internal Modules:
// ============================================================================

// routers:
const MainRouter            = require('./routes/MainRouter');

// utils:
const DatabaseManager       = require('./utils/DatabaseManager');

// middlewares:
const SessionManager        = require('./middlewares/SessionManager');


// ============================================================================
// Applictaion Initialization:
// ============================================================================

// initialize the app:
const app = express();

// database connection:
let connection = DatabaseManager.connect();

// decode request data:
app.use(express.json({extended: true, limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));


// ============================================================================
// Middlewares:
// ============================================================================

// session manager:
app.use(SessionManager.createSessionManager(connection));

// login manager:
require('./middlewares/Authenticator');
app.use(passport.initialize());
app.use(passport.session());

// router middlewares:
app.use('/', MainRouter);


// ============================================================================
// Server Initialization:
// ============================================================================

const addr = process.env.APP_ADDR;
const port = process.env.APP_PORT;

app.listen(port, addr, () => {
    console.log(`Application started at http://${addr}:${port}.`);
});

// ============================================================================
