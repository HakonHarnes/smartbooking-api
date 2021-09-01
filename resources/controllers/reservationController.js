const Reservation = require('../models/reservationModel');
const catchAsync = require('../../error/catchAsync');
const Policy = require('../models/policyModel');

// Validates the time for a reservation
const validateTime = (query) => {
    const startMins = new Date(query.start).getMinutes();
    const endMins = new Date(query.end).getMinutes();
    const acceptedMinutes = [0, 30];
    return acceptedMinutes.includes(startMins) && acceptedMinutes.includes(endMins);
};

// Validates a reservation
const validateReservation = async (con, reservation) => {
    const { user_id, organization_id, start, end } = reservation;
    const policy = await Policy.get(con, organization_id);
    const numReservations = await Reservation.getUserReservationsInFuture(con, user_id, policy[0].max_days_lookup);
    const lengthOfReservation = (new Date(end) - new Date(start)) / 3.6e6;

    if (policy[0].reservations_per_period <= numReservations[0]['COUNT']) {
        return 'Du har nådd maks antall reservasjoner denne perioden.';
    } else if (policy[0].max_time_per_reservation < lengthOfReservation) {
        return `Maks lengde på reservasjon er ${policy[0].max_time_per_reservation} timer.`;
    }
    return false;
};

/**
 * @api {get} /reservations/:reservation_id Get Reservation
 * @apiName GetReservation
 * @apiGroup Reservation
 *
 * @apiParam {Number} reservation_id Reservation unique ID.
 *
 * @apiSuccess {Number} res_id Reservation unique ID.
 * @apiSuccess {Datetime} start Starttime of reservation.
 * @apiSuccess {Datetime} end  Endtime of reservation.
 * @apiSuccess {String} room_id  Reservation location.
 * @apiSuccess {Number} user_id  Reservation owner.
 *
 * @apiError ReservationNotFound The id of the Reservation was not found.
 */
exports.get = catchAsync(async (req, res, next) => {
    const data = (await Reservation.get(req.con, req.params.reservation_id))[0];
    if (!data) {
        return res.status(404).json({ error: 'No reservations found.' });
    }

    console.log('Get reservation : \n', data);
    res.status(200).json({
        status: 'success',
        data,
    });
});

/**
 * @api {get} /reservations Get Reservations
 * @apiName GetReservations
 * @apiGroup Reservation
 *
 * @apiParam (Query) {Number} organization_id Id of organization.
 * @apiParam (Query) {Number} user_id Id of user.
 * @apiParam (Query) {Number} room_id Id of room.
 *
 * @apiSuccess {Array} reservations Array of Reservation objects.
 */
exports.getAll = catchAsync(async (req, res, next) => {
    if (req.query.organization_id) {
        const data = await Reservation.getByOrganizationId(req.con, req.query.organization_id);
        if (!data) {
            return res.status(404).json({ error: 'Feil ved henting av reservasjoner' });
        }
        console.log('Get reservation for user: \n', data);
        res.json({ data });
    }
    if (req.query.user_id) {
        const data = await Reservation.getByUserId(req.con, req.query.user_id);
        if (!data) {
            return res.status(404).json({ error: 'reservation not found' });
        }
        console.log('Get reservation for user: \n', data);
        res.json({ data });
    }
    if (req.query.room_id && !req.query.end) {
        const data = await Reservation.getByRoomId(req.con, req.query.room_id, req.query.start || new Date());
        if (!data) {
            return res.status(404).json({ error: 'reservation not found' });
        }
        //console.log('Get reservation for room: \n', data);
        res.json({ data });
    }
    if (req.query.room_id && req.query.start && req.query.end) {
        const data = await Reservation.getRoomSchedule(req.con, req.query);
        if (!data) {
            return res.status(404).json({ error: 'reservation not found' });
        }
        console.log('Get reservation for room: \n', data);
        res.json({ data });
    }
});

/**
 * @api {post} /reservations Create Reservation
 * @apiName CreateReservation
 * @apiGroup Reservation
 *
 * @apiParam (Body) {Datetime} start Starttime of reservation.
 * @apiParam (Body) {Datetime} end  Endtime of reservation.
 * @apiParam (Body) {String} room_id  Reservation location.
 * @apiParam (Body) {Number} user_id  Reservation owner.
 *
 */
exports.post = catchAsync(async (req, res, next) => {
    if (!validateTime(req.body)) {
        return res.status(400).json({ error: 'Booking times needs to be in whole or half hours.' });
    }
    const invalid = await validateReservation(req.con, req.body);
    if (!!invalid) {
        return res.status(401).json({ error: invalid });
    }
    const data = await Reservation.post(req.con, req.body);
    if (data.affectedRows == 1) {
        console.log('Created reservation with id: ', data.insertId);
        res.json({ data });
    } else {
        return res.status(500).json({ error: 'Kunne ikke gjennomføre reservering' });
    }
});

/**
 * @api {put} /reservations Update Reservation
 * @apiName CreateReservation
 * @apiGroup Reservation
 *
 * @apiParam (Query) {Number} reservation_id Reservation unique ID.
 *
 * @apiParam (Body) {Datetime} start Starttime of reservation.
 * @apiParam (Body) {Datetime} end  Endtime of reservation.
 * @apiParam (Body) {String} room_id  Reservation location.
 * @apiParam (Body) {Number} user_id  Reservation owner.
 *
 */
exports.put = catchAsync(async (req, res, next) => {
    const data = await Reservation.put(req.con, req.body);
    console.log(data.message);
    if (data.changedRows == 1) {
        res.json({ data });
    } else if (data.changedRows == 0 && data.affectedRows == 1) {
        return res.status(304).json({ error: 'reservation not modified' });
    } else {
        return res.status(500).json({ error: 'reservation not found' });
    }
});

/**
 * @api {delete} /reservations/:reservation_id Delete Reservation
 * @apiName DeleteReservation
 * @apiGroup Reservation
 *
 *
 * @apiParam {Number} reservation_id Reservation unique ID.
 *
 * @apiError ReservationNotFound The id of the Reservation was not found.
 *
 */
exports.delete = catchAsync(async (req, res, next) => {
    let data;
    if (req.user.role === 'user')
        data = await Reservation.delete(req.con, { id: req.params.reservation_id, userId: req.user.id });
    else data = await Reservation.delete(req.con, [req.params.reservation_id]);

    if (data.affectedRows == 1) {
        console.log('Deleted res:', req.params.reservationId);
    } else {
        return res.status(404).json({ error: 'reservation not found' });
    }
    return res.status(200).json({ data });
});
