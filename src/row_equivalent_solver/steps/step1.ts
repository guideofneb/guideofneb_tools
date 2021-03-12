
// Step 0 is all about reducing the rows to the lowest possible value
// by dividing each row with their own GCD(Greatest Common Divisor)
import { RowOperationData, LatexAndQuestionData, ROW, } from '../shared/constants';
import { negOnetoPosOne, twoVariableOperation } from '../shared/operations';
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

        }
    }
    console.log(input_data);
    return input_data;
}
export default Step0;