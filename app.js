const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/playaudio', (req, res) => {
    let filePath = path.join(__dirname, 'demo.mp3'); 
    res.sendFile(filePath);
});

app.post('/getphoto',(req,res)=>{
    let filePath = path.join(__dirname, 'demo.jpg'); 
    res.sendFile(filePath);
})

app.get('/',(req, res) => {
    let filePath = path.join(__dirname, 'index.html'); 
    res.sendFile(filePath);
})

const server = app.listen(3000);
module.exports = app;