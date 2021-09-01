const authorizationController = require('../../auth/controllers/authorizationController');
const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

// Routes
router
    .route('/')
    .get(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        userController.getAll
    );

router
    .route('/:user_id')
    .get(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        userController.get
    )
    .put(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        userController.put
    )
    .delete(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        userController.delete
    );

module.exports = router;
