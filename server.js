require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const routers = require('./routers')

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routers)

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`)
})
