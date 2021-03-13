import { LatexAndQuestionData, ROW } from '../shared/constants';
import { twoVariableOperation, twoVariableOperationRowOperation } from '../shared/operations';
const Step2 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    let questionData = input_data.questionData;
    const [xR2, yR1] = twoVariableOperation(0, questionData[1][0], 1);
    let rowoperationdata = twoVariableOperationRowOperation([xR2, yR1], ROW.R2, ROW.R1, questionData);
    input_data.latex_array.push(rowoperationdata);
    input_data.questionData = rowoperationdata.mutated_row;
    return input_data;
}
export default Step2;