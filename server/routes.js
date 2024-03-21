const express = require('express');
const router = express.Router();
const { submit, getSubmissions } = require('./controllers/submissionController');
router.post('/submit', submit);
router.get('/submissions', getSubmissions);
module.exports = router; 