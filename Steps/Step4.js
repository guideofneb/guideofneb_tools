// Step 4 is about making the A22 = 1 and it's simple, we'll do only operations of R2 with R3
import { ROW, levelOnePossibleCases, findGCD } from '../Shared/Operations.js';
import FundamentalStep from './FundamentalStep.js';
const thirdStep = ({ latexArray, questionData }) => {
    // Fist we will reduce each array to its lowest possible 
    let firstOperation = FundamentalStep(questionData);
    if (firstOperation.length !== 0) {
        latexArray.push(...firstOperation.latexArray);
        questionData = firstOperation.questionData;
    }
    let returnObject = {
        latexArray: latexArray,
        questionData: questionData,
    };
    if (questionData[1][1] !== 1) {
        let possibility = [];
        possibility.push(...levelOnePossibleCases(questionData[1][1], questionData[2][1], ROW.R3, 1));
        if (possibility[0].value % 1 !== 0) {

        }

        // const [question_data, latex_data] = ZeroProductionLatexDataAndQuestionData(
        //     possibility[0].operationType,
        //     possibility[0].value, ROW.R3,
        //     ROW.R1,
        //     returnObject.questionData);
        // returnObject.latexArray.push(latex_data);
        // returnObject.questionData = question_data;
        console.log(possibility);
    }

    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;
}
export default thirdStep;