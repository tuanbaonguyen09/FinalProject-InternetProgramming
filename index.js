const express = require('express')
const mysql = require('mysql')
require("dotenv").config();
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen(5000, () => {
   console.log('App listening on port 5000')
})
app.get('/', function (req, res) {
  res.send("Hello from server !")
})

var con = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database:  process.env.MYSQL_DB
 });

 con.connect(function(err){
   (err) ? console.log(err) : console.log(con);
 });


 app.post('/api/register', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  con.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, result) {
      if (err) throw err;
        // if user not found
        if (result.length <= 0) {
          con.query('INSERT INTO accounts (email, password) VALUES (?, ?)', [email, password],function(err, result) {
            if (err) throw err;
            res.json({message:"Đăng ký thành công !"})
          })
        }else{
          res.json({message:"Tài khoản đã tồn tại"})
        }
    })
  })
  
app.post('/api/login', (req, res) => {
  var sql = "SELECT * FROM accounts";
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.json({news: results});
  });
});
