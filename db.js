'use strict'

const mysql = require('mysql2')
const fs = require('fs')
require('dotenv').config();

const config =
{
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: { ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem') }
}

const pool = new mysql.createPool(config)

module.exports = pool
