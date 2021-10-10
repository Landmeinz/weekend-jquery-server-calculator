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

let historyArray = require(`./modules/historyArray.js`);
let data = require(`./modules/data.js`);


console.log(`current server side data:`, data);

app.get(`/data`, (req, res) => {
    res.send(data);
})


app.post(`/data`, (req, res) => {
    console.log(`this the data req.body`, req.body);
    data = req.body;

    calcData(data)

    historyArray.push(data); // check me
    console.log(historyArray);

    res.sendStatus(201)
})


app.get(`/historyArray`, (req, res) => {
    res.send(historyArray);
})


function calcData(){
    numOne = Number(data.inputOne);
    numTwo = Number(data.inputTwo);
    operator = data.operator;

    let result = 0;

    switch (operator) {
        case `+`:
            result = numOne+numTwo
            break;
        case `-`:
            result = numOne-numTwo
            break;
        case `*`:
            result = numOne*numTwo
            break;
        case `/`:
            result = numOne/numTwo
            break;
        default:
            alert(`there seems to be an error`)
            break;
    }
    console.log(`--- this is the result: ${result}`);
    // adding new key:value pair to the data structure; 
    data["result"] = result; 
    return result;
}



app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })