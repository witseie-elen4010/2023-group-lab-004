'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const dbPosts = require('./public/databaseAPI/dbPosts')

mainRouter.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

mainRouter.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'))
})

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'landing.html'))
})

mainRouter.get('/createconsulation', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'createConsultation.html'))
})

mainRouter.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
})

mainRouter
  .route('/posts')
  .get(dbPosts.getAllPosts)
  .post(dbPosts.createPost)
mainRouter.route('/posts/:id').get(dbPosts.getPost).delete(dbPosts.deletePost)

module.exports = mainRouter
