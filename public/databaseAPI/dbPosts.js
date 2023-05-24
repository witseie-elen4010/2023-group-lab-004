'use strict'
const database = require('./databaseFunc')

exports.getAllPosts = async (req, res) => {
  const users = await database.getAllUsers()
  res.send(users)
}

exports.getPost = async (req, res) => {
  const user = await database.getUser(req.params.id)
  res.send(user)
}

exports.createPost = async (req, res, next) => {
  database.createUser(req.body)
  res.send('User added to database')
}

exports.deletePost = async (req, res) => {
  database.deleteUser(req.params.id)
  res.send('deletePost')
}

exports.checkLogin = async (req, res) => {
  const isValid = await database.validateUser(req.body.email, req.body.password)
  res.send(isValid)
}

exports.logAction = async (req, res) => {
  // database.logAction(req.body)
  res.send('logAction')
}

exports.getAllLogs = async (req, res) => {
  // const logs = await database.getAllLogs()
  res.send('getLogs')
}
