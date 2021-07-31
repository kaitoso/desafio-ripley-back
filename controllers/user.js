const User = require("../models/user");
const { Destinatario } = require("../models/destinatario");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest 

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};





