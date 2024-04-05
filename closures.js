// console.log("Hello from closures.js");

// JavaScript Closures

function createMultiplier(x){
    // defines a function called multiply - closure!
    function multiply(y){
        return x * y
    }
    // returns the multiply function
    return multiply
}


let fiveTimes = createMultiplier(5);
console.log(fiveTimes);

console.log(fiveTimes(10)); // 50
console.log(fiveTimes(7)); // 35
// console.log(x); // ReferenceError: x is not defined

let timesThree = createMultiplier(3);
console.log(timesThree);

console.log(timesThree(10)); // 30
console.log(timesThree(7)); // 21


// Stateful Function
function outer(){
    let myVar = 1;
    function inner(){
        console.log(myVar++)
    }
    return inner;
}

// let adder equal the return value of outer -> the inner function
let adder = outer();
console.log(adder);

adder();
adder();
adder();
adder();
adder();
adder();

// console.log(myVar); // ReferenceError: myVar is not defined



// Non self-invoking function

// Step 1 - Create a function
function sayHi(aName){
    console.log('Hi ' + aName)
}

// Step 2 - Invoke the function with any params
sayHi('Charlie');


// IIFE - Immediately Invoked Function Expression
// (function definition)(params)


(function sayHi(aName){
    console.log('Hi ' + aName)
})('Claire');


// Create the adder (which we'll call stepper) using an IIFE

const stepper = (function(){
    let count = 1;
    return function(){
        console.log(count++)
    }
})()

console.log(stepper);

stepper();
stepper();
stepper();
stepper();
stepper();
stepper();



// let fibCache = {}
// function fib(num){
//     if (num <= 1){
//         return num
//     } else if (num in fibCache){
//         return fibCache[num]
//     } else {
//         let fibNum = fib(num - 1) + fib(num - 2)
//         fibCache[num] = fibNum
//         return fibNum
//     }
// };


// console.log(fib(30));

// console.log(fibCache);


function createFib(){
    let fibCache = {}
    function fib(num){
        if (num <= 1){
            return num
        } else if (num in fibCache){
            return fibCache[num]
        } else {
            let fibNum = fib(num - 1) + fib(num - 2)
            fibCache[num] = fibNum
            return fibNum
        }
    };
    return fib
}


const fib = createFib();


console.log(fib(60));

// console.log(fibCache); // ReferenceError: fibCache is not defined


console.log(fib);
