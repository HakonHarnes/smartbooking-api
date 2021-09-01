const jwt = require('jsonwebtoken');

// Creates an access token
exports.createAccessToken = (user) => {
    return jwt.sign({ email: user.email, tokenVersion: user.token_version }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

// Creates a refresh token
exports.createRefreshToken = (user) => {
    const expiresIn = user.role === 'user' ? '365d' : '7d';
    return jwt.sign({ email: user.email, tokenVersion: user.token_version }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn,
    });
};

// Creates a verification token
exports.createVerificationToken = (user) => {
    return jwt.sign({ email: user.email, tokenVersion: user.token_version }, process.env.VERIFICATION_TOKEN_SECRET, {
        expiresIn: '5m',
    });
};

// Creates a password reset token
exports.createPasswordResetToken = (user, expiresIn) => {
    console.log(user.role);
    return jwt.sign({ email: user.email, role: user.role }, process.env.PASSWORD_RESET_TOKEN_SECRET, {
        expiresIn,
    });
};
