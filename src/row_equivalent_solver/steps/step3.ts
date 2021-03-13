import { LatexAndQuestionData, ROW } from '../shared/constants';
import { twoVariableOperation, twoVariableOperationRowOperation } from '../shared/operations';
const Step3 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    let questionData = input_data.questionData;
    const [xR3, yR1] = twoVariableOperation(0, questionData[2][0], 1);
    let rowoperationdata = twoVariableOperationRowOperation([xR3, yR1], ROW.R3, ROW.R1, questionData);
    input_data.latex_array.push(rowoperationdata);
    input_data.questionData = rowoperationdata.mutated_row;
    return input_data;
}
export default Step3;