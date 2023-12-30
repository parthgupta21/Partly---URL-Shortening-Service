const express = require('express');
const {handeGenerateNewShortURL, handleGetAnalytics} = require('../controllers/url')
const router = express.Router();

router.post("/", handeGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics )
module.exports = router;

