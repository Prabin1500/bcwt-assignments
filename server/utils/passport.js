'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const {getUserLogin} = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

//locat strategy for username and password login
passport.use(
    new Strategy(async(username, password, done) => {
        const params = [username];
        try{
            const[user] = await getUserLogin(params);
            console.log('local strategy', user);
            if(user === undefined){
                return done(null, false, {message: 'Incorrect email'});
            }

            //Hash login password and compare it with the password hash in DB
            const passwordOK = await bcrypt.compare(password, user.password);
            if(!passwordOK){
                return done(null, false, {message: 'Incorrect password'});
            }
            //use spread syntax to create shallow copy to get rid of binary row type
            return done(null, {...user}, {message:'logged in successfully'});

        }catch(err){
            return done(err);
        }
    })
);

//JWT strategy for handeling bearer token
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET,
        },
        (jwtPayload , done) => {
            return done(null,jwtPayload);
        }
        
    )
);

module.exports = passport;