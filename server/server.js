const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
// let data = require('./modules/data.js');

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Server sends out static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



// GET & POST Routes go here;

let data =
    {
        "inputOne": ``,
        "operator": ``,
        "inputTwo": ``
}

let historyArray = [];

console.log(`current server side data:`, data);

app.get(`/data`, (req, res) => {
    res.send(data);
})


app.post(`/data`, (req, res) => {
    console.log(`this the data req.body`, req.body);
    data = req.body;

    historyArray.push(data);
    console.log(historyArray);

    res.sendStatus(201)
})


app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })