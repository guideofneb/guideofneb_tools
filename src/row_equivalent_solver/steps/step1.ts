
// Step 0 is all about reducing the rows to the lowest possible value
// by dividing each row with their own GCD(Greatest Common Divisor)
import { RowOperationData, LatexAndQuestionData, ROW, } from '../shared/constants';
import { negOnetoPosOne, twoVariableOperation, twoVariableOperationRowOperation } from '../shared/operations';
const Step0 = (input_data: LatexAndQuestionData): LatexAndQuestionData => {
    // creates a new array from arrays of question data
    let questionData = [...input_data.questionData];

    // Checks if the A11 is 1 or not, if it is one then it wont do any row operations
    if (questionData[0][0] !== 1) {

        // Checks if the A11 is -1 or not, if it's -1 then it will 
        if (questionData[0][0] === -1) {
            // Pushes new RowOperationData to the latex array
            input_data.latex_array.push(negOnetoPosOne(questionData, ROW.R1));
            // Updates the latest questionData
            input_data.questionData = input_data.latex_array[input_data.latex_array.length - 1].mutated_row;
        } else {
            // Get tuple of x and y from operation of R1 with R2 and store as Xrow1 and Yrow2 respectively
            const [Xrow1, Yrow2] = twoVariableOperation(1, questionData[0][0], questionData[1][0]);
            // Get tuple of x and y from operation of R1 with R2 and store as X1row1 and Y1row2 respectively            
            const [X1row1, Y1row3] = twoVariableOperation(1, questionData[0][0], questionData[2][0]);
            if (Xrow1 !== 0 && Yrow2 !== 0 && X1row1 !== 0 && Y1row3 !== 0) {
                // if true then use R1 and R2 operation else use R2 and R3 operation
                if ((Xrow1 + Yrow2) < (X1row1 + Y1row3)) {
                    let rowoperationdata = twoVariableOperationRowOperation([Xrow1, Yrow2], ROW.R1, ROW.R2, questionData);
                    input_data.latex_array.push(rowoperationdata);
                    input_data.questionData = rowoperationdata.mutated_row;
                } else {
                    let rowoperationdata = twoVariableOperationRowOperation([X1row1, Y1row3], ROW.R1, ROW.R3, questionData);
                    input_data.latex_array.push(rowoperationdata); a
                    input_data.questionData = rowoperationdata.mutated_row;
                }


            }
        }
    }
    console.log(input_data);
    return input_data;
}
export default Step0;