const express = require("express");
const router = express.Router();

const { create, listTransferencias } = require("../controllers/transferencia");
const { requireToken, requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// routes

router.post("/transferencia/create/:userId", 
    requireToken,
    requireSignin, 
    isAuth, 
    create
    );


router.get("/transferencias/:userId", 
    requireToken,
    requireSignin, 
    isAuth, 
    listTransferencias
    );

// params
router.param("userId", userById);


module.exports = router;