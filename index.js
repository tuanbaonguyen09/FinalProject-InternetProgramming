const express = require('express')
const mysql = require('mysql')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const multer = require('multer')
const app = express()
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

var storage = multer.diskStorage ({
  destination : './uploads',
  filename: function (req, file, cb) {
    cb (null,req.body.userName + file.originalname )
  }
})
var upload = multer({ storage: storage }).single("file");

app.post('/api/register', (req, res) => {
const email = req.body.email;
const name = email.split("@")[0]
const password = req.body.password;
con.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, result) {
    if (err) throw err;
      if (result.length <= 0) {
        con.query('INSERT INTO accounts (email, password) VALUES (?, ?)', [email, password],function(err, result) {
          if (err) throw err;
          res.json({message:"Đăng ký thành công !", redir:true})
        })
        con.query(`CREATE TABLE ${name} (id INT(1) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(250) NOT NULL,date DATE,imgBuffer LONGTEXT)`,function(err,result){
          if (err) throw err;
        })
      }else{
        res.json({message:"Tài khoản đã tồn tại", redir:false})
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

app.post('/api/upload',upload, (req, res) => {
  console.log(req.file)
})


app.get('/api/login', (req, res) => {
  if(req.session.user){
    res.json({loggedIn: true, user: req.session.user})
  }else {
    res.json({loggedIn: false})
  }
})