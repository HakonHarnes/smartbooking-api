const { htmlToText } = require('html-to-text');
const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = class Email {
    constructor(to, firstName, page) {
        this.from = `SmartBooking <${process.env.EMAIL_FROM}`;
        this.to = to;
        this.firstName = firstName;

        const domain =
            process.env.NODE_ENV === 'production'
                ? process.env.CLIENT_PRODUCTION_LINK
                : process.env.CLIENT_DEVELOPMENT_LINK;

        this.url = `${domain}${page}`;
    }

    // Creates an email transporter
    createTransport() {
        if (process.env.NODE_ENV === 'production') {
            console.log('TODO: Change to proper email provider');
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send(template, subject) {
        // Renders HTML based om PUG-template
        const html = pug.renderFile(`auth/email/views/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            code: this.code,
            subject,
        });

        // Defines email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html),
        };

        // Sends the email
        await this.createTransport().sendMail(mailOptions);
    }

    // Sends welcome email
    async sendWelcome() {
        await this.send('welcome', 'Velkommen til SmartBooking!');
    }

    // Sends password reset email
    async sendPasswordReset() {
        await this.send('passwordReset', 'Tilbakestilling av ditt SmartBooking-passord');
    }

    // Sends verification code
    async sendVerificationCode(code) {
        this.code = code;
        await this.send('verificationCode', 'SmartBooking-bekreftelseskode');
    }
};
