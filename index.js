import fundamentalStep from './Steps/FundamentalStep.js';
import Step1 from './Steps/Step1.js';
import Step2 from './Steps/Step2.js';
import Step3 from './Steps/Step3.js';
import Step4 from './Steps/Step4.js';
import { findGCD } from './Shared/Operations.js';
import Fraction from 'fraction.js'
//  questionData contains the question in terms of 3 rows, 1st 2nd and 3rd : Each row stores 4 columns
let questionData = [[1, 2, -2, 0], [3, 2, -1, 1], [2, 1, -3, -1]];
const solve = (questionData) => {

    function secondPoss({ toMake, leftRowData, rightRowData }) {
        // R1 -> xR1 + (+-yR2)
        // Initially to find x and y, let x = 1
        let x = 1, y, GCD;
        y = toMake - (x * leftRowData);
        x = rightRowData;
        GCD = findGCD(x, y);
        y = y / GCD;
        x = x / GCD;
        // The above are the values of x and y
        return [x, y]
    }


    console.log(secondPoss({ leftRowData: 3, rightRowData: 7, toMake: 1 }))
    // console.log(Step4(Step3(Step2(Step1(fundamentalStep(questionData))))));
    // var x = new Fraction(1.12670689108);
    // var res = x.toFraction(false);
    // console.log(res);
}
solve(questionData)