const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getData = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    console.log('Connected to database:', db.databaseName); 

    const usersCollection = db.collection('users');
    console.log('Users Collection:', usersCollection.collectionName); 

    const result = await usersCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting users', error);
    return res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// Get user by ID
const getDataById = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const usersCollection = db.collection('users');
    const result = await usersCollection.findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting user by ID', error);
    return res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

// Create new user
const createData = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const { firstName, lastName, email, favoriteColor, birthday, timeAvailable, weekdayAvailable, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday || !timeAvailable || !weekdayAvailable || !phoneNumber) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newUser = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
      timeAvailable,
      weekdayAvailable,
      phoneNumber
    };

    const result = await db.collection('users').insertOne(newUser);

    if (result.acknowledged) {
      return res.status(201).json({ id: result.insertedId });
    } else {
      return res.status(500).json({ message: 'Failed to create user' });
    }

  } catch (error) {
    console.error('Error creating user', error);
    return res.status(500).json({ message: 'Failed to create user' });
  }
};

// Update user by ID
const updateData = async (req, res, next) => {
  try {
    const db = mongodb.getDb();

    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday, timeAvailable, weekdayAvailable, phoneNumber } = req.body;

    if (!firstName && !lastName && !email && !favoriteColor && !birthday && !timeAvailable && !weekdayAvailable && !phoneNumber) {
      return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    const updateInfo = {};
    if (firstName) updateInfo.firstName = firstName;
    if (lastName) updateInfo.lastName = lastName;
    if (email) updateInfo.email = email;
    if (favoriteColor) updateInfo.favoriteColor = favoriteColor;
    if (birthday) updateInfo.birthday = birthday;
    if (timeAvailable) updateInfo.timeAvailable = timeAvailable;
    if (weekdayAvailable) updateInfo.weekdayAvailable = weekdayAvailable;
    if (phoneNumber) updateInfo.phoneNumber = phoneNumber;

    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $set: updateInfo }
    );

    if (result.matchedCount === 1) {
      return res.status(204).json({ message: 'User updated' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

  } catch (error) {
    console.error('Error updating user', error);
    return res.status(500).json({ message: 'Failed to update user' });
  }
};

// Delete user by ID
const deleteData = async (req, res, next) => {
  try {
    const db = mongodb.getDb();

    const userId = new ObjectId(req.params.id);
    const result = await db.collection('users').deleteOne({ _id: userId });

    if (result.deletedCount === 1) {
      return res.status(204).json({ message: 'User deleted' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

  } catch (error) {
    console.error('Error deleting user', error);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = { getData, getDataById, createData, updateData, deleteData };
