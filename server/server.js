const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
// let data = require('./modules/data.js');

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Server sends out static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

// GET & POST Routes go here;

// let data = [
//     {
//         key: value;
//     }
// ]

