const express = require("express");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodb = require('../db/connect');
require('dotenv').config();
const {login} = require('../controllers/auth');

const router = express.Router();

// User sign up 
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday, timeAvailable, password, phoneNumber  } = req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday || !timeAvailable || !password || !phoneNumber) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const db = mongodb.getDb();
        const usersCollection = db.collection('users');

        // See if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday,
            timeAvailable,
            password: hashedPassword,
            phoneNumber
        };
        const result = await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User created successfully', userId: result.insertedId });

    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

router.post("/login", login);

module.exports = router;