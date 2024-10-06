// Question:
// Implement a method that takes an expression and performs the calculation accordingly.

//  example: calculation of [ 1+(2+3)*4-10/2 ]
//  Note: Verify that BODMAS is applied in case of complex queries and the correct result is returned.

// const data = '1+2*3-5' // 1+6-5 -> 7-5 -> 2
// console.log(eval(data)) // 2

// Requirements -
// user will only only string, 
// char validation - 0-9, +,-,/,%

/**
 * @function evaluateExpression - it will be calculate your mathematical operations
 * @param {*} expr - always will be '1+2-3%7'
 */
function evaluateExpression(expr){
    // CASE 1 : replace value will be reassign as ''
    expr = expr.replace(/\s+/g,'')

    // CASE 2 : invalid checks 'asdf@#'
    const isValidExpr = /^[0-9]+(\.[0-9]+)?([+\-*/][0-9]+(\.[0-9]+)?)*$/.test(expr);
    if(!isValidExpr) throw Error('Invalid Expression ! Value should be like this : 1/9_')

    const values = []; // [1,2] //3
    const operators = []; // [+]

    // find the precedence 
    function precedence(op){
        if(op === '+' || op === '-') return  1;
        if(['*','/','%'].includes(op)) return 2;
        return 0
    }

    /**
     * @function applyOperators - this will be apply the operation inside the values
     * with the help of operators
     */
    function applyOperators(){
        // [12,10,20] 
        // [+,-]
        const right = values.pop(); // 20
        const left = values.pop(); //10
        const operator = operators.pop(); // -
        //+,-,*,%,/
        switch(operator){
            case '-':
                values.push(left-right);
                break;
            case '+':
                values.push(left+right);
                break;
            case '*':
                values.push(left*right);
                break;
            case '/':
                values.push(left/right);
                break;
            case '%':
                values.push(left%right);
                break;
        }
    }

    // preparing the current number
    let currentNumber = ''; //9+3%10...
    for(let char of expr){
        if(/\d/.test(char)){
            // 98
            currentNumber +=char; // current build
        }else if(['+','-','*','/','%'].includes(char)){
            if(currentNumber){
                values.push(parseFloat(currentNumber)) // push the current number inside the values;
                currentNumber = ''; // reset the current number
            }

            const lengthOfOpe = operators.length; // [+,-] // -
            while(lengthOfOpe && precedence(operators[lengthOfOpe-1]) >= precedence(char)){
                applyOperators(); // apply the operator on the top of the stack 
            }
            operators.push(char)//curr operator, this will be pushed inside our operators
        }
    }

    // values = [1,4,5]
    // operator = [+,-]
    // push the last number to values
    if(currentNumber){
        values.push(parseFloat(currentNumber))
    }

    // apply remainging operator
    while(operators.length){
        applyOperators();
    }

    // resulting data will look somthing like this
    // values = [12]

    return values[0]
}

let result = evaluateExpression('1+2 +    5 ') // 8
// console.log(result)

// evaluateExpression('1+2 +   fasdf 5 ') // error

result = evaluateExpression('1+2 + 90 - 10 * 20 ')//-107
console.log(result) //-107

// console.log(eval('1+2 + 90 - 10 * 20 ')) //-107