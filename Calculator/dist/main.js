$(document).ready(function () { 


const displayScreen = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let decimalClicked = false;
let resetArr = [];


buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
        var value = e.target.innerText;
        var currentDisplay = displayScreen.innerText;

        if (value === 'AC') {
            resetArr = [];
            displayScreen.innerText = '0';
        } else if (value === '=') {
            try {
                // Replace ÷ with / and x with * in the expression
                var expression = currentDisplay.replace(/÷/g, '/').replace(/x/g, '*');
                // Use eval to calculate the result of the expression
                var result = eval(expression);
                // Round the result to 4 decimal places
                result = roundToPrecision(result, 4);
                // Update the display with the rounded result
                displayScreen.innerText = result;
                resetArr = [];
            } catch (error) {
                // Handle any errors that may occur during evaluation
                displayScreen.innerText = 'Error';
            }
        } else if (value === 'decimal') {
            // Check if the current display contains a decimal already
            if (currentDisplay.indexOf('.') === -1) { // Check if there is no dot
                // Check if the last character is an operator or if it's the first character
                if (!/[+\-*\/]$/.test(currentDisplay) || currentDisplay === '') {
                    displayScreen.innerText += '0' + value;
                } else {
                    displayScreen.innerText += value;
                }
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Check if the last character is an operator or if it's the first character
            if (!/[+\-*\/]$/.test(currentDisplay) || currentDisplay === '') {
                displayScreen.innerText += value;
            } else {
                // Replace the last operator with the new one
                let newDisplay = currentDisplay.slice(0, -1) + value;
                displayScreen.innerText = newDisplay;
            }
        } else {
            if (currentDisplay === '0' || currentDisplay === '0.') {
                displayScreen.innerText = value;
            } else if (value !== '.' || !currentDisplay.includes('.')) {
                // Add a digit if it's not a dot or if there's no dot in the current number
                displayScreen.innerText += value;
            } else {
                displayScreen.innerText += value;
            }
        }
    });
});


function calculateExpression(expression) {
    expression = expression.replace(/÷/g, '/').replace(/x/g, '*');
    let result = eval(expression)
    return roundToPrecision(result, 4); // Round to 4 decimal places
}

function roundToPrecision(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}


});
