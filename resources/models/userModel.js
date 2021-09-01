module.exports = {
    get: (connection, id) => connection.query('SELECT * FROM user WHERE user_id = ?', id),

    getByOrganizationId: (connection, id) =>
        connection.query(
            'SELECT user.user_id, user.first_name, user.last_name, user.email, user.is_active, user.role FROM `user` where(user.organization_id = ?);',
            id
        ),

    getByEmail: (connection, email) =>
        connection.query(
            'SELECT * FROM user LEFT JOIN organization ON user.organization_id = organization.organization_id WHERE email = ?',
            email
        ),

    getAdminsAndCustomers: (connection) =>
        connection.query(
            'SELECT * FROM user LEFT JOIN organization ON user.organization_id = organization.organization_id WHERE role = "customer" OR role = "admin"'
        ),

    post: (connection, email, firstName, lastName, role, organizationId = null) =>
        connection.query(
            'INSERT INTO user (email, first_name, last_name, role, organization_id) VALUES (?, ?, ?, ?, ?)',
            [email, firstName, lastName, role, organizationId]
        ),

    put: (connection, user, id) =>
        connection.query('UPDATE user SET email = ?, first_name = ?, last_name = ?,  is_active = ? WHERE user_id = ?', [
            user.email,
            user.firstName,
            user.lastName,
            user.isActive,
            id,
        ]),

    updatePassword: (connection, email, hashedPassword) =>
        connection.query('UPDATE user SET hashed_password = ?, token_version = token_version + 1 WHERE email = ?', [
            hashedPassword,
            email,
        ]),

    delete: (connection, userId) => connection.query('DELETE user FROM user WHERE user_id = ?', userId),

    initializeTwoFactorAuth: (connection, email, secret, twoFactorMethod) =>
        connection.query('UPDATE user SET secret_token = ?, two_factor_method = ?, two_factor = 0 WHERE email = ?', [
            secret,
            twoFactorMethod,
            email,
        ]),

    enableTwoFactorAuth: (connection, email) =>
        connection.query('UPDATE user SET two_factor = 1 WHERE email = ?', email),

    disableTwoFactorAuth: (connection, email) =>
        connection.query('UPDATE user SET two_factor = 0 WHERE email = ?', email),
};
