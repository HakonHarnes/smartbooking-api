const catchAsync = require('../../error/catchAsync');
const Building = require('../models/buildingModel');
const PolicyTimes = require('../models/PolicyTimesModel');

/**
 * @api {get} /buildings Get Buildings
 * @apiName GetBuildings
 * @apiGroup Building
 *
 * @apiParam (Query) {Number} organization_id Id of organization.
 *
 * @apiSuccess {Array} buildings Array of building objects.
 */
exports.getAll = catchAsync(async (req, res, next) => {
    if (!req.query.organization_id) return res.status(400).json({ error: 'Please provide an orginzation id' });

    const data = await Building.get(req.con, req.query.organization_id);
    if (!data) {
        return res.status(404).json({ error: 'building not found' });
    }

    console.log('Get building: \n', data);
    res.status(200).json({
        status: 'success',
        data: data,
    });
});

/**
 * @api {post} /buildings Create Building
 * @apiName CreateBuilding
 * @apiGroup Building
 *
 * @apiParam (Body) {Number} organization_id Related organization id.
 * @apiParam (Body) {String} building_name Name of building.
 *
 * @apiSuccess {Building} building Created Building.
 */
exports.post = catchAsync(async (req, res, next) => {
    const data = await Building.post(req.con, req.body);
    await PolicyTimes.post(req.con, {
        startMon: '07:00',
        endMon: '19:00',
        startTue: '07:00',
        endTue: '19:00',
        startWed: '07:00',
        endWed: '19:00',
        startThu: '07:00',
        endThu: '19:00',
        startFri: '07:00',
        endFri: '19:00',
        startSat: '07:00',
        endSat: '19:00',
        startSun: '07:00',
        endSun: '19:00',
        id: data.insertId,
    });

    if (data.affectedRows == 1) {
        console.log('Created building with id: ', data.insertId);
        return res.status(200).json({
            message: 'success',
            data,
        });
    } else {
        return res.status(500).json({ error: 'building not found' });
    }
});

/**
 * @api {put} /buildings/:building_id Update Building
 * @apiName UpdateBuilding
 * @apiGroup Building
 *
 * @apiParam {Number} building_id Buildings unique ID.
 *
 * @apiParam (Body) {Number} organization_id Updated organization id.
 * @apiParam (Body) {String} building_name Updated name of building.
 *
 * @apiSuccess {Building} building Updated Building.
 */
exports.put = catchAsync(async (req, res, next) => {
    const data = await Building.put(req.con, req.body, req.params.building_id);
    console.log(data);
    if (data.changedRows == 1) {
        return res.status(200).json({ data: data });
    }
    if (data.changedRows == 0 && data.affectedRows == 1) {
        return res.status(304).json({ error: 'building not modififed' });
    } else {
        return res.status(500).json({ error: 'internal error' });
    }
});

/**
 * @api {delete} /buildings/:building_id Delete Building
 * @apiName DeleteBuilding
 * @apiGroup Building
 *
 *
 * @apiParam {Number} building_id Buildings unique ID.
 *
 * @apiError BuildingNotFound The id of the Building was not found.
 *
 */
exports.delete = catchAsync(async (req, res, next) => {
    const data = await Building.delete(req.con, req.params.building_id);
    if (!data) {
        return res.status(404).json({ error: 'building not found' });
    }
    return res.status(200).json({ data: data });
});
