const express = require('express');
const router = express.Router();
const mypage = require('../controller/mypage');

router.post('/info', controller.My_info);
router.post('/Donation', mypage.searchDonation);

module.exports = router;
