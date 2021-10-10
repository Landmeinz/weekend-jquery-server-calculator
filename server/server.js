const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Server sends out static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



// GET & POST Routes below; 

// link in our modules; not totally necessary for this project but needed the practice; 
let historyArray = require(`./modules/historyArray.js`);
let data = require(`./modules/data.js`);
console.log(`current server side data:`, data);


app.get(`/data`, (req, res) => {
    res.send(data);
})

// POST the data to the server; run the data in the calc function and unshift into our running historyArray list; 
app.post(`/data`, (req, res) => {
    console.log(`this the data req.body`, req.body);
    data = req.body;

    // calc function below; run by evaluating the operator selection; 
    calcData(data)

    // let's use unshift here opposed to push to we can have a nice UI displaying the most recent calc at the top; 
    historyArray.unshift(data); // check me
    console.log(historyArray);

    // confirm we posted the data to the server; on client side we will GET the most updated data;  
    res.sendStatus(201)
})



// set a GET for the running list from historyArray; used for DOM display; 
app.get(`/historyArray`, (req, res) => {
    res.send(historyArray);
})

// app.post(`/historyArray`, (req, res) => {

//     console.log(`this the data req.body`, req.body);
//     data = req.body;

//     historyArray = [];
//     // let's use unshift here opposed to push to we can have a nice UI displaying the most recent calc at the top; 
//     console.log(historyArray);
    
//     res.sendStatus(201)
// })



// calculations are done on the server side for info storage; 
function calcData(){
    // pulling data from our data structure;
    numOne = Number(data.inputOne);
    numTwo = Number(data.inputTwo);
    operator = data.operator;

    let result = 0;
    // run the corresponding operation based on the operator selected; 
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

    // if the result is not a whole integer limit result to 3 decimal places; 
    if(result % 1 != 0){
        result = result.toFixed(3);
    }
    // adding new key:value pair to the data structure;
    data["result"] = result;
    return result;
}


// log our local host PORT so we kno we are connected to the server; 
app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })