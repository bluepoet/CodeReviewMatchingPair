var mysql = require('mysql')
  , DATABASE = 'testdb'
  , client = mysql.createConnection({
     host: 'bluepoet1004.cafe24.com'
    ,user: 'bluepoet'
    ,password: 'kimyong12'
    ,multipleStatements: true
});

client.query('USE ' + DATABASE);

module.exports = client;