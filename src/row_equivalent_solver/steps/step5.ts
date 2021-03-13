/*

Step 3 is about making A13 as 0; which is done by subtracting A13 by x times of A11

*/

import { LatexAndQuestionData, ROW } from '../shared/constants';
import { twoVariableOperation, twoVariableOperationRowOperation } from '../shared/operations';
const Step5 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    let questionData = input_data.questionData;
    const [xR3, yR2] = twoVariableOperation(0, questionData[2][1], 1);
    let rowoperationdata = twoVariableOperationRowOperation([xR3, yR2], ROW.R3, ROW.R2, questionData);
    input_data.latex_array.push(rowoperationdata);
    input_data.questionData = rowoperationdata.mutated_row;
    return input_data;
}
export default Step5;