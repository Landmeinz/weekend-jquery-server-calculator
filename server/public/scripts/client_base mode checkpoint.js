console.log('js connected');

$(onReady);

function onReady(){
    console.log('jq connected');

    // post data
    // get data

    // EQUAL this will be the function will POST the data to the server;
    $(`#equalsButton`).on(`click`, postData)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`#clearButton`).on(`click`, clearInputs)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`.operator-button`).on(`click`, currentButtonSelection)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    // $(`.operator-button`).on(`click`, toggleSelectedColor)

    // let's get the data when we refresh the page;
    getHistoryArray();
}



// BUTTONS are found here; I think i might use these later;
// function plusButton(){
//     // buttonValue typeof === string
//     let buttonValue = $(`#plusButton`).val()
//     // console.log(`clicked on the ${buttonValue} button`);
// }
// function minusButton(){
//     let buttonValue = $(`#minusButton`).val()
//     // console.log(`clicked on the ${buttonValue} button`);
//     // $(`#minusButton`).toggleClass("selected");
// }
// function multiplyButton(){
//     let buttonValue = $(`#multiplyButton`).val()
//     // console.log(`clicked on the ${buttonValue} button`);
//     // $(`#multiplyButton`).toggleClass("selected");
// }
// function divideButton(){
//     let buttonValue = $(`#divideButton`).val()
//     // console.log(`clicked on the ${buttonValue} button`);
//     // $(`#divideButton`).toggleClass("selected");
// }


// BUTTON SELECTION; which buttons are we clicking on? 
let selectedOperator = ``;
function currentButtonSelection(){

    let currentButton = $(this).val();
    console.log(`clicked on:`, currentButton);

    selectedOperator = $(this).val();
    console.log(`selected operator`, selectedOperator);
    return selectedOperator;
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
}



// POST DATA to the server side with this function;
function postData(){
    // let's make sure that both input fields are filled before we POST anything; 
    if($(`#inputOne`).val() === '' || $(`#inputTwo`).val() === '' ){
        return alert(`provide inputs to calculate an answer`)
    }
    // post input data to the server; 
    $.ajax({
        method: `POST`,
        url: `/data`,
        data: 
        {
            "inputOne": $(`#inputOne`).val(),
            "operator": selectedOperator,
            "inputTwo": $(`#inputTwo`).val(),
        }
    }).then(function(response){
        console.log(`POST SENT`, response);
        getData();
        clearInputs();
    }).catch(function(){
        clearInputs();
        alert(`POST FAILED!`);
    });
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



function clearInputs(){
    $(`#inputOne`).val(``)
    $(`#inputTwo`).val(``)
}


// can't quite figure this out; i only want one button to have the selected background at a time; 
// function toggleSelectedColor(){
//     let currentClass = $(this).attr(`class`);
//     console.log(`--- this is the currentClass:`, currentClass);
//     switch (currentClass) {
//         case `operator-button`:
//             $(this).toggleClass(`selected`);
//             break;
//         case `operator-button selected`:
//             $(this).toggleClass(`not-selected`);
//             break;
//         default:
//             break;

//     $(this).addClass(`.selected`);
//     let opButton = $(`.operator-button`);

//     if(opButton.hasClass(`.selected`)){
//         opButton.addClass(`.not-selected`)
//     }
// }


// RENDER the data to the DOM; 
function render(historyArray){
    console.log(`RENDER to the DOM current data:`, historyArray);
    
    let historyListDisplay = $(`#historyListDisplay`);
    historyListDisplay.empty()

    let calcDisplay = $(`#calcDisplay`);
    calcDisplay.empty();

    for(let item of historyArray){
        let displayResult = `${item.result}`;
        calcDisplay.text(displayResult);
        let listItem = ``
        listItem = `<li>${item.inputOne} ${item.operator} ${item.inputTwo} = ${item.result}</li>`;
        historyListDisplay.append(listItem);
    }
}

{/* <li>dummy html history text</li>
        <li>4 + 8 = 12</li>
        <li>6 * 3 = 18</li> */}

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