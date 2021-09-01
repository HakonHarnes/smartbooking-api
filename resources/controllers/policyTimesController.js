const PolicyTimes = require('../models/PolicyTimesModel');
const catchAsync = require('../../error/catchAsync');

/**
 * @api {get} /policy-times Get Policy Times
 * @apiName GetPolicyTimes
 * @apiGroup PolicyTimes
 *
 * @apiParam (Query) {Number} building_id REQUIRED. The policy's related building.
 *
 * @apiSuccess {String} start_mon Opening time Monday.
 * @apiSuccess {String} end_mon Closing time Monday.
 * @apiSuccess {String} start_tue Opening time Tuesday.
 * @apiSuccess {String} end_tue Closing time Tuesday.
 * @apiSuccess {String} start_wed Opening time Wednesday.
 * @apiSuccess {String} end_wed Closing time Wednesday.
 * @apiSuccess {String} start_thu Opening time Thursday.
 * @apiSuccess {String} end_thu Closing time Thursday.
 * @apiSuccess {String} start_fri Opening time Friday.
 * @apiSuccess {String} end_fri Closing time Friday.
 * @apiSuccess {String} start_sat Opening time Saturday.
 * @apiSuccess {String} end_sat Closing time Saturday.
 * @apiSuccess {String} start_sun Opening time Sunday.
 * @apiSuccess {String} end_sun Closing time Sunday.
 * @apiSuccess {Number} building_id Building unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "start_mon": "07:00",
 *       "end_mon": "18:00",
 *       ...
 *     }
 */
exports.get = catchAsync(async (req, res, next) => {
    if (!req.query.building_id) res.status(400).json({ error: 'Please provide a building id' });
    const data = await PolicyTimes.get(req.con, req.query.building_id);
    if (!data) {
        return res.status(404).json({ error: 'Error fetching building policy' });
    }
    console.log('Get times : \n', data);
    res.status(200).json({
        status: 'success',
        data: data[0],
    });
});

/**
 * @api {post} /policy-times Create Policy Times
 * @apiName CreatePolicyTimes
 * @apiGroup PolicyTimes
 *
 * @apiParam (Body) {String} start_mon Opening time Monday.
 * @apiParam (Body) {String} end_mon Closing time Monday.
 * @apiParam (Body) {String} start_tue Opening time Tuesday.
 * @apiParam (Body) {String} end_tue Closing time Tuesday.
 * @apiParam (Body) {String} start_wed Opening time Wednesday.
 * @apiParam (Body) {String} end_wed Closing time Wednesday.
 * @apiParam (Body) {String} start_thu Opening time Thursday.
 * @apiParam (Body) {String} end_thu Closing time Thursday.
 * @apiParam (Body) {String} start_fri Opening time Friday.
 * @apiParam (Body) {String} end_fri Closing time Friday.
 * @apiParam (Body) {String} start_sat Opening time Saturday.
 * @apiParam (Body) {String} end_sat Closing time Saturday.
 * @apiParam (Body) {String} start_sun Opening time Sunday.
 * @apiParam (Body) {String} end_sun Closing time Sunday.
 * @apiParam (Body) {Number} building_id Building unique ID.
 *
 * @apiSuccess {PolicyTimes} policyTimes Created Policy Times.
 */
exports.post = catchAsync(async (req, res, next) => {
    const data = await PolicyTimes.post(req.con, req.body.data);
    if (data.affectedRows == 1) {
        console.log('Created new time policy for building: ', data.req.body.id);
        res.status(200).json({
            message: 'success',
            data,
        });
    } else {
        return res.status(500).json({ error: 'Internal error' });
    }
});

/**
 * @api {put} /policy-times/: Update Policy Times
 * @apiName UpdatePolicyTimes
 * @apiGroup PolicyTimes
 *
 * @apiParam (Body) {Number} building_id REQUIRED. Building unique ID.
 * @apiParam (Body) {String} start_mon Opening time Monday.
 * @apiParam (Body) {String} end_mon Closing time Monday.
 * @apiParam (Body) {String} start_tue Opening time Tuesday.
 * @apiParam (Body) {String} end_tue Closing time Tuesday.
 * @apiParam (Body) {String} start_wed Opening time Wednesday.
 * @apiParam (Body) {String} end_wed Closing time Wednesday.
 * @apiParam (Body) {String} start_thu Opening time Thursday.
 * @apiParam (Body) {String} end_thu Closing time Thursday.
 * @apiParam (Body) {String} start_fri Opening time Friday.
 * @apiParam (Body) {String} end_fri Closing time Friday.
 * @apiParam (Body) {String} start_sat Opening time Saturday.
 * @apiParam (Body) {String} end_sat Closing time Saturday.
 * @apiParam (Body) {String} start_sun Opening time Sunday.
 * @apiParam (Body) {String} end_sun Closing time Sunday.
 *
 * @apiSuccess {PolicyTimes} policyTimes Updated PolicyTimes.
 */
exports.put = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const data = await PolicyTimes.put(req.con, req.body);
    console.log(data.message);
    if (data.changedRows == 1) {
        return res.status(200).json({ data });
    }
    if (data.changedRows == 0 && data.affectedRows == 1) {
        return res.status(304).json({ error: 'time policy not modified' });
    } else {
        return res.status(500).json({ error: 'internal error' });
    }
});

/**
 * @api {delete} /policy-times/:id Delete Policy Times
 * @apiName DeletePolicyTimes
 * @apiGroup PolicyTimes
 *
 *
 * @apiParam {Number} id PolicyTimes unique ID.
 *
 * @apiError PolicyTimesNotFound The id of the PolicyTimes was not found.
 *
 */
exports.delete = catchAsync(async (req, res, next) => {
    const data = await PolicyTimes.delete(req.con, req.params.id);
    if (data.affectedRows != 1) {
        return res.status(404).json({ error: 'Room not found' });
    }
    return res.status(200).json({ data });
});
