console.log('js connected');

$(onReady);

function onReady(){
    console.log('jq connected');
    $(`#plusButton`).on(`click`, plusButton)
    $(`#minusButton`).on(`click`, minusButton)
    $(`#multiplyButton`).on(`click`, multiplyButton)
    $(`#divideButton`).on(`click`, divideButton)
    $(`#equalsButton`).on(`click`, equalsButton)
    $(`#clearButton`).on(`click`, clearButton)
}

// 
function getDisplayData(){
    console.log(`the big reveal`);
}

function postDisplayData(){
    console.log(`input data POSTED`);
}





function plusButton(){
    // buttonValue typeof === string
    let buttonValue = $(`#plusButton`).val()
    console.log(`clicked on the ${buttonValue} button`);
    
    // post first input and the selected operator to the server data;
    // get data and render data to dom;
        // history display; 
}

function minusButton(){
    let buttonValue = $(`#minusButton`).val()
    console.log(`clicked on the ${buttonValue} button`);
}

function multiplyButton(){
    let buttonValue = $(`#multiplyButton`).val()
    console.log(`clicked on the ${buttonValue} button`);
}

function divideButton(){
    let buttonValue = $(`#divideButton`).val()
    console.log(`clicked on the ${buttonValue} button`);
}

function equalsButton(){
    let buttonValue = $(`#equalsButton`).val()
    console.log(`clicked on the ${buttonValue} button`);
    // this function needs to actually calculate the inputs with the operator; 
}

function clearButton(){
    let buttonValue = $(`#clearButton`).val()
    console.log(`clicked on the ${buttonValue} button`);
    $(`#inputOne`).val(``)
    $(`#inputTwo`).val(``)
}



function render(){
    console.log(`you clicked on the * button`);
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