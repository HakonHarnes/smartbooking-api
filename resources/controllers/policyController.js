const catchAsync = require('../../error/catchAsync');
const Policy = require('../models/policyModel');

/**
 * @api {get} /policies Get Policy
 * @apiName GetPolicy
 * @apiGroup Policy
 *
 * @apiParam (Query) {Number} organization_id REQUIRED. Related organization id.
 *
 * @apiSuccess {Number} policy_id Policy unique ID.
 * @apiSuccess {Number} max_time_per_reservation Max hours per reservation.
 * @apiSuccess {Number} max_days_lookup How far ahead in time one can book.
 * @apiSuccess {Number} reservations_per_period How many reservations one can have in a period.
 * @apiSuccess {Number} organization_id Organization unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "policy_id": 2,
 *       "max_time_per_reservation": 4,
 *       "max_days_lookup": 14,
 *       "reservations_per_period": 4,
 *       "organization_id": 1
 *     }
 *
 * @apiError PolicyNotFound The id of the Policy was not found.
 */
exports.get = catchAsync(async (req, res, next) => {
    if (!req.query.organization_id) res.status(400).json({ error: 'Please provide an orginzation id' });
    const data = (await Policy.get(req.con, req.query.organization_id))[0];
    if (!data) {
        return res.status(404).json({ error: 'Policy not found' });
    }

    console.log('Policy user : \n', data);
    res.status(200).json({
        status: 'success',
        data,
    });
});

/**
 * @api {post} /policies Create Policy
 * @apiName CreatePolicy
 * @apiGroup Policy
 *
 * @apiParam (Body) {Number} max_time_per_reservation Max hours per reservation.
 * @apiParam (Body) {Number} max_days_lookup How far ahead in time one can book.
 * @apiParam (Body) {Number} reservations_per_period How many reservations one can have in a period.
 * @apiParam (Body) {Number} organization_id Organization unique ID.
 *
 * @apiSuccess {Policy} policy Created Policy.
 */
exports.post = catchAsync(async (req, res, next) => {
    const data = await Policy.post(req.con, req.body);
    if (data.affectedRows == 1) {
        console.log('Created Policy for user_id: ', req.body.user_id);
        res.status(200).json({
            message: 'success',
            data,
        });
    } else {
        return res.status(500).json({ error: 'Internal error' });
    }
    res.json({ data });
});

/**
 * @api {put} /policies/:id Update Policy
 * @apiName UpdatePolicy
 * @apiGroup Policy
 *
 * @apiParam {Number} id Policy unique ID.
 *
 * @apiParam (Body) {Number} max_time_per_reservation Max hours per reservation.
 * @apiParam (Body) {Number} max_days_lookup How far ahead in time one can book.
 * @apiParam (Body) {Number} reservations_per_period How many reservations one can have in a period.
 * @apiParam (Body) {Number} organization_id Organization unique ID.
 *
 * @apiSuccess {Policy} policy Updated Policy.
 */
exports.put = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const data = await Policy.put(req.con, req.body, req.params.id);
    console.log(data);

    if (data.changedRows === 1) {
        res.status(200).json({ data });
    } else if (data.changedRows === 0) {
        return res.status(304).json({ error: 'Policy not modififed' });
    }
});

/**
 * @api {delete} /policies/:id Delete Policy
 * @apiName DeletePolicy
 * @apiGroup Policy
 *
 *
 * @apiParam {Number} id Policy unique ID.
 *
 * @apiError PolicyNotFound The id of the Policy was not found.
 *
 */
exports.delete = catchAsync(async (req, res, next) => {
    const data = await Policy.delete(req.con, req.params.id);
    if (data.affectedRows == 1) {
        console.log('Slettet bookingPolicy:', req.params.id);
    } else {
        return res.status(500).json({ error: 'Policy not found' });
    }
    return res.status(200).json({ data });
});
