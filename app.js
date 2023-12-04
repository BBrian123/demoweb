const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// app.post('/playaudio', (req, res) => {
//     let filePath = path.join(__dirname, 'demo.mp3'); 
//     res.sendFile(filePath);
// });

app.post('/playaudio', (req, res) => {
    const audioPath = path.join(__dirname, 'demo.mp3'); 
    const stat = fs.statSync(audioPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(audioPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/mpeg',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'audio/mpeg',
        };
        res.writeHead(200, head);
        fs.createReadStream(audioPath).pipe(res);
    }
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