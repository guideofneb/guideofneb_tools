/*

Step 4 is about making A22 as 1 with its operations with R3 or by itself

*/


import { LatexAndQuestionData, ROW, RowOperationData } from '../shared/constants.ts';
import { negOnetoPosOne, oneByDividingWithItself } from '../shared/operations.ts';
const Step7 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    let questionData = [...input_data.questionData];
    let rowoperationdata: RowOperationData;
    if (questionData[2][2] !== 1) {
        if (questionData[2][2] === -1) {
            // Pushes new RowOperationData to the latex array
            rowoperationdata = negOnetoPosOne(questionData, ROW.R3);
        } else {
            rowoperationdata = oneByDividingWithItself(questionData, ROW.R3);
        }
        input_data.latex_array.push(rowoperationdata);
        input_data.questionData = rowoperationdata.mutated_row;
    }
    return input_data;
}
export default Step7;
