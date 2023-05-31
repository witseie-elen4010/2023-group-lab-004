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

mainRouter.get('/lecturerdashboard/:id', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'lecturerDashboard.html'))
})

mainRouter.get('/studentdashboard/:id', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'studentDashboard.html'))
})

mainRouter.get('/viewlogs', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'logs.html'))
})

mainRouter.get('/myConsultations/:id', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'myConsultations.html'))
})

mainRouter
  .route('/posts')
  .get(dbPosts.getAllPosts) // get all users
  .post(dbPosts.createPost) // add user
mainRouter.route('/posts/:id').get(dbPosts.getPost).delete(dbPosts.deletePost)
mainRouter.route('/checkLogin').post(dbPosts.checkLogin)

// log all actions taken
mainRouter
  .route('/log')
  .post(dbPosts.logAction)
  .get(dbPosts.getAllLogs)

// consultation routes
mainRouter.route('/addConsultation').post(dbPosts.addConsultation)
mainRouter.route('/getConsultations').post(dbPosts.getConsultations)
mainRouter.route('/getAllConsultations').get(dbPosts.getAllConsultations)

// booking routes
mainRouter.route('/addBooking').post(dbPosts.addBooking)

module.exports = mainRouter
