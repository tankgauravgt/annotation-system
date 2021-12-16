// ============================================================================
// External Modules:
// ============================================================================

const Joi = require('joi');
const errors = require('http-errors');

// ============================================================================
// Admin Schema Validation:
// ============================================================================

module.exports.Admin = {

    // register schema validation:
    registerSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().min(6).required(),
            });
            const { error } = schema.validate(req.body);
            if (error) 
                throw new errors.UnprocessableEntity(error.details[0].message);
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    },


    // login schema validation:
    loginSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                throw new errors.UnprocessableEntity(error.details[0].message);
            }
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    },

    // add track schema validation:
    addTrackSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                videoId: Joi.string().required(),
                clipOnset: Joi.number().required(),
                clipOffset: Joi.number().required(),
                possibleClasses: Joi.array().required()
            });
            const { error } = schema.validate(req.body);
            if (error) {
                throw new errors.UnprocessableEntity(error.details[0].message);
            }
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    },

    // update track schema validation:
    updateTrackSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                trackId: Joi.string().min(24).max(24).required(),
                newData: {
                    videoId: Joi.string().required(),
                    clipOnset: Joi.number().required(),
                    clipOffset: Joi.number().required(),
                    possibleClasses: Joi.array().items(Joi.string())
                }
            });
            const { error } = schema.validate(req.body);
            if (error) {
                throw new errors.UnprocessableEntity(error.details[0].message);
            }
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    },

    

};


// ============================================================================
// Annotator Schema Validation:
// ============================================================================

module.exports.Annotator = {

    // register schema validation:
    registerSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().min(6).required(),
            });
            const { error } = schema.validate(req.body);
            if (error) 
                throw new errors.UnprocessableEntity(error.details[0].message);
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    },


    // login schema validation:
    loginSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                throw new errors.UnprocessableEntity(error.details[0].message);
            }
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    }

};

// ============================================================================
// Verifier Schema Validation:
// ============================================================================

module.exports.Verifier = {

    // register schema validation:
    registerSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().min(6).required(),
            });
            const { error } = schema.validate(req.body);
            if (error) 
                throw new errors.UnprocessableEntity(error.details[0].message);
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    },


    // login schema validation:
    loginSchemaValidate: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                throw new errors.UnprocessableEntity(error.details[0].message);
            }
            next();
        } catch (err) {
            return res.status(err.status).json({message: err.message});
        }
    }

};
