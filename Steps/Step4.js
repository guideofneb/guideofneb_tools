// Step 4 is about making the A22 = 1 and it's simple, we'll do only operations of R2 with R3
import { ROW, levelOnePossibleCases, findGCD, levelTwoPossibleCase, levelThreePossibleCase, OneProductionLatexDataAndQuestionData } from '../Shared/Operations.js';
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
            let secondPossibility = levelTwoPossibleCase({ toMake: 1, left: questionData[1][1], right: questionData[2][2], dealingROW: ROW.R3 });
            if (secondPossibility.length !== 0) {
                possibility = secondPossibility;
            } else {
                let thirdPossibility = levelThreePossibleCase({ left: questionData[1][1], dealingROW: ROW.R2 });
                possibility = thirdPossibility;
            }
        }
        const [new_questionData, latex_data] = OneProductionLatexDataAndQuestionData({
            left: ROW.R2,
            right: possibility[0].dealingRow,
            questionData: returnObject.questionData,
            value: possibility[0].value,
            operationType: possibility[0].operationType,
            noOfVars: possibility[0].noOfVariables,
        });
        // returnObject.latexArray.push(latex_data);
        // returnObject.questionData = question_data;
        console.log(possibility);
    }

    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;
}
export default thirdStep;