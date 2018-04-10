const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v4')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())


const snacksRoutes = require('./src/routes/snacks')
app.use('/snacks', snacksRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
