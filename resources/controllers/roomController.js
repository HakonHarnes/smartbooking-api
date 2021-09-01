const catchAsync = require('../../error/catchAsync');
const Room = require('../models/roomModel');

function extractTime(start, end) {
    extracted_times = {
        start: '',
        end: '',
        day_start: '',
        day_end: '',
    };
    let start_split = start.split('T');
    let end_split = end.split('T');
    extracted_times.start = start_split[1];
    extracted_times.end = end_split[1];
    let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    let d = new Date(start_split[0]);
    let dayName = days[d.getDay()];
    extracted_times.day_start = 'start_' + dayName;
    extracted_times.day_end = 'end_' + dayName;
    return extracted_times;
}

/**
 * @api {get} /rooms/:room_id Get Room
 * @apiName GetRoom
 * @apiGroup Room
 *
 * @apiParam {Number} room_id Room unique ID.
 *
 * @apiSuccess {Number} room_id Room unique ID.
 * @apiSuccess {String} room_name Name of room.
 * @apiSuccess {Number} size  Number of seats at room.
 * @apiSuccess {Number} is_active  Whether room is active or not.
 * @apiSuccess {Number} building_id  Building unique ID.
 * @apiSuccess {Number} organization_id  Organization unique ID.
 *
 * @apiError RoomNotFound The id of the Room was not found.
 */
exports.get = catchAsync(async (req, res, next) => {
    const data = await Room.get(req.con, req.params.room_id);
    if (!data) {
        return res.status(404).json({ error: 'Error fetching room' });
    }
    console.log('Get room: \n', data);
    res.status(200).json({
        status: 'success',
        data: data[0],
    });
});

/**
 * @api {get} /reservations Get Reservations
 * @apiName GetReservations
 * @apiGroup Reservation
 *
 * @apiParam (Query) {Number} building_id Id of building.
 * @apiParam (Query) {Number} organization_id Id of organization.
 *
 * @apiSuccess {Array} reservations Array of Room objects.
 */
exports.getAll = catchAsync(async (req, res, next) => {
    if (req.query.building_id) {
        const data = await Room.getByBuildingId(req.con, req.query.building_id);
        if (!data) {
            return res.status(404).json({ error: 'Room not found' });
        }
        console.log('Get by building: \n', data);
        res.status(200).json({
            message: 'success',
            data,
        });
    }
    if (req.query.organization_id) {
        const data = await Room.getByOrganizationId(req.con, req.query.organization_id);
        if (!data) {
            return res.status(404).json({ error: 'Room not found' });
        }
        console.log('Get by customer: \n', data);
        res.status(200).json({
            message: 'success',
            data,
        });
    }
});

/**
 * @api {get} /rooms/search Get Available Rooms
 * @apiName GetAvailableRooms
 * @apiGroup Room
 *
 * @apiParam (Query) {Datetime} start Starttime of search.
 * @apiParam (Query) {Datetime} end Endtime of search.
 * @apiParam (Query) {Number} building_id If search is performed on specific building.
 *
 * @apiSuccess {Array} rooms Available rooms in given query.
 */
exports.getAvailableRooms = catchAsync(async (req, res, next) => {
    if (req.query.building_id) {
        extracted_times = extractTime(req.query.start, req.query.end);
        const data = await Room.getAvailableRoomsByBuildingId(req.con, req.query, extracted_times);
        console.log('Get available rooms given building: \n', data);
        return res.json({ data });
    }

    extracted_times = extractTime(req.query.start, req.query.end);
    const data = await Room.getAvailableRooms(req.con, req.query, extracted_times);
    console.log(data);
    if (!data) {
        return res.status(200).json({ error: 'Noe gikk galt under henting av ledige rom' });
    }
    console.log('Get available rooms: \n', data);
    res.json({ data });
});

/**
 * @api {post} /rooms Create Room
 * @apiName CreateRoom
 * @apiGroup Room
 *
 * @apiParam (Body) {String} room_name Name of room.
 * @apiParam (Body) {Number} size  Number of seats at room.
 * @apiParam (Body) {Number} is_active  Whether room is active or not.
 * @apiParam (Body) {Number} building_id  Building unique ID.
 * @apiParam (Body) {Number} organization_id  Organization unique ID.
 */
exports.post = catchAsync(async (req, res, next) => {
    if (req.body.rooms) return postRooms(req, res, next);

    const data = await Room.post(req.con, req.body);
    if (data.affectedRows == 1) {
        console.log('Created room with id: ', data.insertId);
        res.status(200).json({
            message: 'success',
            data,
        });
    } else {
        return res.status(500).json({ error: 'Room not found' });
    }
});

// Registers a batch of new users
const postRooms = async (req, res, next) => {
    const { rooms } = req.body;
    if (!rooms) return res.status(400).json({ error: 'Please provide the rooms to register.' });

    let errors = [];
    let warnings = [];

    // Creates new rooms
    for (const room of rooms) {
        console.log(room);
        try {
            await Room.post(req.con, room);
        } catch (error) {
            console.log(error);
            if (error.toString().includes('ER_DUP_ENTRY')) warnings.push(room.room_name);
            else errors.push(room.room_name);
        }
    }

    // Sends success and error statistics
    res.status(200).json({ errors, warnings });
};

/**
 * @api {put} /rooms/:room_id Update Room
 * @apiName UpdateRoom
 * @apiGroup Room
 *
 * @apiParam (Body) {String} room_name Name of room.
 * @apiParam (Body) {Number} size  Number of seats at room.
 * @apiParam (Body) {Number} is_active  Whether room is active or not.
 * @apiParam (Body) {Number} building_id  Building unique ID.
 * @apiParam (Body) {Number} organization_id  Organization unique ID.
 *
 * @apiError RoomNotFound The id of the Room was not found.
 */
exports.put = catchAsync(async (req, res, next) => {
    const data = await Room.put(req.con, req.body, req.params.room_id);
    console.log(data.message);
    if (data.changedRows == 1) {
        return res.status(200).json({ data });
    }
    if (data.changedRows == 0 && data.affectedRows == 1) {
        return res.status(304).json({ error: 'Room found but no changes' });
    } else {
        return res.status(500).json({ error: 'Room not found' });
    }
});

/**
 * @api {delete} /rooms/:room_id Delete Room
 * @apiName DeleteRoom
 * @apiGroup Room
 *
 *
 * @apiParam {Number} room_id Room unique ID.
 *
 * @apiError RoomNotFound The id of the Room was not found.
 *
 */
exports.delete = catchAsync(async (req, res, next) => {
    const data = await Room.delete(req.con, req.params.room_id);
    if (data.affectedRows == 1) {
        console.log('Slettet rom:', req.params.room_id);
    } else {
        return res.status(404).json({ error: 'Room not found' });
    }
    return res.status(200).json({ data });
});
