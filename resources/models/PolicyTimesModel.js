module.exports = {
    get: (connection, id) => connection.query('SELECT * FROM booking_policy_times WHERE building_id = ?', id),

    post: (connection, times) =>
        connection.query(
            'INSERT INTO booking_policy_times(start_mon, end_mon, start_tue, end_tue, start_wed, end_wed, start_thu, end_thu, start_fri, end_fri, start_sat, end_sat, start_sun, end_sun, building_id)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                times.startMon,
                times.endMon,
                times.startTue,
                times.endTue,
                times.startWed,
                times.endWed,
                times.startThu,
                times.endThu,
                times.startFri,
                times.endFri,
                times.startSat,
                times.endSat,
                times.startSun,
                times.endSun,
                times.id,
            ]
        ),

    put: (connection, times) =>
        connection.query(
            'UPDATE booking_policy_times SET start_mon = ?,end_mon = ?, start_tue = ?,end_tue = ?, start_wed = ?,end_wed = ?, start_thu = ?,end_thu = ?, start_fri = ?,end_fri = ?, start_sat = ?,end_sat = ?, start_sun = ?,end_sun = ? WHERE building_id = ?',
            [
                times.start_mon,
                times.end_mon,
                times.start_tue,
                times.end_tue,
                times.start_wed,
                times.end_wed,
                times.start_thu,
                times.end_thu,
                times.start_fri,
                times.end_fri,
                times.start_sat,
                times.end_sat,
                times.start_sun,
                times.end_sun,
                times.building_id,
            ]
        ),

    delete: (connection, id) => connection.query('DELETE FROM booking_policy_times WHERE building_id = ?', id),
};
