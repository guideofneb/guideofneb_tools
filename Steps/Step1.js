import { findGCD, levelOnePossibleCases, levelTwoPossibleCases } from '../Shared/Operations.js';
import { ROW, OPERATIONTYPE } from '../Shared/Operations.js';
// In the first step, we will try to make A11 as 1
const firstStep = ({ latexArray, questionData }) => {
    let reason;
    let returnObject = {
        latexArray: latexArray,
        questionData: questionData
    };
    // If the A11 has (NEGATIVE VALUE) then it will be simply converted to (POSITIVE) by multiplying with (-1)
    if (returnObject.questionData[0][0] === -1) {
        returnObject.questionData[0] = [returnObject.questionData[0][0] * (-1), returnObject.questionData[0][1] * (-1), returnObject.questionData[0][2] * (-1), returnObject.questionData[0][3] * (-1)];
        reason = String.raw`\small{{{\text{R}}_{\text{${1}}}}\to {{\text{R}}_{\text{${1}}}} \times(-1)}`;
        let rowData = returnObject.questionData;
        returnObject.latexArray.push(String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${rowData[0][0]} & ${rowData[0][1]} & ${rowData[0][2]} \\${rowData[1][0]} & ${rowData[1][1]} & ${rowData[1][2]} \\${rowData[2][0]} & ${rowData[2][1]} & ${rowData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${rowData[0][3]} \\${rowData[1][3]} \\${rowData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + reason);
        return firstStep(returnObject);
    }

    // If it's -1 then above if statement will run, else for every value that's not 1, we will make it 1 in the if
    // statement below

    if (returnObject.questionData[0][0] !== 1) {
        let possibility = null;
        function returnAPossibilitiy() {
            let allPossibilities = [];
            // We'll find GCD with each row, coz if there is a GCD other than 1, then we won't use that row
            let get_GCD_of_A11_and_A21 = findGCD(returnObject.questionData[0][0], returnObject.questionData[1][0]);
            let get_GCD_of_A11_and_A31 = findGCD(returnObject.questionData[0][0], returnObject.questionData[2][0]);

            // Testing the level 1 possibilities and returning the smalles value comparing operations with Two ROWS R2 and R3
            if (get_GCD_of_A11_and_A21 === 1 || get_GCD_of_A11_and_A31 === 1) {

                let firstPossibility = [];
                let secondPossibility = [];
                if (get_GCD_of_A11_and_A21 === 1) {
                    firstPossibility = levelOnePossibleCases(returnObject.questionData[0][0], returnObject.questionData[1][0], ROW.R2);
                }
                if (get_GCD_of_A11_and_A31 === 1) {
                    secondPossibility = levelOnePossibleCases(returnObject.questionData[0][0], returnObject.questionData[2][0], ROW.R3)
                }
                if (firstPossibility.length !== 0 && secondPossibility.length !== 0) {
                    return firstPossibility[0].value[0] < secondPossibility[0].value[0] ? firstPossibility : secondPossibility;
                } else {
                    return firstPossibility.length === 0 ? secondPossibility : firstPossibility;
                }
            }




            // TEST ALL LEVEL-1 POSSIBILITIES AND RETURN IT FROM (R1 and R3)
            if (get_GCD_of_A11_and_A31 === 1) {
                let solvedCase = levelOnePossibleCases(returnObject.questionData[0][0], returnObject.questionData[2][0])
                allPossibilities.push(...solvedCase);
                if (solvedCase.length !== 0) {
                    return solvedCase;
                }
            }

            // TEST ALL THE LEVEL-2 POSSIBILITIES AND RETURN IT FROM (R1 and R2)
            if (get_GCD_of_A11_and_A21 === 1) {
                let solvedCase = levelTwoPossibleCases(returnObject.questionData[0][0], returnObject.questionData[1][0])
                allPossibilities.push(...solvedCase);
                if (solvedCase.length !== 0) {
                    return solvedCase;
                }
            }
            // TEST ALL THE LEVEL-2 POSSIBILITIES AND RETURN IT FROM (R1 and R3)
            if (get_GCD_of_A11_and_A31 === 1) {
                let solvedCase = levelTwoPossibleCases(returnObject.questionData[0][0], returnObject.questionData[2][0])
                allPossibilities.push(...solvedCase);
                if (solvedCase.length !== 0) {
                    return solvedCase;
                }
            }
        }
        possibility = returnAPossibilitiy();
        possibility.map((data) => {
            let { noOfVariables, dealingRow, value, operationType } = data;
            let reason;
            if (noOfVariables === 1) {
                if (operationType === OPERATIONTYPE.ADD) {
                    returnObject.questionData[0] = [
                        returnObject.questionData[0][0] + (value[0] * returnObject.questionData[dealingRow - 1][0]),
                        returnObject.questionData[0][1] + (value[0] * returnObject.questionData[dealingRow - 1][1]),
                        returnObject.questionData[0][2] + (value[0] * returnObject.questionData[dealingRow - 1][2]),
                        returnObject.questionData[0][3] + (value[0] * returnObject.questionData[dealingRow - 1][3]),
                    ]
                } else {
                    returnObject.questionData[0] = [
                        returnObject.questionData[0][0] - (value[0] * returnObject.questionData[dealingRow - 1][0]),
                        returnObject.questionData[0][1] - (value[0] * returnObject.questionData[dealingRow - 1][1]),
                        returnObject.questionData[0][2] - (value[0] * returnObject.questionData[dealingRow - 1][2]),
                        returnObject.questionData[0][3] - (value[0] * returnObject.questionData[dealingRow - 1][3]),
                    ]
                }
                reason = String.raw`\small{{{\text{R}}_{\text{1}}\to {{\text{R}}_{\text{1}}} ${OPERATIONTYPE.ADD ? `+` : '-'} (${value[0]}){{\text{R}}_{\text{${dealingRow}}}}}}`;
            } else {
                if (operationType === OPERATIONTYPE.ADD) {
                    returnObject.questionData[0] = [
                        (value[0] * returnObject.questionData[0][0]) + (value[1] * returnObject.questionData[dealingRow - 1][0]),
                        (value[0] * returnObject.questionData[0][0]) + (value[1] * returnObject.questionData[dealingRow - 1][1]),
                        (value[0] * returnObject.questionData[0][0]) + (value[1] * returnObject.questionData[dealingRow - 1][2]),
                        (value[0] * returnObject.questionData[0][0]) + (value[1] * returnObject.questionData[dealingRow - 1][3]),
                    ]
                } else {
                    returnObject.questionData[0] = [
                        (value[0] * returnObject.questionData[0][0]) - (value[1] * returnObject.questionData[dealingRow - 1][0]),
                        (value[0] * returnObject.questionData[0][0]) - (value[1] * returnObject.questionData[dealingRow - 1][1]),
                        (value[0] * returnObject.questionData[0][0]) - (value[1] * returnObject.questionData[dealingRow - 1][2]),
                        (value[0] * returnObject.questionData[0][0]) - (value[1] * returnObject.questionData[dealingRow - 1][3]),
                    ]
                }
                reason = String.raw`\small{{{\text{R}}_{\text{1}}\to (${value[0]}){{\text{R}}_{\text{1}}}+(${value[1]}){{\text{R}}_{\text{${dealingRow - 1}}}}}}`;
            }
            let rowData = returnObject.questionData;
            returnObject.latexArray.push(String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${rowData[0][0]} & ${rowData[0][1]} & ${rowData[0][2]} \\${rowData[1][0]} & ${rowData[1][1]} & ${rowData[1][2]} \\${rowData[2][0]} & ${rowData[2][1]} & ${rowData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${rowData[0][3]} \\${rowData[1][3]} \\${rowData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + reason);
            return returnObject;
        });

    }
    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;
}

export default firstStep;