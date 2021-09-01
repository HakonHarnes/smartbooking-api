module.exports = {
    get: (connection, id) => connection.query('SELECT * FROM organization WHERE organization_id = ?', id),

    getAll: (connection) => connection.query('SELECT * FROM organization'),

    post: (connection, name, number, address, postalCode, postalZone, contactName) =>
        connection.query(
            'INSERT INTO organization (organization_name, organization_number, organization_address, postal_code, postal_zone, contact_name) VALUES(?, ?, ?, ?, ?, ?)',
            [name, number, address, postalCode, postalZone, contactName]
        ),

    put: (connection, data, id) =>
        connection.query(
            'UPDATE organization SET organization_name = ?,organization_number = ?, contact_name = ?, organization_address = ?, postal_code = ?,  postal_zone = ? WHERE organization_id = ?',
            [data.name, data.number, data.contactName, data.address, data.postalCode, data.postalZone, id]
        ),
};
