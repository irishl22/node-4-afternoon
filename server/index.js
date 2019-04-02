require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')

const ctrlSwag = require('./controllers/swagController')
const ctrlAuth = require('./controllers/authController')
const ctrlCart = require('./controllers/cartController')
const ctrlSearch = require('./controllers/searchController')

const { SERVER_PORT, SESSION_SECRET} = process.env
const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.post('/api/login', ctrlAuth.login)
app.post('/api/register', ctrlAuth.register)
app.post('/api/signout', ctrlAuth.signout)
app.get('/api/user', ctrlAuth.getUser)

app.get('/api/swag', ctrlSwag.read )

app.post('/api/cart/checkout', ctrlCart.checkout)
app.post('/api/cart', ctrlCart.add)
app.delete('/api/cart', ctrlCart.delete)

app.get('/api/search', ctrlSearch.search)


app.listen(SERVER_PORT, () => {
    console.log(`listening on ${SERVER_PORT}`)})