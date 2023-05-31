'use strict'
const userTable = require('./userFunctions')
const logTable = require('./logFunctions')
const consultationTable = require('./consultationFunctions')
const bookingTable = require('./bookingsFunctions')

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

exports.addConsultation = async (req, res) => {
  const consultation = await consultationTable.addConsultation(req.body)
  res.send(consultation)
}

exports.getConsultations = async (req, res) => {
  const consultations = await consultationTable.getAllConsultations(req.body.email)
  res.send(consultations)
}

exports.cancelConsultation = async (req, res) => {
  const consultation = await consultationTable.cancelConsultation(req.body.id)
  res.send(consultation)
}

exports.getAllConsultations = async (req, res) => {
  const consultations = await consultationTable.getAllPlannedConsultations()
  res.send(consultations)
}
exports.addBooking = async (req, res) => {
  const booking = await bookingTable.addBooking(req.body.studentEmail, req.body.meetingID)
  res.send(booking)
}

exports.getStudentConsultations = async (req, res) => {
  const consultations = await bookingTable.getStudentBookings(req.body.studentEmail)
  res.send(consultations)
}
