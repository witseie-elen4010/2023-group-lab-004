'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()

mainRouter.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

mainRouter.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'))
})

mainRouter.get('/landing', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'landing.html'))
})

module.exports = mainRouter
