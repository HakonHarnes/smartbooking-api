module.exports = {
    get: (connection, id) => connection.query('SELECT * FROM reservation WHERE res_id = ?', id),

    getByUserId: (connection, id) =>
        connection.query(
            'SELECT reservation.res_id, reservation.start, reservation.end, reservation.room_id, reservation.user_id, room.room_name, room.size, building.building_name FROM reservation inner JOIN room ON reservation.room_id = room.room_id and reservation.user_id = ? inner JOIN building ON room.building_id = building.building_id ORDER BY reservation.start',
            id
        ),

    getByRoomId: (connection, id, start) =>
        connection.query(
            'SELECT * FROM reservation WHERE reservation.room_id = ? and start > ? ORDER BY reservation.start',
            [id, start]
        ),

    getByOrganizationId: (connection, id) =>
        connection.query(
            'SELECT res_id, start, end, room.room_id, building.building_name, building.building_id, room.room_name, user.user_id, email, first_name, last_name, user.organization_id FROM reservation JOIN room ON reservation.room_id = room.room_id JOIN building ON room.building_id = building.building_id JOIN user ON reservation.user_id = user.user_id WHERE user.organization_id = ? ORDER BY start ASC',
            [id]
        ),

    getUserReservationsInFuture: (connection, user_id, daysAhead) =>
        connection.query(
            'SELECT COUNT(res_id) AS COUNT from reservation WHERE reservation.user_id = ? AND reservation.start BETWEEN CURRENT_DATE AND CURRENT_DATE + ?',
            [user_id, daysAhead]
        ),

    getRoomSchedule: (connection, query) =>
        connection.query(
            'SELECT DISTINCT reservation.res_id, reservation.room_id, reservation.start, reservation.end, reservation.user_id FROM `room` join `reservation` on room.room_id = reservation.room_id and room.room_id =? WHERE (( ? <= end and start <= ?));',
            [query.room_id, query.start, query.end]
        ),

    post: (connection, reservation) =>
        connection.query('INSERT INTO reservation (start, end, room_id, user_id) VALUES (?,?,?,?)', [
            reservation.start,
            reservation.end,
            reservation.room_id,
            reservation.user_id,
        ]),

    put: (connection, reservation) =>
        connection.query('UPDATE reservation SET start = ?,end = ?, room_id = ?, user_id = ? WHERE res_id = ?', [
            reservation.start,
            reservation.end,
            reservation.room_id,
            reservation.user_id,
            reservation.reservation_id,
        ]),

    delete: (connection, reservation) => {
        if (reservation.userId)
            return connection.query('DELETE FROM reservation WHERE res_id = ? AND user_id = ?', [
                reservation.id,
                reservation.userId,
            ]);
        return connection.query('DELETE FROM reservation WHERE res_id = ?', reservation.id);
    },
};
