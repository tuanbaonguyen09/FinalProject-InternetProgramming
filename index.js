const express = require('express')
const mysql = require('mysql')
const app = express()
 
app.get('/', (req, res) => {
   res.send('hello from server!')
})


app.listen(5000, () => {
   console.log('App listening on port 5000')
})


var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "test"
 });

 con.connect(function(err){
   (err) ? console.log(err) : console.log(con);
 });
 
 app.get('/api/accounts', function (req, res) {
   var sql = "SELECT * FROM accounts";
   con.query(sql, function(err, results) {
     if (err) throw err;
     res.json({accounts: results});
   })
 })
 app.get('/api/test', (req, res) => {
   res.json({ message: 'I am a message from Server!'});
   })