const authenticationController = require('../controllers/authenticationController');
const authorizationController = require('../controllers/authorizationController');
const twoFactorController = require('../controllers/twoFactorController');
const passwordController = require('../controllers/passwordController');

const express = require('express');
const router = express.Router();

// Login and logout
router.post('/login', authenticationController.login);
router.get('/logout', authenticationController.logout);

// Registering users
router.post(
    '/register-user',
    authorizationController.requiresAccessToken,
    authorizationController.restrictTo('admin', 'customer'),
    authenticationController.registerUser
);

// Registering customers
router.post(
    '/register-customer',
    authorizationController.requiresAccessToken,
    authorizationController.restrictTo('admin'),
    authenticationController.registerCustomer
);

// Registering administrators
router.post(
    '/register-admin',
    authorizationController.requiresAccessToken,
    authorizationController.restrictTo('admin'),
    authenticationController.registerAdmin
);

// Token refreshing
router.post('/refresh', authorizationController.requiresRefreshToken, authenticationController.refresh);

// Password management
router.post('/forgot-password', passwordController.forgotPassword);
router.patch('/update-password', authorizationController.requiresAccessToken, passwordController.updatePassword);
router.patch(
    '/reset-password/:resetToken',
    authorizationController.requiresPasswordResetToken,
    passwordController.resetPassword
);

// Two factor authentication
router.post('/verify', authorizationController.requiresVerificationToken, twoFactorController.verify);
router.patch(
    '/disable-two-factor',
    authorizationController.requiresAccessToken,
    twoFactorController.disableTwoFactorAuth
);
router.patch(
    '/enable-two-factor',
    authorizationController.requiresAccessToken,
    twoFactorController.enableTwoFactorAuth
);

module.exports = router;
