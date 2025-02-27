const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodb = require('../db/connect');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = mongodb.getDb();
        const user = await db.collection('users').findOne({ email });

        if (!user) return res.status(401).json({ message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials'});

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.json({ token });
    } catch (error) {
        console.error('Error logging in', error);
        return res.status(500).json({ message: 'Failed to log in' });
    }
};