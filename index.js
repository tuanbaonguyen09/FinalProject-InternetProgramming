const express = require('express')
const mysql = require('mysql')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser');
require("dotenv").config();

app.use(cookieParser())

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);



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


  app.post('/api/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  con.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, result) {
      if (err) throw err;
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
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM accounts WHERE email = ?", email, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          if (password == result[0].password){
              req.session.user = result
              res.send(result)
            } else {
              res.json({ message: "Sai mật khẩu" });
            }
        } else {
          res.json({ message: "Tài khoản không tồn tại" });
        }
      }
    )
  })

  app.get('/api/login', (req, res) => {
    if(req.session.user){
      res.json({loggedIn: true, user: req.session.user})
    }else {
      res.json({loggedIn: false})
    }
  })
