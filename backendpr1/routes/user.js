const express = require('express');
const passport = require('passport');
const { User } = require('../table/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const usermiddleware = require('../middlwares/usermiddleware');

const route = express.Router();
const JWT_TOKEN = 'yuviabhi0012';

// Google OAuth routes
route.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']

}));

route.get('/auth/google/callback', passport.authenticate('google', {
   
    failureRedirect: '/login'
}), (req, res) => {
    console.log("here")
    res.redirect('http://localhost:3000/home'); // Redirect to your desired page after successful login
});

// Existing sign-up route
route.post("/signup", [
    body('name', 'Enter a valid name').isLength({ min: '5' }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        res.json({ success, errors: errors.array() });
    } else {
        const check = await User.findOne({ email: req.body.email });
        if (check) {
            res.json({ success, msg: "User already exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const secp = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secp,
            });
            const payload = {
                user: {
                    id: user.id
                }
            };
            const authtoken = jwt.sign(payload, JWT_TOKEN);
            success = true;
            res.json({ success, authtoken });
        }
    }
});

// Existing sign-in route
route.post("/signin", body('email', 'Enter valid email').isEmail(), async (req, res) => {
    let user = await User.findOne({ email: req.headers.email });
    let success = false;
    if (!user) {
        res.json({ success, msg: "Please create an account" });
    } else {
        const comp = await bcrypt.compare(req.headers.password, user.password);
        if (!comp) {
            res.status("401").json({ success, msg: "Invalid credentials" });
        } else {
            const data = {
                user: {
                    id: user.id
                }
            };
            const authtoken = jwt.sign(data, JWT_TOKEN);
            success = true;
            res.json({ success, authtoken });
        }
    }
});

route.post("/getuser", usermiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({ msg: user.name });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports = route;
