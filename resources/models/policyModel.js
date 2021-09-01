module.exports = {
    get: (connection, organizationId) =>
        connection.query('SELECT * FROM booking_policy WHERE organization_id = ?', [organizationId]),

    post: (connection, policy) =>
        connection.query(
            'INSERT INTO booking_policy (max_time_per_reservation, max_days_lookup, length_period, reservations_per_period, organization_id) VALUES(?,?,?,?,?)',
            [
                policy.max_time_per_reservation,
                policy.max_days_lookup,
                policy.length_period,
                policy.reservations_per_period,
                policy.organization_id,
            ]
        ),

    put: (connection, policy, id) =>
        connection.query(
            'UPDATE booking_policy SET max_time_per_reservation = ?, max_days_lookup = ?, length_period = ?, reservations_per_period = ? WHERE policy_id = ?',
            [
                policy.max_time_per_reservation,
                policy.max_days_lookup,
                policy.length_period,
                policy.reservations_per_period,
                id,
            ]
        ),

    delete: (connection, id) => connection.query('DELETE FROM booking_policy WHERE organization_id = ?', id),
};
