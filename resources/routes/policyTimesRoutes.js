const authorizationController = require('../../auth/controllers/authorizationController');
const policyTimesController = require('../controllers/policyTimesController');

const express = require('express');
const router = express.Router();

// Routes
router
    .route('/')
    .post(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        policyTimesController.post
    )
    .put(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        policyTimesController.put
    )
    .get(authorizationController.requiresAccessToken, policyTimesController.get);

router
    .route('/:id')
    .delete(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        policyTimesController.delete
    );

module.exports = router;
