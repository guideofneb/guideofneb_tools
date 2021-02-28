import { fundamentalStep, firstStep } from './Steps.js';
//  questionData contains the question in terms of 3 rows, 1st 2nd and 3rd : Each row stores 4 columns
let questionData = [[-2, 2, 2, 2], [6, 9, 3, -3], [3200, 2330, 230, 210]];
const solve = (questionData) => {
    // This will return an object of 
    console.log(firstStep(
        (fundamentalStep(questionData))
    ));
}
solve(questionData)