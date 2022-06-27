const express = require("express");
const User = require("../Models/User");
const { model, models } = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');


const JWT_SECRET = "Harry";


//Route - 1 || Create a User using: POST "/api/auth/createuser", No login required
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {
    /*obj = {
        a: 'auth',
        number: 11
    }
    res.json(obj);
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);*/

    let success = false;

    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }


    try {
        //Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }

        //Password Hashing and Salt
        const salt = await bcrypt.genSalt(11);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        //Create User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        //res.json(user);
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }

})

//Route - 2 || Authentication a User using: POST "/api/auth/login", No login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        //Check whether the user with this email exists already
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials." });
        }

        //res.json(user);
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }

})

//Route - 3 || Get loggedin User Details using: POST "/api/auth/getuser", login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval Server Error.");
    }

})

module.exports = router;