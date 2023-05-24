'use strict'
const userTable = require('./userFunctions')
const logTable = require('./logFunctions')

exports.getAllPosts = async (req, res) => {
  const users = await userTable.getAllUsers()
  res.send(users)
}

exports.getPost = async (req, res) => {
  const user = await userTable.getUser(req.params.id)
  res.send(user)
}

exports.createPost = async (req, res, next) => {
  userTable.createUser(req.body)
  res.send('User added to database')
}

exports.deletePost = async (req, res) => {
  userTable.deleteUser(req.params.id)
  res.send('deletePost')
}

exports.checkLogin = async (req, res) => {
  const isValid = await userTable.validateUser(req.body.email, req.body.password)
  res.send(isValid)
}

exports.logAction = async (req, res) => {
  logTable.logAction(req.body)
  res.send('logAction')
}

exports.getAllLogs = async (req, res) => {
  const logs = await logTable.getAllLogs()
  res.send(logs)
}
