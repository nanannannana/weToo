const express = require('express');
const router = express.Router();
const mypage = require('../controller/mypage');

router.post('/info', mypage.Info);
router.post('/Donation', mypage.searchDonation);

module.exports = router;
