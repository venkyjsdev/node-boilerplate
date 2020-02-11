const http = require('http')

const express = require('express')

const routes = require('./middleware/routes')

const env = process.env.NODE_ENV || 'default'

const { httpPort } = require('./config')[env]

const passport = require('passport')

const passports = require('./middleware/controllers').passports

const app = express()

const expressLayouts = require('express-ejs-layouts')

const flash = require('connect-flash')

const session = require('express-session')

passports.handler(passport)

app.use(expressLayouts)
app.set('view engine', 'ejs')

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.error = req.flash('error')
    next()
})

routes.handler(app)

http.createServer(app).listen(httpPort, () => {
    console.log(`boilerplate started at ${new Date().toLocaleString()}`)
    console.log(`HTTPS is off. PID: ${process.pid}, PORT: ${httpPort}`)
})