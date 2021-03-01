// SOME CONSTANTS
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

// ------------- Level-2 Posssible cases contain R(X) -> x(R(X)) + y(R(Y)) -------------------
// X = RowNumber and x = variableThatWillMakeOneOrZero
export const levelTwoPossibleCases = (toMakeOnePart, fromWhichToMakeOne, dealingROW) => {
    // R1 -> xR1 + yR2  : noOfVariables = 2 ( x and y)
    for (let i = 1; i <= 50; i++) {
        for (let j = 1; j <= 50; j++) {
            let value = (i * toMakeOnePart) + (j * fromWhichToMakeOne);
            if (value === 1) {
                foundDividingFactor.value = [i, j];
                foundDividingFactor.noOfVariables = 2;
                foundDividingFactor.dealingRow = dealingROW
                foundDividingFactor.operationType = OPERATIONTYPE.ADD
                return [foundDividingFactor];
            }
        }
    }
    // R1 -> xR1 - yR2 : noOfVariables = 2 ( x and y)
    for (let i = 1; i <= 50; i++) {
        for (let j = 1; j <= 50; j++) {
            let value = (i * toMakeOnePart) - (j * fromWhichToMakeOne);
            if (value === 1) {
                foundDividingFactor.value = [i, j];
                foundDividingFactor.noOfVariables = 2;
                foundDividingFactor.dealingRow = dealingROW
                foundDividingFactor.operationType = OPERATIONTYPE.SUBTRACT
                return [foundDividingFactor];
            }
        }
    }
    return [];
}

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


