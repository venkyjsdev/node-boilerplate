
const passwords = require('./passwords')

let hash = 'sao4weuqeposadf'

let data = {
    id: '78949524143',
    name : 'Venky',
    email : 'venkywatson33@gmail.com',
    password: '$2a$10$ZISv5lbkhNvCYhs4WkxdE.zGPIzZf5/3Q4wPJdeEFnEZxBgQIqyWy'
}

let login = (email, password) => {
    return new Promise((resolve, reject) => {
        if (email == data.email ) {
            passwords.compare(password, data.password)
            .then(result => {
                if (result) resolve(data)
                else reject('Invalid Password')
            })
            .catch(e => reject(e))
        }
        else reject('Invalid Email')
    })
}




module.exports.login = login