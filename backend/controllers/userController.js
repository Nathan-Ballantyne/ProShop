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

// @desc   Register a new user
// @route  POST /api/user
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc   Get user profile
// @route  GET /api/user/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { _id, name, email, isAdmin } = user;

    if (user) {
        res.json({
            _id,
            name,
            email,
            isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc   Update user profile
// @route  PUT /api/user/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc   Get all users
// @route  GET /api/user
// @access Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});
