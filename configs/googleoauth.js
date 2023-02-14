const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { use } = require('passport');
const passport = require('passport')
const { v4: uuidv4 } = require('uuid')

const {userModel} = require('../models/user.model')
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4500/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        let email = profile._json.email
        const user = new userModel({
            email,
            password: uuidv4()
        })
        await user.save()
        return cb(null, user);
    }
));

module.exports = passport