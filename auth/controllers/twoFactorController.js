const { createAccessToken, createRefreshToken, createVerificationToken } = require('../utils/token');
const catchAsync = require('../../error/catchAsync');
const { authenticator, totp } = require('otplib');
const qrcode = require('qrcode');

const User = require('../../resources/models/userModel');
const Email = require('../email/email');

// Time-based one time password options (for email)
totp.options = {
    window: 10,
};

// Authenticator options (for Authenticator applications)
authenticator.options = {
    window: 1,
};

exports.sendVerificationCode = catchAsync(async (user) => {
    const code = totp.generate(user.secret_token);
    await new Email(user.email, user.first_name, 'page').sendVerificationCode(code);
});

/**
 * @api {post} /verify Verifies verification code from email or authenticator application
 * @apiName VerifyVerificationCode
 * @apiGroup TwoFactor
 *
 * @apiParam (Body) {String} code The verification code
 *
 * @apiSuccess {String} refreshToken Refresh token.
 * @apiSuccess {String} accessToken Access token.
 * @apiSuccess {User} user The user data.
 *
 * @apiError InvalidParameters Please provide the verification code.
 * @apiError InvalidVerificationCode Invalid verification code.
 *
 */
exports.verify = catchAsync(async (req, res, next) => {
    const { code } = req.body.data;
    if (!code) return res.status(400).json({ error: 'Please provide the verification code.' });

    // Verifies the code
    const verified =
        authenticator.verify({ secret: req.user.secret_token, token: code }) ||
        totp.verify({ secret: req.user.secret_token, token: code });

    if (!verified) return res.status(401).json({ error: 'Unauthorized.' });

    // Enables two-factor authentication (if it isn't already)
    if (!req.user.two_factor) await User.enableTwoFactorAuth(req.con, req.user.email);

    // Creates and sends refresh token
    res.cookie('rt', createRefreshToken(req.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    // Creates and sends access token
    res.status(200).json({
        user: {
            user_id: req.user.user_id,
            role: req.user.role,
            email: req.user.email,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            two_factor: 1,
            two_factor_method: req.user.two_factor_method,
            is_active: req.user.is_active,
            customer_id: req.user.customer_id,
        },
        accessToken: createAccessToken(req.user),
    });
});

/**
 * @api {patch} /enable-two-factor Enables two factor authentication
 * @apiName EnableTwoFactorAuth
 * @apiGroup TwoFactor
 *
 * @apiParam (Body) {String} twoFactorMethod The two factor method: Email or app
 *
 * @apiSuccess {String} verificationToken Verification token.
 *
 * @apiError InvalidParameters Please provide 2FA type: Email or app.
 *
 */
exports.enableTwoFactorAuth = catchAsync(async (req, res, next) => {
    const { twoFactorMethod } = req.body.data;
    if (twoFactorMethod !== 'email' && twoFactorMethod !== 'app')
        return res.status(400).json({ error: 'Please provide 2FA type: Email or app.' });

    // Sets secret in database
    const secret = authenticator.generateSecret();
    const response = await User.initializeTwoFactorAuth(req.con, req.user.email, secret, twoFactorMethod);
    if (response.affectedRows === 0) {
        console.log('Zero rows affected - secret not set.');
        return res.status(400).json({ error: 'Internal server error.' });
    }

    req.user.secret_token = secret;

    // Sends code to user by email
    if (twoFactorMethod === 'email') {
        this.sendVerificationCode(req.user);
        return res.status(200).json({
            message: 'Verification code sendt to email-address.',
            verificationToken: createVerificationToken(req.user),
        });
    }

    // Sends QR-code to be scanned by app
    else if (twoFactorMethod === 'app') {
        const otpauth = authenticator.keyuri(req.user.email, 'SmartBooking', secret);
        qrcode.toDataURL(otpauth, (_, imageUrl) => {
            return res.status(200).json({
                qr: imageUrl,
                verificationToken: createVerificationToken(req.user),
            });
        });
    } else res.status(500).json({ error: 'Internal server error.' });
});

/**
 * @api {patch} /disable-two-factor Disables two factor authentication
 * @apiName DisableTwoFactorAuth
 * @apiGroup TwoFactor
 *
 * @apiParam (Body) {String} accessToken Access token
 *
 * @apiSuccess {String} message Two-factor authentication disabled.
 *
 */
exports.disableTwoFactorAuth = catchAsync(async (req, res, next) => {
    await User.disableTwoFactorAuth(req.con, req.user.email);
    res.status(200).json({ message: 'Two-factor authentication disabled.' });
});
