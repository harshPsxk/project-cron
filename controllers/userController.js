const User = require('../models/userModel');

const getAllUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const getUserById = (req, res) => {
    const id = req.params.id;
    User.getUserById(id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result[0]);
    });
};

const createUser = (req, res) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        created_at: new Date()
    };
    User.createUser(newUser, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...newUser });
    });
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const updatedUser = {
        name: req.body.name,
        email: req.body.email
    };
    User.updateUser(id, updatedUser, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    User.deleteUser(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
