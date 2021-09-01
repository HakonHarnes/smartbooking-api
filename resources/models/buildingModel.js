module.exports = {
    get: (connection, id) => connection.query('SELECT * FROM building WHERE organization_id = ?', id),

    post: (connection, building) =>
        connection.query('INSERT INTO building (building_name, organization_id) VALUES(?,?)', [
            building.buildingName,
            building.organization_id,
        ]),

    put: (connection, building, id) =>
        connection.query(
            'UPDATE building SET building_name = ?, organization_id = ?, building_is_active = ? WHERE building_id = ?',
            [building.buildingName, building.organization_id, building.building_is_active, id]
        ),

    delete: (connection, id) =>
        connection.query('DELETE FROM room WHERE building_id = ?; DELETE FROM building WHERE building_id = ?;', [
            id,
            id,
        ]),
};
