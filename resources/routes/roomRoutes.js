const authorizationController = require('../../auth/controllers/authorizationController');
const roomController = require('../controllers/roomController');

const express = require('express');
const router = express.Router();

// Routes
router
    .route('/')
    .get(authorizationController.requiresAccessToken, roomController.getAll)
    .post(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        roomController.post
    );
router.route('/search').get(authorizationController.requiresAccessToken, roomController.getAvailableRooms);
router
    .route('/:room_id')
    .get(authorizationController.requiresAccessToken, roomController.get)
    .delete(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        roomController.delete
    )
    .put(
        authorizationController.requiresAccessToken,
        authorizationController.restrictTo('admin', 'customer'),
        roomController.put
    );

module.exports = router;
