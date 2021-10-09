console.log('js connected');

$(onReady);

function onReady(){
    console.log('jq connected');

    // post data
    // get data

    // EQUAL this will be the function will POST the data to the server;
    $(`#equalsButton`).on(`click`, postData)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`#clearButton`).on(`click`, clearButton)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`button`).on(`click`, currentButtonSelection)
}



// BUTTONS are found here

function plusButton(){
    // buttonValue typeof === string
    let buttonValue = $(`#plusButton`).val()
    // console.log(`clicked on the ${buttonValue} button`);
}

function minusButton(){
    let buttonValue = $(`#minusButton`).val()
    // console.log(`clicked on the ${buttonValue} button`);
    // $(`#minusButton`).toggleClass("selected");
}

function multiplyButton(){
    let buttonValue = $(`#multiplyButton`).val()
    // console.log(`clicked on the ${buttonValue} button`);
    // $(`#multiplyButton`).toggleClass("selected");
}

function divideButton(){
    let buttonValue = $(`#divideButton`).val()
    // console.log(`clicked on the ${buttonValue} button`);
    // $(`#divideButton`).toggleClass("selected");
}



let selectedOperator = ``;
function currentButtonSelection(){
    let currentButton = ``;
    console.log(currentButton = `clicked on:`, $(this).val());
    selectedOperator = $(`.operator-button`).val();
    console.log(`selected operator`, selectedOperator);
    return selectedOperator;
}


// GET DATA from the server; 
function getData(){
    $.ajax({
        method: `GET`,
        url: `/data`
    }).then(function(response){
        console.log(`successful getData`, response);
        // render()
    }).catch(function(response){
        alert(`failed getData`);
    })
}

// POST DATA to the server side with this function;
function postData(){
    // post input data to the server; 
    $.ajax({
        method: `POST`,
        url: `/data`,
        data: 
        {
            "inputOne": $(`#inputOne`).val(),
            "operator": selectedOperator,
            "inputTwo": $(`#inputTwo`).val()
        }
    }).then(function(response){
        console.log(`POST SENT`, response);
        getData();
    }).catch(function(){
        alert(`POST FAILED`, response);
    });
}


function clearButton(){
    $(`#inputOne`).val(``)
    $(`#inputTwo`).val(``)
}



// RENDER the data to the DOM; 

function render(data){
    console.log(`render to the DOM current data:`, data);
}

// inputOne
//  plusButton
//  minusButton
//  multiplyButton
//  divideButton
//  inputTwo
// calcButton
// clearButton
// calcDisplay
// historyList