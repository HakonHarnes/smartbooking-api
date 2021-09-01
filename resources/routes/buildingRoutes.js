const authorizationController = require('../../auth/controllers/authorizationController');
const buildingController = require('../controllers/buildingController');

const express = require('express');
const router = express.Router();

// Routes
router
    .route('/')
    .get(authorizationController.requiresAccessToken, buildingController.getAll)
    .post(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('customer'),
        buildingController.post
    );

router
    .route('/:building_id')
    .put(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('customer'),
        buildingController.put
    )
    .delete(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('customer'),
        buildingController.delete
    );

module.exports = router;
