console.log('js connected');

$(onReady);

function onReady(){
    console.log('jq connected');

    // EQUAL this will be the function will POST the data to the server;
    $(`#equalsButton`).on(`click`, postData)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`.btn`).on(`click`, currentButtonSelection);

    // click listeners to eval the two different types of buttons; numbers & operators;
    $(`.operator`).on(`click`, currentOperatorSelection);
    $(`.operator`).on(`click`, depressedOperatorButton);

    // target all buttons to get feed back on console and to record all click inputs; 
    $(`.btn`).on(`click`, currentNumberInput);

    // only allows one . on the display at the moment; need to bug fix allowing inputTwo to also allow a . ;
    $(`.dot`).on(`click`, displayDot);

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`#clearButton`).on(`click`, clearDisplay)

    // let's get any of the past data when we refresh the page;
    getHistoryArray();
}



// BUTTON SELECTION; target all .btn; console log which buttons are we clicking on; 
function currentButtonSelection(){
    // track all button clicks; 
    let currentButton = $(this).text();
    // log the button we just clicked on;
    console.log(`clicked on:`, currentButton);

    // also log the current selected operator; 
    console.log(`selected operator:`, selectedOperator);
    return currentButton; 
}



// global variable for the selected operator; 
let selectedOperator = ``;
function currentOperatorSelection(){

    // we will set the selectedOperator with the LAST operator button we clicked on; the one with the .pressed class;
    selectedOperator = $(this).text();
    console.log(`selected operator:`, selectedOperator);

    return selectedOperator;
}



// running list of the numbers and operators pressed; 
let recordClicks = '';
function currentNumberInput(){
    let currentNumber = $(this).text();

    if(currentNumber != `.`){
        $(`#calcDisplay`).text(currentNumber)
        recordClicks += currentNumber;
        $(`#calcDisplay`).text(recordClicks)
    }
}



// only allow one . on the display at a time; need to BUG fix allowing for a second . after the operator; so we can run 12.5 * 3.5; 
function displayDot(){
    if(recordClicks.length === 0){
        recordClicks = `0.`;
    } else if(recordClicks.indexOf(".") == -1){
        recordClicks = recordClicks+= `.`;
    }
}



function clearDisplay(){
    $(`#calcDisplay`).text(``)
    recordClicks = '';
    $(`.operator`).removeClass(`pressed`)
}



// CSS class .pressed applied to the operator that's currently selected; 
function depressedOperatorButton(){
    switch (selectedOperator) {
        case `+`:
            $(`.operator`).removeClass(`pressed`)
            $(this).addClass(`pressed`);
            break;
        case `-`:
            $(`.operator`).removeClass(`pressed`)
            $(this).addClass(`pressed`);
            break;
        case `*`:
            $(`.operator`).removeClass(`pressed`)
            $(this).addClass(`pressed`);
            break;
        case `/`:
            $(`.operator`).removeClass(`pressed`)
            $(this).addClass(`pressed`);
            break;
        default:
            break;
    }
}



// GET DATA from the server; 
function getData(){
    $.ajax({
        method: `GET`,
        url: `/data`
    }).then(function(response){
        console.log(`successful GET`, response);
        getHistoryArray();
    }).catch(function(response){
        alert(`failed getData`);
    })
    recordClicks = '';
}



// global variables do send to our server data; 
let inputOne = '';
let inputTwo = '';
// POST DATA to the server side with this function;
function postData(){
    

    // get index of the selectedOperator so that we can slice recordClicks on both sides; 
    let opIndex = recordClicks.indexOf(selectedOperator);
    // inputOne will be everything before the operator button push;
    inputOne = recordClicks.slice(0, opIndex);
    console.log(`--- this is inputOne:`, inputOne);
    // inputTwo will be everything after operator and before the equals button push; 
    inputTwo = recordClicks.slice(opIndex+1, recordClicks.length);
    console.log(`--- this is inputTwo:`, inputTwo);

    // post input data to the server; 
    $.ajax({
        method: `POST`,
        url: `/data`,
        data: {
            "inputOne": inputOne,
            "operator": selectedOperator,
            "inputTwo": inputTwo,
        }
    }).then(function(response){
        console.log(`POST SENT`, response);
        getData();
        $(`.operator`).removeClass(`pressed`)
    }).catch(function(){
        clearDisplay();
        alert(`POST FAILED!`);
    });

     // let's make sure that both input fields are filled before we POST anything; 
     if(inputOne === '' || inputTwo === '' ){
        clearDisplay();
        return alert(`provide inputs to calculate an answer`)
        } else if(inputOne === ''){
            inputOne = `${historyArray[0].result}`;
        }    

}



function getHistoryArray(){
    $.ajax({
        method: `GET`,
        url: `/historyArray`
    }).then(function(response){
        console.log(`successful GET`, response);
        render(response);
    }).catch(function(response){
        alert(`failed getData`);
    })
}



// RENDER the data to the DOM; 
function render(historyArray){
    console.log(`RENDER to the DOM current data:`, historyArray);
    
    let historyListDisplay = $(`#historyListDisplay`);
    historyListDisplay.empty()

    let calcDisplay = $(`#calcDisplay`);
    calcDisplay.empty();

    for(let item of historyArray){

        console.log(`items of historyArray`, item);
        let displayResult = `${historyArray[0].result}`;
        calcDisplay.text(displayResult);

        let listItem = ``
        listItem = `<p>${item.inputOne} ${item.operator} ${item.inputTwo} = ${item.result}</p>`;
        historyListDisplay.append(listItem);
    }
}
