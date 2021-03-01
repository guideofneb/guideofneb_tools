import { ZeroMaker, OPERATIONTYPE, ROW, ZeroProductionLatexDataAndQuestionData } from '../Shared/Operations.js';

const secondStep = ({ latexArray, questionData }) => {
    let returnObject = {
        latexArray: latexArray,
        questionData: questionData,
    };
    if (questionData[1][0] !== 0) {
        let possibility = [];
        possibility.push(...ZeroMaker(questionData[1][0]));
        const [question_data, latex_data] = ZeroProductionLatexDataAndQuestionData(
            possibility[0].operationType,
            possibility[0].value, ROW.R2,
            possibility[0].dealingRow,
            returnObject.questionData);
        returnObject.latexArray.push(latex_data);
        returnObject.questionData = question_data;
    }
    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;

}
export default secondStep;