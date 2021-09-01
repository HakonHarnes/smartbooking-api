const authorizationController = require('../../auth/controllers/authorizationController');
const organizationController = require('../controllers/organizationController');

const express = require('express');
const router = express.Router();

// Routes

router
    .route('/')
    .post(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin'),
        organizationController.post
    )
    .get(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin'),
        organizationController.getAll
    );
router
    .route('/:organization_id')
    .get(authorizationController.requiresAccessToken, organizationController.get)
    .put(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin'),
        organizationController.put
    );

module.exports = router;
