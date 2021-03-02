// SOME CONSTANTS
const totalColumns = [0, 1, 2, 3];
export let foundDividingFactor = {
    value: null,
    noOfVariables: null,
    dealingRow: null,
    operationType: null
}
export const ROW = {
    R1: 1,
    R2: 2,
    R3: 3,
}
export const OPERATIONTYPE = {
    ADD: 0,
    SUBTRACT: 1,
    MULT: 2,
}
//  This function takes two numbers and finds the Greatest Common Divisor using the euclid algorithm
// By GCD, we mean that it's the greatest number that can divide the given two numbers a and b 
// To find the GCD of more than two numbers Eg.3 numbers; do the following
// 
// 
// let firstNumber = 20;
// let secondNumber = 30;
// let thirdNumber = 40;
// let fourthNumber = 50;
// findGCD(fourthNumber, findGCD(thirdNumber, findGCD(firstNumber, secondNumber)));
// 
export const findGCD = (a, b) => {
    if (Math.abs(a) == 0) {
        return Math.abs(b);
    }
    return findGCD(Math.abs(b) % Math.abs(a), Math.abs(a));
}
// This function finds Greatest Common Divisor for 4 numbers , it is used to find the GCD for a row in Row equivalent
export const findGCDForFour = (a, b, c, d) => {
    return findGCD(a, findGCD(b, findGCD(c, d)));
}

// -------------------------------- POSSIBLE CASES -------------------------------------------------------


//--------------- Level-1 Posssible cases contain R(X) -> R(X) + x(R(Y)) -------------------
// X = RowNumber and x = variableThatWillMakeOneOrZero
export const levelOnePossibleCases = (toMakeOnePart, fromWhichToMake, dealingROW, toMake) => {
    let value = (toMake - toMakeOnePart) / fromWhichToMake;
    // Checks for -1
    if (toMake === 1) {
        if (value % 1 !== 0) {
            value = ((-1) - toMakeOnePart) / fromWhichToMake;
        }
    }

    foundDividingFactor.value = [value !== 0 ? Math.abs(value) : value];
    foundDividingFactor.noOfVariables = 1;
    foundDividingFactor.dealingRow = dealingROW;
    foundDividingFactor.operationType = value > 0 ? OPERATIONTYPE.ADD : OPERATIONTYPE.SUBTRACT;

    return [foundDividingFactor];
}

export const levelTwoPossibleCases = (left, right, toMake) => {

}
// // ------------- Level-2 Posssible cases contain R(X) -> x(R(X)) + y(R(Y)) -------------------
// // X = RowNumber and x = variableThatWillMakeOneOrZero
// export const levelTwoPossibleCases = (toMakeOnePart, fromWhichToMakeOne, dealingROW) => {
//     // R1 -> xR1 + yR2  : noOfVariables = 2 ( x and y)
//     for (let i = 1; i <= 50; i++) {
//         for (let j = 1; j <= 50; j++) {
//             let value = (i * toMakeOnePart) + (j * fromWhichToMakeOne);
//             if (value === 1) {
//                 foundDividingFactor.value = [i, j];
//                 foundDividingFactor.noOfVariables = 2;
//                 foundDividingFactor.dealingRow = dealingROW
//                 foundDividingFactor.operationType = OPERATIONTYPE.ADD
//                 return [foundDividingFactor];
//             }
//         }
//     }
//     // R1 -> xR1 - yR2 : noOfVariables = 2 ( x and y)
//     for (let i = 1; i <= 50; i++) {
//         for (let j = 1; j <= 50; j++) {
//             let value = (i * toMakeOnePart) - (j * fromWhichToMakeOne);
//             if (value === 1) {
//                 foundDividingFactor.value = [i, j];
//                 foundDividingFactor.noOfVariables = 2;
//                 foundDividingFactor.dealingRow = dealingROW
//                 foundDividingFactor.operationType = OPERATIONTYPE.SUBTRACT
//                 return [foundDividingFactor];
//             }
//         }
//     }
//     return [];
// }

export const ZeroProductionLatexDataAndQuestionData = (operationType, value, toBe0Row, is1Row, questionData) => {
    let zeroRowIndex = toBe0Row - 1
    let isOneRowIndex = is1Row - 1;

    if (operationType === OPERATIONTYPE.ADD) {
        questionData[zeroRowIndex] = [
            questionData[zeroRowIndex][0] + (value[0] * questionData[isOneRowIndex][0]),
            questionData[zeroRowIndex][1] + (value[0] * questionData[isOneRowIndex][1]),
            questionData[zeroRowIndex][2] + (value[0] * questionData[isOneRowIndex][2]),
            questionData[zeroRowIndex][3] + (value[0] * questionData[isOneRowIndex][3]),
        ]
    } else {
        questionData[zeroRowIndex] = [
            questionData[zeroRowIndex][0] - (value[0] * questionData[isOneRowIndex][0]),
            questionData[zeroRowIndex][1] - (value[0] * questionData[isOneRowIndex][1]),
            questionData[zeroRowIndex][2] - (value[0] * questionData[isOneRowIndex][2]),
            questionData[zeroRowIndex][3] - (value[0] * questionData[isOneRowIndex][3]),
        ]
    }
    let reason = String.raw`\small{{{\text{R}}_{\text{${toBe0Row}}}\to {{\text{R}}_{\text{${toBe0Row}}}} ${OPERATIONTYPE.ADD ? `+` : '-'} (${value[0]}){{\text{R}}_{\text{${is1Row}}}}}`;
    let rowData = questionData;
    return [questionData, String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${rowData[0][0]} & ${rowData[0][1]} & ${rowData[0][2]} \\${rowData[1][0]} & ${rowData[1][1]} & ${rowData[1][2]} \\${rowData[2][0]} & ${rowData[2][1]} & ${rowData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${rowData[0][3]} \\${rowData[1][3]} \\${rowData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + reason];
}


// This function will reduce the given row to the lowest possible row by finding th GCD using findGCDForFour
// and divide all the row terms using the GCD value









// In level-2 Possible Case, we try this type of method R1 -> xR1 + yR2 OR R1 -> xR1 - yR2
// Inside this function, we'll try to provide you the value of x and y
// -------------PARAMETERS------------------
// #toMake => What you want to make (0,1 or -1); incase of R1(R1 --> Here in this region) -> xR2 + yR2;
// #left => Left is the value in the left; incase of R1 -> xR1(R1 --> here is the left) + yR2
// #right => Left is the value in the left; incase of R1 -> xR1 + yR2(R2 --> here is the right)
// #dealingRow => dealingRow is the row in the right; incase of R1 -> xR1 + yR3 (R3 is the dealingROW)
export const levelTwoPossibleCase = ({ toMake, left, right, dealingROW }) => {
    let x = 1, y;
    y = toMake - left;
    x = right;
    let gcd = findGCD(x, y);
    y = y / gcd;
    x = x / gcd;
    let isItCorrect = (x * left) + (y * right) === toMake;
    if (isItCorrect) {
        foundDividingFactor.value = [Math.abs(x), Math, abs(y)];
        foundDividingFactor.noOfVariables = 2;
        foundDividingFactor.dealingRow = dealingROW;
        foundDividingFactor.operationType = y < 0 ? OPERATIONTYPE.SUBTRACT : OPERATIONTYPE.ADD;
        return [foundDividingFactor];
    }
    return [];
}

export const levelThreePossibleCase = ({ left, dealingROW }) => {
    foundDividingFactor.value = [1 / left];
    foundDividingFactor.noOfVariables = 0;
    foundDividingFactor.dealingRow = dealingROW;
    foundDividingFactor.operationType = OPERATIONTYPE.MULT;
    return [foundDividingFactor];
}

export const OneProductionLatexDataAndQuestionData = ({ left, right, questionData, value, operationType, noOfVars }) => {
    let reason;
    let leftIndex = left - 1, rightIndex = right - 1;
    if (noOfVars === 0) {
        // If left === right it means R1 => R1 * (x) | (x can be either fraction or intenger)
        if (operationType === OPERATIONTYPE.MULT) {
            for (let columnIndex in totalColumns) {
                questionData[leftIndex][columnIndex] = questionData[leftIndex][columnIndex] * value[0];
            }
            reason = String.raw`\small{{{\text{R}}_{\text{${left - 1}}}}\to {{\text{R}}_{\text{${left - 1}}} \times (${value[0]})}}`;
        }
    } else if (noOfVars === 1) {
        if (operationType === OPERATIONTYPE.ADD) {
            for (let columnIndex in totalColumns) {
                questionData[leftIndex][columnIndex] = questionData[leftIndex][columnIndex] + (value[0] * questionData[rightIndex][columnIndex]);
            }
        } else {
            for (let columnIndex in totalColumns) {
                questionData[leftIndex][columnIndex] = questionData[leftIndex][columnIndex] - (value[0] * questionData[rightIndex][columnIndex]);
            }
        }
        reason = String.raw`\small{{{\text{R}}_{\text{${left}}}\to {{\text{R}}_{\text{${left}}}} ${OPERATIONTYPE.ADD ? `+` : '-'} (${value[0]}){{\text{R}}_{\text{${right}}}}}}`;

    } else if (noOfVars === 2) {
        if (operationType === OPERATIONTYPE.ADD) {
            for (let columnIndex in totalColumns) {
                questionData[leftIndex][columnIndex] = (value[0] * questionData[leftIndex][columnIndex]) + (value[1] * questionData[rightIndex][columnIndex]);
            }
        } else {
            for (let columnIndex in totalColumns) {
                returnObject.questionData[leftIndex][columnIndex] = (value[0] * returnObject.questionData[leftIndex][columnIndex]) - (value[1] * returnObject.questionData[rightIndex][columnIndex]);
            }
            reason = String.raw`\small{{{\text{R}}_{\text{1}}\to (${value[0]}){{\text{R}}_{\text{1}}}${OPERATIONTYPE.ADD ? `+` : '-'}(${value[1]}){{\text{R}}_{\text{${dealingRow - 1}}}}}}`;
        }
    }
    return [questionData, String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${questionData[0][0]} & ${questionData[0][1]} & ${questionData[0][2]} \\${questionData[1][0]} & ${questionData[1][1]} & ${questionData[1][2]} \\${questionData[2][0]} & ${questionData[2][1]} & ${questionData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${questionData[0][3]} \\${questionData[1][3]} \\${questionData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + reason];
}
