import { ROW, ZeroProductionLatexDataAndQuestionData, levelOnePossibleCases } from '../Shared/Operations.js';
const thirdStep = ({ latexArray, questionData }) => {
    console.log(questionData)
    let returnObject = {
        latexArray: latexArray,
        questionData: questionData,
    };
    if (questionData[2][0] !== 0) {
        let possibility = [];
        possibility.push(...levelOnePossibleCases(questionData[2][0], questionData[0][0], ROW.R1, 0));
        const [question_data, latex_data] = ZeroProductionLatexDataAndQuestionData(
            possibility[0].operationType,
            possibility[0].value, ROW.R3,
            ROW.R1,
            returnObject.questionData);
        returnObject.latexArray.push(latex_data);
        returnObject.questionData = question_data;
    }
    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;
}
export default thirdStep;