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
    console.log(`you clicked on the + button`);
    // post input to data;
    // get and render data to dom;
        // history display; 
}

function minusButton(){
    console.log(`clicked on the - button`);
}

function multiplyButton(){
    console.log(`clicked on the * button`);
}

function divideButton(){
    console.log(`clicked on the / button`);
}

function equalsButton(){
    console.log(`clicked on the = button`);
}

function clearButton(){
    console.log(`clicked on the CLEAR button`);
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