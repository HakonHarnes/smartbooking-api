const authorizationController = require('../../auth/controllers/authorizationController');
const reservationController = require('../controllers/reservationController');

const express = require('express');
const router = express.Router();

// Routes
router
    .route('/')
    .get(authorizationController.requiresAccessToken, reservationController.getAll)
    .post(authorizationController.requiresAccessToken, reservationController.post);

router
    .route('/:reservation_id')
    .get(authorizationController.requiresAccessToken, reservationController.get)
    .put(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        authorizationController.requiresAccessToken,
        reservationController.put
    )
    .delete(authorizationController.requiresAccessToken, reservationController.delete);

module.exports = router;
