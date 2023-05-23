'use strict'

const express = require('express')
const app = express()
const mainRouter = require('./mainRoutes')

app.use(express.json())
app.use('/', mainRouter)

app.use('/cdn', express.static('public'))

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port 3000')
