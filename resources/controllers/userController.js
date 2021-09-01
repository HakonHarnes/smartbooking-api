const catchAsync = require('../../error/catchAsync');
const User = require('../models/userModel');
const crypto = require('crypto');

/**
 * @api {get} /users/:user_id Get User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiSuccess {Number} user_id Users unique ID.
 * @apiSuccess {String} first_name Firstname of the User.
 * @apiSuccess {String} last_name  Lastname of the User.
 * @apiSuccess {String} email  Users email address.
 * @apiSuccess {Number} is_active  Whether the user account is active or not.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 2,
 *       "first_name": "Ivar",
 *       "last_name": "Aasen",
 *       "email": "ivar@aasen.no",
 *       "is_active": 1
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */
exports.get = catchAsync(async (req, res, next) => {
    const data = (await User.get(req.con, req.params.user_id))[0];
    if (!data) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ data: data });
});

/**
 * @api {get} /users Get Users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Array} users Array of user objects.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": [{...},...]
 *     }
 */
exports.getAll = catchAsync(async (req, res, next) => {
    if (req.query.resetToken) {
        const hashedToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex');

        // Gets data from database
        const data = (await User.getByResetToken(req.con, hashedToken))[0];
        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Returns the user
        return res.json({ data });
    }

    if (req.query.organization_id) {
        let data = await User.getByOrganizationId(req.con, req.query.organization_id);

        // Filters out other customers
        if (req.user.role === 'customer') data = data.filter((user) => user.role === 'user');

        return res.status(200).json({
            message: 'success',
            data: data,
        });
    }

    const data = await User.getAdminsAndCustomers(req.con);
    return res.status(200).json({
        message: 'success',
        data,
    });
});

/**
 * @api {put} /users/:user_id Update User
 * @apiName UpdateUser
 * @apiGroup User
 *
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiParam (Body) {String} first_name Updated firstname.
 * @apiParam (Body) {String} last_name Updated lastname.
 * @apiParam (Body) {String} email Updated email.
 * @apiParam (Body) {Number} is_active Updated is_active.
 *
 * @apiSuccess {User} user Updated User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {...}
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 * @apiError UserNotUpdated The user was found but not updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 304 Not Modified
 *     {
 *       "error": "User found but no changes"
 *     }
 */
exports.put = catchAsync(async (req, res, next) => {
    const data = await User.put(req.con, req.body, req.params.user_id);
    if (data.changedRows == 1) {
        res.json({ data });
    } else if (data.changedRows == 0 && data.affectedRows == 1) {
        return res.status(304).json({ error: 'User found but no changes' });
    } else {
        return res.status().json({ error: 'User not found' });
    }
});

/**
 * @api {delete} /users/:user_id Delete User
 * @apiName DeleteUser
 * @apiGroup User
 *
 *
 * @apiParam {Number} user_id Users unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */
exports.delete = catchAsync(async (req, res, next) => {
    const data = await User.delete(req.con, req.params.user_id);
    console.log(data);
    if (data.affectedRows > 0) {
        console.log('Deleted user:', req.params.user_id);
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ data });
});
