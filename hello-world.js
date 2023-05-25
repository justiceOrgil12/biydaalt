const express = require('express')
const dotenv = require('dotenv');
const bodyParser= require('body-parser')
const { init } = require('./db')
const routes = require('./book-api')
const cors = require('cors');
dotenv.config({ path: "./config/config.env" });
const app = express()




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(routes)
app.use(cors());
app.use(express.static('public'))
init().then(() =>{
    console.log(`Starting Main Server on port`)
    app.listen(5500)
})