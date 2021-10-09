console.log('js connected');

$(onReady);

function onReady(){
    console.log('jq connected');

    // post data
    // get data

    // EQUAL this will be the function will POST the data to the server;
    $(`#equalsButton`).on(`click`, equalsButton)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`#clearButton`).on(`click`, clearButton)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`button`).on(`click`, currentButtonSelection)
}

// the equals button will call this function to post the calculated data; input1 operator input2; 
function postDisplayData(){
    console.log(`input data POSTED`);
}

function getDisplayData(){
    console.log(`the big reveal`);
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




function currentButtonSelection(){
    let currentButton = ``;
    console.log(currentButton = `clicked on:`, $(this).val());
    return currentButton;

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
function equalsButton(){


    // post input data to the server; 
    // $.ajax({
    //     method: `POST`,
    //     url: `/data`,
    //     data: 
    //     {
    //         "inputOne": $(`#inputOne`).val(),
    //         "operator": currentButtonSelection,
    //         "inputTwo": $(`#inputTwo`).val()
    //     }
    // }).then(function(response){
    //     console.log(`POST SENT`, response);
    //     // getData();
    // }).catch(function(){
    //     alert(`POST FAILED`, response);
    // });
}

function clearButton(){
    $(`#inputOne`).val(``)
    $(`#inputTwo`).val(``)
}





// RENDER the data to the DOM; 

function render(){
    console.log(`render to the DOM`);
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