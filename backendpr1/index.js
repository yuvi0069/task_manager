const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./table/db");  // Update the path as needed
const jwt = require('jsonwebtoken');
const user = require("./routes/user");
const notes = require("./routes/notes");

const app = express();
require('dotenv').config()
const JWT_TOKEN =process.env.JWT_TOKEN ;
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000", // Adjust to your frontend's URL
    credentials: true}));

// Session and Passport Initialization
app.use(session({
    secret: 'yuviabhi012',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_KEY,
    callbackURL: "/auth/google/callback",
    scope:["profile","email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("hereee");
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            });
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/signin", // Redirect to sign-in on failure
        session: false, // Disable sessions if not needed
    }),
    (req, res) => {
        // Successful authentication
        if (req.user) {
            // Create JWT token
            const payload = {
                user: {
                    id: req.user.id,
                },
            };

            const authtoken = jwt.sign(payload, JWT_TOKEN);
            console.log(authtoken);
            // Redirect to frontend with token in query string
            res.redirect(`http://localhost:3000/home?token=${authtoken}`);
        } else {
            // Return failure response if something goes wrong after authentication
            res.status(401).json({ success: false, msg: "Google sign-in failed" });
        }
    }
);

app.use("/user", user);
app.use("/notes", notes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
