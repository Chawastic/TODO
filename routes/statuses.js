var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var StatusService = require('../services/StatusService');
const isAuth = require('../middleware/middleware');
var db = require("../models");
var statusService = new StatusService(db);
router.use(jsend.middleware);

// Return all the statuses from the database
router.get('/', isAuth, async (req, res) => {
    try {
        const statuses = await statusService.getAllStatuses();
        res.jsend.success({ statuses });
    } catch (error) {
        console.error(error);
        res.status(500).jsend.error({
            message: 'An error occurred while fetching statuses',
            error: error.message
        });
    }
});

module.exports = router;