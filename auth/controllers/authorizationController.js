const catchAsync = require('../../error/catchAsync');
const jwt = require('jsonwebtoken');

const User = require('../../resources/models/userModel');

// Middleware function for checking if access token is valid
exports.requiresAccessToken = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'TEST') return next();

    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer'))
        return res.status(401).json({ error: 'Unauthorized' });

    // Verifies the access token
    const accessToken = authorizationHeader.split(' ')[1];
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Gets user from database and verifies the token version
    const user = (await User.getByEmail(req.con, payload.email))[0];

    if (!user || user.token_version !== payload.tokenVersion) return res.status(401).json({ error: 'Unauthorized.' });
    req.user = user;

    next();
});

// Middleware function for checking if verification token is valid
exports.requiresVerificationToken = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'TEST') return next();

    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer'))
        return res.status(401).json({ error: 'Unauthorized' });

    // Verifies the verification token
    const verificationToken = authorizationHeader.split(' ')[1];
    const payload = jwt.verify(verificationToken, process.env.VERIFICATION_TOKEN_SECRET);

    // Gets user from database and verifies the token version
    const user = (await User.getByEmail(req.con, payload.email))[0];
    if (!user || user.token_version !== payload.tokenVersion) return res.status(401).json({ error: 'Unauthorized.' });
    req.user = user;

    next();
});

// Middleware function for checking if refresh token is valid
exports.requiresRefreshToken = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'TEST') return next();

    const refreshToken = req.cookies.rt;
    if (!refreshToken) return res.json({ accessToken: null, user: null });

    // Verifies the refresh token
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Gets user from database and verifies the token version
    const user = (await User.getByEmail(req.con, payload.email))[0];
    if (!user || user.token_version !== payload.tokenVersion) return res.json({ accessToken: null, user: null });
    req.user = user;

    next();
});

// Middleware function for checking if password reset token is valid
exports.requiresPasswordResetToken = catchAsync(async (req, res, next) => {
    if (process.env.NODE_ENV === 'TEST') return next();

    const { resetToken } = req.params;
    if (!resetToken) return res.status(400).json({ error: 'Please provide a password reset token.' });

    // Verifies the reset token
    const payload = jwt.verify(resetToken, process.env.PASSWORD_RESET_TOKEN_SECRET);
    console.log(payload);

    // Gets user from database and verifies the token version
    const user = (await User.getByEmail(req.con, payload.email))[0];
    if (!user) return res.status(400).json({ error: 'Invalid password reset token.' });
    req.user = user;

    next();
});

// Middleware for restricting access to routes by role
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return res.status(401).json({ error: 'Unauthorized' });

        next();
    };
};
