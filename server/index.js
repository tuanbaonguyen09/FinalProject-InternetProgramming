const express = require('express')
require('dotenv').config()
app.use(express.json())
const connectDB = require('./connectMongo')

// Connect to DB
connectDB();
// Express App
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log('App listening on port 5000')
 })

app.use("/", (req, res) => {
    return res.json({
        message: "Welcome to the Node.js REST API using ExpressJS and MongoDB"
    });
});

app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});