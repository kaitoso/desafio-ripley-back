  
const express = require("express");
const router = express.Router();


const { requireToken, requireSignin, isAuth, } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { create, read, destinatarioById, listDestinatarios, } = require("../controllers/destinatario");


// routes
router.post("/destinatario/create/:userId",
    requireToken,
    requireSignin,
    isAuth,
    create
);

router.get("/destinatario/list/:userId", 
    requireToken,
    requireSignin, 
    isAuth, 
    listDestinatarios
    );

router.get("/destinatario/:userId/:destinatarioId", 
    requireToken,
    requireSignin, 
    isAuth, 
    read
    );



// params
router.param("destinatarioId",destinatarioById)
router.param("userId", userById);

module.exports = router;
