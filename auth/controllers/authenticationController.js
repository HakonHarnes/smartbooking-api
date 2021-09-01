const {
    createAccessToken,
    createRefreshToken,
    createVerificationToken,
    createPasswordResetToken,
} = require('../utils/token');
const { sendVerificationCode } = require('./twoFactorController');
const catchAsync = require('../../error/catchAsync');
const bcrypt = require('bcrypt');

const User = require('../../resources/models/userModel');
const Email = require('../email/email');

/**
 * @api {post} /login Login a user
 * @apiName LoginUser
 * @apiGroup Authentication
 *
 * @apiParam (Body) {String} email The user's email-address.
 * @apiParam (Body) {String} password The user's password.
 *
 * @apiSuccess {String} accessToken Logged in user.
 * @apiSuccess {String} refreshToken Logged in user.
 * @apiSuccess {User} user The user data.
 *
 * @apiError InvalidParameters Please provide email and password.
 * @apiError Unauthorized Invalid login credentials.
 *
 */
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body.data;
    if (!email || !password) return res.status(400).json({ error: 'Please provide email and password.' });

    // Gets user from database and checks if password is correct
    const user = (await User.getByEmail(req.con, email))[0];
    if (!user || !(await bcrypt.compare(password, user.hashed_password)))
        return res.status(401).json({ error: 'Invalid login credentials.' });

    // Sends verification code if 2FA is enabled
    if (user.two_factor) {
        if (user.two_factor_method === 'email') sendVerificationCode(user);

        return res.status(200).json({
            verificationToken: createVerificationToken(user),
        });
    }

    // Otherwise: Send refresh and access tokens + the user data

    // Creates and sends refresh token
    res.cookie('rt', createRefreshToken(user), {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        expires:
            user.role === 'user'
                ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
                : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    // Creates access token
    const accessToken = createAccessToken(user);

    // Deletes sensitive user data
    delete user.hashed_password;
    delete user.secret_token;
    delete user.token_version;

    // Sends access token and user data
    res.status(200).json({
        user,
        accessToken,
    });
});

/**
 * @api {get} /logout Logout a user
 * @apiName LogoutUser
 * @apiGroup Authentication
 *
 * @apiParam (Body) {String} accessToken The user's access token
 *
 * @apiSuccess {Cookie} cookie User logged out.
 *
 */
exports.logout = catchAsync(async (req, res, next) => {
    res.cookie('rt', '', {
        httpOnly: true,
        sameSite: 'none',
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ accessToken: '' });
});

/**
 * @api {get} /refresh Refresh an access token
 * @apiName RefreshToken
 * @apiGroup Authentication
 *
 * @apiParam (Body) {String} refreshToken The user's refresh token
 *
 * @apiSuccess {String} accessToken Refreshed access token.
 * @apiSuccess {User} user The user data.
 *
 * @apiError InvalidRefreshToken The refresh token is invalid.
 *
 */
exports.refresh = catchAsync(async (req, res, next) => {
    // Creates access token
    const accessToken = createAccessToken(req.user);

    // Deletes sensitive user data
    delete req.user.hashed_password;
    delete req.user.secret_token;
    delete req.user.token_version;

    res.status(200).json({
        user: req.user,
        accessToken,
    });
});

/**
 * @api {post} /register-user Registers a new user
 * @apiName RegisterUser
 * @apiGroup Authentication
 *
 * @apiParam (Body) {String} email The user's email-address.
 * @apiParam (Body) {String} firstName The user's first name.
 * @apiParam (Body) {String} lastName The user's last name.
 * @apiParam (Body) {Number} organization_id The user's organization id.
 * @apiParam (Body) {String} accessToken The user's access token
 *
 * @apiSuccess {String} message Token sent to email-address.
 *
 * @apiError InvalidParameters Please provide first name, last name and email-address.
 *
 */
exports.registerUser = (req, res, next) => {
    req.role = 'user';

    if (req.body.data.users) registerUsers(req, res, next);
    else register(req, res, next);
};

/**
 * @api {post} /register-customer Registers a new customer
 * @apiName RegisterCustomer
 * @apiGroup Authentication
 *
 * @apiParam (Body) {String} email The user's email-address.
 * @apiParam (Body) {String} firstName The user's first name.
 * @apiParam (Body) {String} lastName The user's last name.
 * @apiParam (Body) {Number} organization_id The user's organization id.
 * @apiParam (Body) {String} accessToken The user's access token
 *
 * @apiSuccess {String} message Token sent to email-address.
 *
 * @apiError InvalidParameters Please provide first name, last name and email-address.
 *
 */
exports.registerCustomer = catchAsync(async (req, res, next) => {
    req.role = 'customer';
    register(req, res, next);
});

/**
 * @api {post} /register-admin Registers a new admin
 * @apiName RegisterAdmin
 * @apiGroup Authentication
 *
 * @apiParam (Body) {String} email The user's email-address.
 * @apiParam (Body) {String} firstName The user's first name.
 * @apiParam (Body) {String} lastName The user's last name.
 * @apiParam (Body) {Number} organization_id The user's organization id.
 * @apiParam (Body) {String} accessToken The user's access token
 *
 * @apiSuccess {String} message Token sent to email-address.
 *
 * @apiError InvalidParameters Please provide first name, last name and email-address.
 *
 */
exports.registerAdmin = catchAsync(async (req, res, next) => {
    req.role = 'admin';
    register(req, res, next);
});

// Registers a user, customer or admin
const register = catchAsync(async (req, res, next) => {
    const { email, firstName, lastName, organization_id } = req.body.data;
    if (!email || !firstName || !lastName)
        return res.status(400).json({ error: 'Please provide first name, last name and email-address.' });

    if (!organization_id && req.role !== 'admin')
        return res.status(400).json({ error: 'Please provide an organization id.' });

    // Creates a new user in the database with an empty password
    const data = await User.post(req.con, email, firstName, lastName, req.role, organization_id);
    const user = { email, firstName, lastName, role: req.role, token_version: 0 };

    // Generates a password reset token and sends to email
    const resetToken = createPasswordResetToken(user, '30d');
    await new Email(email, firstName, `/sett-passord/${resetToken}`).sendWelcome();

    // Sends success response to the user
    return res.status(200).json({ message: 'Token sendt to email-address.', data });
});

// Registers a batch of new users
const registerUsers = catchAsync(async (req, res, next) => {
    const { users } = req.body.data;
    if (!users) return res.status(400).json({ error: 'Please provide the users to register.' });

    let errors = [];
    let warnings = [];
    let successList = [];

    // Creates a new user in the database with an empty password
    for (const user of users) {
        const { email, firstName, lastName, organization_id } = user;
        if (!email || !firstName || !lastName || !organization_id) {
            return errorList.push({});
        }

        const newUser = { email, firstName, lastName, token_version: 0 };
        try {
            await User.post(req.con, email, firstName, lastName, req.role, organization_id);
            successList.push(newUser);
        } catch (error) {
            if (error.toString().includes('ER_DUP_ENTRY')) warnings.push(newUser.email);
            else errors.push(newUser.email);
        }
    }

    // Sends success and error statistics
    res.status(200).json({ errors, warnings });

    // Generates a password reset token and sends to email
    for (const user of successList) {
        const resetToken = createPasswordResetToken(user, '30d');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await new Email(user.email, user.firstName, `/sett-passord/${resetToken}`).sendWelcome();
    }
});
