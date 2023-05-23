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
  console.log(req.body)
  res.send('createPost')
}

exports.deletePost = async (req, res) => {
  res.send('deletePost')
}
