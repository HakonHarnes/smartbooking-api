const errorHandler = require('./error/errorHandler');
const connection = require('./config/database.js');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');

const reservationRouter = require('./resources/routes/reservationRoutes');
const organizationRouter = require('./resources/routes/organizationRoutes');
const policyTimesRouter = require('./resources/routes/policyTimesRoutes');
const buildingRouter = require('./resources/routes/buildingRoutes');
const policyRouter = require('./resources/routes/policyRoutes');
const userRouter = require('./resources/routes/userRoutes');
const roomRouter = require('./resources/routes/roomRoutes');
const authRouter = require('./auth/routes/authRoutes');

const app = express();
app.use(express.static('public'));

// Security HTTP headers
app.use(helmet());

// Cors middleware
if (process.env.NODE_ENV === 'development') {
    app.use(
        cors({
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
            origin: process.env.CLIENT_DEVELOPMENT_LINK,
        })
    );
} else {
    app.use(
        cors({
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
            origin: process.env.CLIENT_PRODUCTION_LINK,
        })
    );
}

// Data sanitization against XSS-attacks
app.use(xss());

// Prevents paramater pollution
app.use(hpp());

// Body and cookie parser
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Limiter middleware to prevent DOS-attacks
const limiter = rateLimit({
    max: 100,
    winowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP-address. Please try again in one hour.',
});
app.use('/api', limiter);

// Logging middleware
app.use((req, res, next) => {
    console.log(`🟢 - ${req.method} [${req.originalUrl.toUpperCase()}] \n`);
    req.con = connection;
    next();
});

// Routes
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/policies', policyRouter);
app.use('/api/buildings', buildingRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/policy-times', policyTimesRouter);
app.use('/api/organizations', organizationRouter);

// Error handling for non-existing routes
app.all('*', (req, res, next) => {
    res.status(404).json({ message: `${req.method} [${req.originalUrl}] does not exist.` });
});
app.use(errorHandler);

if (process.env.NODE_ENV === 'test') {
    module.exports = app;
} else {
    // Starts server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
