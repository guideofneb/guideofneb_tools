/*

Step 4 is about making A22 as 1 with its operations with R3 or by itself

*/


import { LatexAndQuestionData, ROW, RowOperationData } from '../shared/constants.ts';
import { twoVariableOperation, twoVariableOperationRowOperation, negOnetoPosOne, oneByDividingWithItself } from '../shared/operations.ts';
const Step4 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    let questionData = [...input_data.questionData];
    let rowoperationdata: RowOperationData;
    if (questionData[1][1] !== 1) {
        if (questionData[1][1] === -1) {
            // Pushes new RowOperationData to the latex array
            rowoperationdata = negOnetoPosOne(questionData, ROW.R2);
            // Updates the latest questionData
            input_data.questionData = rowoperationdata.mutated_row;
        } else {
            // Get tuple of x and y from operation of R2 with R3 and store as Xrow1 and Yrow2 respectively
            const [Xrow2, Yrow3] = twoVariableOperation(1, questionData[1][1], questionData[2][2]);
            let conditionR2R3 = (Math.abs(Xrow2) === 1 || Math.abs(Yrow3) === 1) && (Math.abs(Xrow2) % 1 === 0 && Math.abs(Yrow3) % 1 === 0);
            if (conditionR2R3) {
                rowoperationdata = twoVariableOperationRowOperation([Xrow2, Yrow3], ROW.R2, ROW.R3, questionData);
            } else { // Divide by itself i.e by A22
                rowoperationdata = oneByDividingWithItself(questionData, ROW.R2);
            }
        }
    } else {
        rowoperationdata = oneByDividingWithItself(questionData, ROW.R2);
    }
    input_data.latex_array.push(rowoperationdata);
    input_data.questionData = rowoperationdata.mutated_row;
    return input_data;
}
export default Step4;
