let numbersMap = {'one': 1, 'two': 2, 'three': 3, 'four': 4,
                    'five': 5, 'six': 6, 'seven': 7, 'eight': 8,
                    'nine': 9, 'zero': 0, 'plus': '+', 'minus': '-',
                    'times': '*', 'divide': '/', 'equals': '=', 
                    'clear': 'Clear'};
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
buttons.forEach((button) => {
    button.textContent = numbersMap[button.classList[1]];
});

let input = [];
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Clear'){
            input = [];
            display.textContent = '';
        }
        else if (button.textContent === '=') {
            display.textContent = calculate(input);
            input = [];
        }
        else {
            input.push(numbersMap[button.classList[1]]);
            display.textContent = input.join(' ');
        }
       
    });
});


function operate(first, second, operator) {
    switch (operator) {
        case '+': return first + second;
        case '-': return first - second;
        case 'x': return first * second;
        case '/': return first / second;
    }
    return 'error';
}

function evaluate(input) {
    let res = 0, sum = 0, sign = 1;
    let myStack = [];
    myStack.push(1);
    const isDigit = (ch) => {
        return ch >= '0' && ch <= '9';
    }
    for(let ch of input){
        if(isDigit(ch)) sum = sum * 10 + (ch - '0');
        else{
            res += sum * sign * myStack[myStack.length - 1];
            sum = 0;
            if(ch === '-') sign = -1;
            else if(ch === '+') sign = 1;
            else if(ch === '(') {myStack.push(myStack[myStack.length - 1] * sign); sign = 1;}
            else if(ch === ')') myStack.pop(); 
        }
    }
    return res += (sign * sum);
};

var calculate = function(s) {
    let stack = [];
    let num = '';
    let sign = null
    // we loop till the full length of the array to account for last sign
    for(let i = 0; i <= s.length; i++){    
      const curr = s[i];
      //handle space
      if(curr === ' ') continue;
      //if char is a number
      if(!isNaN(curr)) num+=curr;
      //if we have a  sign + - / *
      if(isNaN(curr)){
        num = Number(num)
        switch(sign){
          case '+':
          case null:
            //we push the initial number into the stack
            stack.push(num)
            break;
          case '-':
            //we push any values after the subtraction sign as negative
            stack.push(-num)
            break; 
          case '*':
            //we pop the stack then multiply and push back
            stack.push(stack.pop()*num)
            break;
          case '/':
            //we pop the stack then devide and push back
            stack.push(parseInt(stack.pop()/num, 10))
            break;           
        }
        // sign becomes current sign
        sign = curr;
        // we reset num
        num = '';
      }
    }
    //we reduce the array adding positive and negative numbers
    return stack.reduce((a,b)=>{
      return a+b
    },0)
  };