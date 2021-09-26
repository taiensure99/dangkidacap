const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// newsController.index

router.get('/list', siteController.show);
router.post('/store', siteController.store);
router.get('/', siteController.index);

module.exports = router;
