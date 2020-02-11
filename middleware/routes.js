
const bodyParser = require('body-parser')

const { auth } = require('../services')

let handler = app => {

    app.use(bodyParser.urlencoded({ extended: true }))

    app.all('*', (req, res, next) => {
        console.log('hit', req.originalUrl)
        next()
    })

    app.get('/', auth.forward, (req, res) => {
        res.render('welcome')
    })

    app.get('/login', auth.forward, (req, res) => {
        res.render('login')
    })

    app.get('/register', auth.forward, (req, res) => {
        res.render('register')
    })

    app.post('/login', (req, res, next) => {
        auth.enter(req, res, next)
    })

    app.post('/register', (req, res) => {
        res.json('register')
    })

    app.get('/dashboard', auth.check, (req, res) => {
        res.render('dashboard', {
            name: req.user.name
        })
    })

    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/login');
    })

    app.all('*', (req, res) => {
        res.json('Not Found')
    })
}

module.exports.handler = handler