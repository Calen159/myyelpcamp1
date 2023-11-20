const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const User = require('../models/user')


module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err)
            }
        })
        req.flash('success', 'Welcome to Yelp Camp!')
        res.redirect('/campgrounds')
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome Back ${req.body.username}!`);
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    })
}
