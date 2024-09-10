const express = require('express');
const { signup, signin,updateUser, searchUser, userDetails } = require('../controller/user');
const { authMiddleware } = require('../middleware');
const router= express.Router();

router.post("/signup", signup);
router.post('/signin', signin);
router.get("/userDetails", authMiddleware, userDetails);
router.put('/user', authMiddleware, updateUser);
router.get('/bulk', authMiddleware, searchUser);

module.exports = router;