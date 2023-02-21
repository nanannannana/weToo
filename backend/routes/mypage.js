const express = require('express');
const controller = require('../controller/mypage');
const router = express.Router();

router.post('/info', controller.My_info);

module.exports = router;
