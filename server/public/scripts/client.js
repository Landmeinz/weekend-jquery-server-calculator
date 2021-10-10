console.log('js connected');

$(onReady);

function onReady(){
    console.log('jq connected');

    // post data
    // get data

    // EQUAL this will be the function will POST the data to the server;
    $(`#equalsButton`).on(`click`, postData)

    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`.btn`).on(`click`, currentButtonSelection);
    $(`.operator`).on(`click`, currentOperatorSelection);
    $(`.operator`).on(`click`, depressedOperatorButton);
    $(`.btn`).on(`click`, currentNumberInput);
    $(`.dot`).on(`click`, displayDot);
    // $(`.double-span`).on(`click`, currentNumberInput);
    // $(`#backButton`).on(`click`, deleteLastNumber);
    // CLEAR button set; only needs to clear the client side DOM inputs; 
    $(`#clearButton`).on(`click`, clearDisplay)


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


// BUTTON SELECTION; target all .btn which buttons are we clicking on? 
function currentButtonSelection(){
    let currentButton = $(this).text();
    console.log(`clicked on:`, currentButton);
    // $(`#calcDisplay`).text(currentButton);
    console.log(`selected operator:`, selectedOperator);
    return currentButton; 
}


let selectedOperator = ``;
function currentOperatorSelection(){
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

// delete last input number; i'll come back to this if i have time; 
// function deleteLastNumber(){
//     console.log(`log of delete last number`);
//     console.log(recordClicks);
//     recordClicks = recordClicks.slice(0, -1);
// }




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


let inputOne = '';
let inputTwo = '';


// POST DATA to the server side with this function;
function postData(){
    // let's make sure that both input fields are filled before we POST anything; 
    if($(`#inputOne`).val() === '' || $(`#inputTwo`).val() === '' ){
        return alert(`provide inputs to calculate an answer`)
    }

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
        // data: 
        // {
        //     "inputOne": $(`#inputOne`).val(),
        //     "operator": selectedOperator,
        //     "inputTwo": $(`#inputTwo`).val(),
        // }
    }).then(function(response){
        console.log(`POST SENT`, response);
        getData();
        $(`.operator`).removeClass(`pressed`)
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
        console.log(`items of historyArray`, item);
        let displayResult = `${historyArray[0].result}`;
        calcDisplay.text(displayResult);
        let listItem = ``
        listItem = `<p>${item.inputOne} ${item.operator} ${item.inputTwo} = ${item.result}</p>`;
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