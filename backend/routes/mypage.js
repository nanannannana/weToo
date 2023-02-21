const express = require('express');
const router = express.Router();
const mypage = require('../controller/mypage');

router.post('/info', mypage.My_info);

module.exports = router;
