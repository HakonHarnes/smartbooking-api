const { createRefreshToken, createAccessToken, createPasswordResetToken } = require('../utils/token');
const catchAsync = require('../../error/catchAsync');
const bcrypt = require('bcrypt');
const fs = require('fs');

const User = require('../../resources/models/userModel');
const Email = require('../email/email');

/**
 * @api {patch} /update-password Updates a user's password
 * @apiName UpdatePassword
 * @apiGroup Password
 *
 * @apiParam (Body) {String} oldPassword The user's email-address.
 * @apiParam (Body) {String} newPassword The user's first name.
 *
 * @apiSuccess {String} refreshToken Refresh token.
 * @apiSuccess {String} accessToken Access token.
 *
 * @apiError InvalidParameters Please provide old and new password.
 *
 */
exports.updatePassword = catchAsync(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body.data;
    if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Please provide old and new password.' });

    // Checks if password is correct
    if (!(await bcrypt.compare(oldPassword, req.user.hashed_password)))
        return res.status(401).json({ error: 'Incorrect password.' });

    // Validates password
    const response = validatePassword(req.user, newPassword);
    if (response.error) return res.status(400).json({ error: response.message });

    // Updates the users password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(req.con, req.user.email, hashedPassword);

    // Updates the token version
    req.user.token_version++;

    // Creates and sends refresh token
    res.cookie('rt', createRefreshToken(req.user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    // Creates and sends access token
    res.status(200).json({
        accessToken: createAccessToken(req.user),
    });
});

/**
 * @api {patch} /reset-password Resets a user's password
 * @apiName ResetPassword
 * @apiGroup Password
 *
 * @apiParam (Body) {String} newPassword The user's new password.
 * @apiParam (Body) {String} resetToken The user's password reset token.
 *
 * @apiSuccess {String} message Password was reset.
 *
 * @apiError InvalidParameters Please provide a new password.
 *
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
    const { newPassword } = req.body.data;
    if (!newPassword) return res.status(400).json({ error: 'Please provide a new password.' });

    // Validates password
    const response = validatePassword(req.user, newPassword);
    if (response.error) return res.status(400).json({ error: response.message });

    // Updates the users password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(req.con, req.user.email, hashedPassword);

    res.status(200).json({ message: 'Password was reset.' });
});

/**
 * @api {post} /forgot-password Forgot password functionality. Sends a reset-password email to the provided email.
 * @apiName ForgotPassword
 * @apiGroup Password
 *
 * @apiParam (Body) {String} email The user's email address.
 *
 * @apiSuccess {String} message Token sendt to email-address.
 *
 * @apiError InvalidParameters Please provide an email-address.
 * @apiError InvalidParameters There is no user with that email-address.
 *
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body.data;
    if (!email) return res.status(400).json({ error: 'Please provide an email-address.' });

    // Gets user from database
    const user = (await User.getByEmail(req.con, email))[0];
    if (!user) return res.status(400).json({ error: 'There is no user with that email-address.' });

    // Generates a password reset token and sends to email
    const resetToken = createPasswordResetToken(user, '15m');
    await new Email(email, user.first_name, `/reset-passord/${resetToken}`).sendPasswordReset();

    if (process.env.NODE_ENV === 'development')
        res.status(200).json({ resetToken, message: 'Token sendt to email-address.' });
    else res.status(200).json({ message: 'Token sendt to email-address.' });
});

// Validates the passord
const validatePassword = (data, password) => {
    const minPasswordLength = data.role === 'user' ? 8 : 12;

    // Checks if password is long enough
    if (password.length < minPasswordLength) {
        return { error: true, message: `Password must be minimum ${minPasswordLength} characters long.` };
    }

    // Checks if password includes first name, last name or email
    const pattern = new RegExp(`${data.first_name}|${data.last_name}|${data.email.split('@')[0]}`, 'gi');
    if (password.match(pattern)) {
        return { error: true, message: "Password can't contain your first name, last name or email." };
    }

    // Checks if the password is common
    const commonPasswords = fs.readFileSync(`auth/password-dictionaries/common-passwords-${minPasswordLength}.txt`);
    if (commonPasswords.includes(password)) {
        return { error: true, message: 'Dette er et vanlig passord. Vennligst velg et annet.' };
    }

    return { error: false };
};
