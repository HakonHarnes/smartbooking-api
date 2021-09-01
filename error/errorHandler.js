module.exports = (error, req, res, next) => {
    // Error logger
    console.log('🔴 - ERROR');
    console.log(error);
    console.log('');

    // Error handler
    if (error.toString().includes('ER_DUP_ENTRY'))
        return res.status(400).json({ error: 'A user with that email-address already exists.' });
    if (error.toString().includes('TokenExpiredError')) return res.status(400).json({ error: 'Token has expired.' });
    if (error.toString().includes('JsonWebTokenError')) return res.status(401).json({ error: 'Unauthorized.' });

    // Default error handler
    return res.status(500).json({ error: 'Internal server error.' });
};
