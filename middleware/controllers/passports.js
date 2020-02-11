

const LocalStrategy = require('passport-local').Strategy;

const auth = require('./auth')

let data = {
    id: '78949524143',
    name: 'Venky',
    email: 'venkywatson33@gmail.com',
    password: '$2a$10$ZISv5lbkhNvCYhs4WkxdE.zGPIzZf5/3Q4wPJdeEFnEZxBgQIqyWy'
}


let passportHandler = passport => {
    
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        auth.login(email, password)
            .then(user => done(null, user))
            .catch(e => done(null, false, { message: e }))

    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        done(null, data)
    })
}

module.exports.handler = passportHandler

