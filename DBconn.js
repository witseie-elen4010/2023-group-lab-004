const mysql = require('mysql')
const fs = require('fs')

const config =
{
  host: 'mysql-calendr-server.mysql.database.azure.com',
  user: 'username',
  password: 'Docrat15',
  database: 'CalendrDB',
  port: 3306,
  ssl: { ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem') }
}

const conn = new mysql.createConnection(config)

conn.connect(
  function (err) {
    if (err) {
      console.log('!!! Cannot connect !!! Error:')
      throw err
    } else {
      console.log('Connection established.')
    }
  })

module.exports = conn
