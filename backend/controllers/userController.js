import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc   Authenticate user & get token
// @route  POST /api/user/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const { _id, name, email, isAdmin } = user;
        res.json({
            _id,
            name,
            email,
            isAdmin,
            token: generateToken(_id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
