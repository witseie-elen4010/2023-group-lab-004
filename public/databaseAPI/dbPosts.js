'use strict'
const database = require('./databaseFunc')

exports.getAllPosts = async (req, res) => {
  res.send('getAllPosts')
}

exports.getPost = async (req, res) => {
  res.send('getPost')
}

exports.createPost = async (req, res, next) => {
  console.log(req.body)
  database.createUser(req.body)
  res.send('createPost')
}

exports.deletePost = async (req, res) => {
  res.send('deletePost')
}
