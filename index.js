import fundamentalStep from './Steps/FundamentalStep.js';
import Step1 from './Steps/Step1.js';
import Step2 from './Steps/Step2.js';
import Step3 from './Steps/Step3.js';
//  questionData contains the question in terms of 3 rows, 1st 2nd and 3rd : Each row stores 4 columns
let questionData = [[-3, 2, 1, 2], [4, 9, 3, -3], [6, 2330, 230, 210]];
const solve = (questionData) => {
    console.log(Step3(Step2(Step1((fundamentalStep(questionData))))));
}
solve(questionData)