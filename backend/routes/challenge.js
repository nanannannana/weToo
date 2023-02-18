const express = require('express');
const router = express.Router();
const challenge = require('../controller/challenge');

router.post('/putData', challenge.putData);
router.post('/searchData', challenge.searchData);
router.post('/proofUpload', challenge.proofUpload);

module.exports = router;
