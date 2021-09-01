module.exports = {
    get: (connection, id) => connection.query('SELECT * FROM room WHERE room_id =?', id),

    getByBuildingId: (connection, id) =>
        connection.query(
            'Select building.building_name, building.building_id, room.room_id, room.room_name, room.size, room.is_active, room.organization_id FROM `room`, `building` where building.building_id = room.building_id and room.building_id = ?;',
            id
        ),

    getByOrganizationId: (connection, id) =>
        connection.query(
            'SELECT building.building_name, building.building_id, building.building_is_active, room.room_id, room.room_name, room.size, room.is_active, room.organization_id FROM building INNER JOIN room ON building.building_id = room.building_id and building.organization_id=? ORDER BY building.building_name;',
            id
        ),

    getAvailableRooms: (connection, query, extracted) =>
        connection.query(
            `Select room.room_id, room.room_name, room.size, room.building_id, building.building_name FROM room, building, booking_policy_times where (room.building_id = building.building_id = booking_policy_times.building_id and room.organization_id = ? and room_id not in ( SELECT DISTINCT reservation.room_id FROM room join reservation on room.room_id = reservation.room_id WHERE ((? <=end and start <= ?)))and room.building_id in (SELECT DISTINCT booking_policy_times.building_id FROM booking_policy_times WHERE (TIME(?) >= TIME(${extracted.day_start}) AND TIME (?) <= TIME(${extracted.day_end}))));`,
            [query.organization_id, query.start, query.end, extracted.start, extracted.end]
        ),

    getAvailableRoomsByBuildingId: (connection, query, extracted) =>
        connection.query(
            `Select room.room_id, room.room_name, room.size, room.building_id, building.building_name FROM room, building, booking_policy_times WHERE (room.building_id = ? AND room.building_id = building.building_id = booking_policy_times.building_id AND room.room_id NOT IN (SELECT DISTINCT reservation.room_id FROM room join reservation on room.room_id = reservation.room_id WHERE ((? <=end and start <= ?))) and room.building_id in (SELECT DISTINCT booking_policy_times.building_id FROM booking_policy_times WHERE (TIME(?) >= TIME(${extracted.day_start}) AND TIME (?) <= TIME(${extracted.day_end}))));`,
            [query.building_id, query.start, query.end, extracted.start, extracted.end]
        ),

    post: (connection, room) =>
        connection.query(
            'INSERT INTO room (room_name, size, is_active, building_id, organization_id) VALUES(?,?,?,?,?)',
            [room.name, room.size, room.is_active, room.building_id, room.organization_id]
        ),

    put: (connection, room, id) =>
        connection.query(
            'UPDATE room SET room_name=?, size=?, is_active=?, organization_id=?, building_id=? WHERE room_id=?',
            [room.name, room.size, room.is_active, room.organization_id, room.building_id, id]
        ),

    delete: (connection, id) => connection.query('DELETE FROM room WHERE room_id = ?', id),
};
