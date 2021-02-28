import ROW from './constants.js';
//  This function takes two numbers and finds the Greatest Common Divisor using the euclid algorithm
// By GCD, we mean that it's the greatest number that can divide the given two numbers a and b 
// To find the GCD of more than two numbers Eg.3 numbers; do the following
// 
// 
// let firstNumber = 20;
// let secondNumber = 30;
// let thirdNumber = 40;
// let fourthNumber = 50;
// findGCD(fourthNumber, findGCD(thirdNumber, findGCD(firstNumber, secondNumber)));
// 
const findGCD = (a, b) => {
    if (Math.abs(a) == 0) {
        return Math.abs(b);
    }
    return findGCD(Math.abs(b) % Math.abs(a), Math.abs(a));
}
// This function finds Greatest Common Divisor for 4 numbers , it is used to find the GCD for a row in Row equivalent
const findGCDForFour = (a, b, c, d) => {
    return findGCD(a, findGCD(b, findGCD(c, d)));
}

// ---------------------------------------------------------------------------------------

// This function will reduce the given row to the lowest possible row by finding th GCD using findGCDForFour 
// and divide all the row terms using the GCD value


export { findGCDForFour, findGCD };