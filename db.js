'use strict'

const mysql = require('mysql2')
const fs = require('fs')

const config =
{
  host: 'mysql-calendr-server.mysql.database.azure.com',
  user: 'username',
  password: 'Docrat15',
  database: 'calendrdb',
  ssl: { ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem') }
}

const pool = new mysql.createPool(config)

module.exports = pool
