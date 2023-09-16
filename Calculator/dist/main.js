var displayScreen = document.querySelector('#display');
var resetArr = [];
var lastOperator = null;

function calculateExpression(expression) {
    expression = expression.replace(/÷/g, '/').replace(/x/g, '*');
    let result = eval(expression)
    return roundToPrecision(result, 4); // Round to 4 decimal places
}

function roundToPrecision(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function handleOperator(newOperator) {
  const currentText = displayScreen.innerText;
  const lastChar = currentText.charAt(currentText.length - 1);

  if (['+', '*', '/'].includes(lastChar) && newOperator !== '-') {
    // Remove the previously clicked operator
    displayScreen.innerText = currentText.slice(0, -1) + newOperator;
  } else {
    // Append the new operator
    displayScreen.innerText += newOperator;
  }
}

function handleNumber(number) {
    const currentText = displayScreen.innerText;
    
    if (currentText === '0' || currentText === '') {
        displayScreen.innerText = number;
    } else {
        displayScreen.innerText += number;
    }
}

document.querySelector('#clear').addEventListener('click', () => {
    displayScreen.innerText = 0; //'0'
});

document.querySelector('#equals').addEventListener('click', () => {
    displayScreen.innerText = calculateExpression(displayScreen.innerText);
    resetArr = [];
});

document.querySelector('#decimal').addEventListener('click', () => {
    const currentNumber = displayScreen.innerText.split(/[+\-*/]/).pop();
    if (!currentNumber.includes('.')) {
        displayScreen.innerText += '.';
    }
});

document.querySelectorAll('#divide, #multiply, #add, #subtract').forEach(operator => {
    operator.addEventListener('click', () => {
        handleOperator(operator.innerText);
    });
});

document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine').forEach(button => {
    button.addEventListener('click', () => {
        handleNumber(button.innerText);
    });
});

