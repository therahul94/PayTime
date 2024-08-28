const express = require('express');
const { signup, signin,updateUser, searchUser } = require('../controller/user');
const { authMiddleware } = require('../middleware');
const router= express.Router();

router.post("/signup", signup);
router.post('/signin', signin);
router.put('/user', authMiddleware, updateUser);
router.get('/bulk', searchUser);

module.exports = router;