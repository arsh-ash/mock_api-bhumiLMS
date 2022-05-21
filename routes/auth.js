const express = require("express");
const {
    register,
    login,
    multi_register
} = require("../controller/auth");


const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.post("/multi/register",multi_register);


module.exports = router;