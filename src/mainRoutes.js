'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()

//Display login.html page
mainRouter.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'views','login.html'))
})

module.exports = mainRouter
