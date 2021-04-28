/*

Step 3 is about making A13 as 0; which is done by subtracting A13 by x times of A11

*/

import { LatexAndQuestionData, ROW } from '../shared/constants.ts';
import { makeZero } from '../shared/make_zero.ts';
const Step9 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    let questionData = input_data.questionData;
    if (questionData[0][2] !== 0) {
        let rowoperationdata = makeZero(ROW.R1, ROW.R3, questionData, questionData[0][2]);
        input_data.latex_array.push(rowoperationdata);
        input_data.questionData = rowoperationdata.mutated_row;
    }
    return input_data;
}
export default Step9;
