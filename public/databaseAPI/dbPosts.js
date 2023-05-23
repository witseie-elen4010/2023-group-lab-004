'use strict'
const database = require('./databaseFunc')

exports.getAllPosts = async (req, res) => {
  const thing = await database.getAllUsers()
  res.send(thing)
}

exports.getPost = async (req, res) => {
  res.send('getPost')
}

exports.createPost = async (req, res, next) => {
  database.createUser(req.body)
  console.log(req.body)
  res.send('createPost')
}

exports.deletePost = async (req, res) => {
  res.send('deletePost')
}
