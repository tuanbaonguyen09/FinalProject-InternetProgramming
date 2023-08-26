const express = require('express')
const mysql = require('mysql')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const multer = require('multer')
const app = express()
require("dotenv").config();
const PORT = 5000;
const HOST = '0.0.0.0';
const cors = require('cors');

app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080'
}));



app.use(cookieParser())
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: false,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen(PORT, HOST, () => {
   console.log('App listening on port 5000')
})


app.get('/', function (req, res) {
  res.send("Hello from server !")
})

var con = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.MYSQL_DB,
   port: process.env.DB_PORT
});

con.connect(function(err){
    if (err) throw err;
  console.log("My SQL Connected!");
  let sql = "CREATE TABLE IF NOT EXISTS accounts (id INT(1) PRIMARY KEY AUTO_INCREMENT, email TEXT,password TEXT)"
  con.query(sql, function (err, result) {
    if (err) throw err;
  })
})

const upload = multer({storage:multer.memoryStorage()})

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

app.post('/api/upload',upload.single('file'), (req, res) => {
  const imgBuffer = req.file.buffer.toString('base64')
  const name = req.session.user[0].email.split('@')[0]
  const fileName = req.body.inputName.length > 0 ? req.body.inputName : req.file.originalname
  const sql = `INSERT INTO ${name} VALUES(NULL,?,CURDATE(),?)`;
  con.query(sql, [fileName ,imgBuffer], (err,result) => {
    if(err) throw err
    res.json({message:"Upload thành công !"})
  })
})

app.post('/api/gallery', (req,res) => {
  const name = req.session.user[0].email.split('@')[0];
  const sql = `SELECT * FROM ${name}`
  con.query(sql, (err, result) => {
    if (err) throw err
    if(result.length > 0) 
      res.json({gallery: result})
    else 
    res.json({ message: "Thư viện trống" });
  })
})

app.get('/api/login', (req, res) => {
  if(req.session.user){
    res.json({loggedIn: true, user: req.session.user})
  }else {
    res.json({loggedIn: false})
  }
})

app.post('/api/logout', (req, res) => {
  if(req.session.user){
    req.session.destroy((err) =>{
      if(err) throw err;
      res.json({message: "Đăng xuất thành công"})
    })
  }else {
    res.json({message: "Lỗi đăng xuất"})
  }
})