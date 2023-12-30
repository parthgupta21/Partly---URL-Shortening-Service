const express = require("express");

const { handleUserSignUp, handleUserLoginIn } = require('../controllers/user');

const router = express.Router();

router.post('/', handleUserSignUp);
router.post('/login', handleUserLoginIn);
module.exports = router;