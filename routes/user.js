const express = require("express");
const router = express.Router();

const { requireToken, requireSignin, isAuth } = require("../controllers/auth");

const { userById } = require("../controllers/user");

// routes
router.get("/secret/:userId", 
    requireToken,
    requireSignin, 
    isAuth, 
    (req, res) => {
        res.json({
            user: req.profile
        });
    });

router.get("/user/:userId",
    requireToken, 
    requireSignin, 
    isAuth
    );

// params
router.param("userId", userById);

module.exports = router;
