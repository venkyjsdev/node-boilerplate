
const passport = require('passport')

let login = (req, res, next) => {
    console.log(req.body.password)
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
}

let isLoggedIn = (req, res, next) => {
    console.log('check')
    if (req.isAuthenticated()) return next()
    req.flash('error_msg', 'Please log in to view that resource')
    res.redirect('/login')
}

let forwardAuthenticated = (req, res, next) => {
    console.log('forward')
    if (!req.isAuthenticated()) return next()
    res.redirect('/dashboard')
}



module.exports.enter = login
module.exports.check = isLoggedIn
module.exports.forward = forwardAuthenticated
