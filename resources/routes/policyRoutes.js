const authorizationController = require('../../auth/controllers/authorizationController');
const bookingPolicyController = require('../controllers/policyController');

const express = require('express');
const router = express.Router();

// Routes
router
    .route('/')
    .get(authorizationController.requiresAccessToken, bookingPolicyController.get)

    .post(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        bookingPolicyController.post
    );
router
    .route('/:id')
    .delete(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        bookingPolicyController.delete
    )
    .put(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        bookingPolicyController.put
    );

module.exports = router;
