const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const routes = require('./routers')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.use(errorHandler)

module.exports = app
