const Organization = require('../models/organizationModel');
const Policy = require('../models/policyModel');
const catchAsync = require('../../error/catchAsync');

// TODO: Get one organization
exports.get = catchAsync(async (req, res, next) => {
    res.status(200).json({
        data: {},
    });
});

/**
 * @api {get} /organizations Get Organizations
 * @apiName GetOrganizations
 * @apiGroup Organization
 *
 * @apiSuccess {Array} organizations Array of organization objects.
 */
exports.getAll = catchAsync(async (req, res, next) => {
    const data = await Organization.getAll(req.con);
    console.log(data);
    if (!data) {
        res.status(404).json({ error: 'Noe gikk galt ved henting av organisasjoner' });
    }
    res.status(200).json({
        data,
    });
});

/**
 * @api {post} /organizations Create Organization
 * @apiName CreateOrganization
 * @apiGroup Organization
 *
 * @apiParam (Body) {String} organization_name Name of organization.
 * @apiParam (Body) {String} organization_number Organization number.
 * @apiParam (Body) {Number} postal_code Organization postal code.
 * @apiParam (Body) {String} postal_zone Organization postal zone.
 * @apiParam (Body) {String} contact_name Contact person for Organization.
 *
 * @apiSuccess {Organization} organization Created Organization.
 */
exports.post = catchAsync(async (req, res, next) => {
    const { name, number, address, postalCode, postalZone, contactName } = req.body;

    if (!name || !number || !address || !postalCode || !postalZone || !contactName)
        return res.status(400).json({
            error: 'Please provide organization name, number address, postal code, postal zone and contact name.',
        });

    const data = await Organization.post(req.con, name, number, address, postalCode, postalZone, contactName);
    await Policy.post(req.con, {
        max_time_per_reservation: '6',
        max_days_lookup: '14',
        length_period: '30',
        reservations_per_period: '4',
        organization_id: data.insertId,
    });

    console.log(data);

    res.status(200).json({ message: 'Organization created.', data });
});

/**
 * @api {put} /organizations/:organization_id Update Organization
 * @apiName UpdateOrganization
 * @apiGroup Organization
 *
 * @apiParam {Number} organization_id Organizations unique ID.
 *
 * @apiParam (Body) {String} organization_name Name of organization.
 * @apiParam (Body) {String} organization_number Organization number.
 * @apiParam (Body) {Number} postal_code Organization postal code.
 * @apiParam (Body) {String} postal_zone Organization postal zone.
 * @apiParam (Body) {String} contact_name Contact person for Organization.
 *
 * @apiSuccess {Organization} organization Updated Organization.
 */
exports.put = catchAsync(async (req, res, next) => {
    const data = await Organization.put(req.con, req.body, req.params.organization_id);

    if (data.changedRows == 1) {
        return res.json({ data });
    } else if (data.changedRows == 0 && data.affectedRows == 1) {
        return res.status(304).json({ error: 'User found but no changes' });
    } else {
        return res.status().json({ error: 'User not found' });
    }
});
