// Step 4 is about making the A22 = 1 and it's simple, we'll do only operations of R2 with R3
import { ROW, levelOnePossibleCases, findGCD, levelTwoPossibleCase, levelThreePossibleCase, OneProductionLatexDataAndQuestionData } from '../Shared/Operations.js';
import FundamentalStep from './FundamentalStep.js';
const fourthStep = ({ latexArray, questionData }) => {
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
    if (questionData[1][1] === -1) {
        returnObject.questionData[1] = [returnObject.questionData[1][0] * (-1), returnObject.questionData[1][1] * (-1), returnObject.questionData[1][2] * (-1), returnObject.questionData[1][3] * (-1)];
        let reason = String.raw`\small{{{\text{R}}_{\text{${2}}}}\to {{\text{R}}_{\text{${2}}}} \times(-1)}`;
        let rowData = returnObject.questionData;
        returnObject.latexArray.push(String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${rowData[0][0]} & ${rowData[0][1]} & ${rowData[0][2]} \\${rowData[1][0]} & ${rowData[1][1]} & ${rowData[1][2]} \\${rowData[2][0]} & ${rowData[2][1]} & ${rowData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${rowData[0][3]} \\${rowData[1][3]} \\${rowData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + reason);
        return returnObject.questionData[1][1] === 1 ? returnObject : fourthStep(returnObject);
    }
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
        returnObject.latexArray.push(latex_data);
        returnObject.questionData = new_questionData;
        console.log(possibility);
    }
    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    if (returnObject.questionData[1][1] === -1) {
        return fourthStep(returnObject);
    }
    return returnObject;
}
export default fourthStep;