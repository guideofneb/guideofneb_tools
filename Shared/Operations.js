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
export const levelOnePossibleCases = (toMakeOnePart, fromWhichToMakeOne, dealingROW) => {
    for (let i = 1; i <= 250; i++) {
        let value = toMakeOnePart + (i * fromWhichToMakeOne);

        if (value === 1) {
            foundDividingFactor.value = [i];
            foundDividingFactor.noOfVariables = 1;
            foundDividingFactor.dealingRow = dealingROW;
            foundDividingFactor.operationType = OPERATIONTYPE.ADD

            return [foundDividingFactor];
        }
    }
    // R1 -> R1 - xR2   : noOfVariables = 1 (only x)
    for (let i = 1; i <= 250; i++) {
        let value = toMakeOnePart - (i * fromWhichToMakeOne);
        if (value === 1) {
            foundDividingFactor.value = [i];
            foundDividingFactor.noOfVariables = 1;
            foundDividingFactor.dealingRow = dealingROW;
            foundDividingFactor.operationType = OPERATIONTYPE.SUBTRACT
            return [foundDividingFactor];
        }
    }
    return [];
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



export const ZeroMaker = (toMakeZeroPart) => {
    for (let i = 1; i <= 250; i++) {
        let value = toMakeZeroPart + i
        if (value === 0) {
            foundDividingFactor.value = [i];
            foundDividingFactor.noOfVariables = 1;
            foundDividingFactor.dealingRow = ROW.R1;
            foundDividingFactor.operationType = OPERATIONTYPE.ADD;
            return [foundDividingFactor];
        }
    }
    // R1 -> R1 - xR2   : noOfVariables = 1 (only x)
    for (let i = 1; i <= 250; i++) {
        let value = toMakeZeroPart - i;
        if (value === 0) {
            foundDividingFactor.value = [i];
            foundDividingFactor.noOfVariables = 1;
            foundDividingFactor.dealingRow = ROW.R1;
            foundDividingFactor.operationType = OPERATIONTYPE.SUBTRACT
            return [foundDividingFactor];
        }
    }
    return [];
}

export const ZeroProductionLatexDataAndQuestionData = (operationType, value, toBe0Row, is1Row, questionData) => {
    if (operationType === OPERATIONTYPE.ADD) {
        questionData[1] = [
            questionData[toBe0Row][0] + (value[0] * questionData[is1Row][0]),
            questionData[toBe0Row][1] + (value[0] * questionData[is1Row][1]),
            questionData[toBe0Row][2] + (value[0] * questionData[is1Row][2]),
            questionData[toBe0Row][3] + (value[0] * questionData[is1Row][3]),
        ]
    } else {
        questionData[1] = [
            questionData[toBe0Row][0] - (value[0] * questionData[is1Row][0]),
            questionData[toBe0Row][1] - (value[0] * questionData[is1Row][1]),
            questionData[toBe0Row][2] - (value[0] * questionData[is1Row][2]),
            questionData[toBe0Row][3] - (value[0] * questionData[is1Row][3]),
        ]
    }
    let reason = String.raw`\small{{{\text{R}}_{\text{1}}\to {{\text{R}}_{\text{1}}} ${OPERATIONTYPE.ADD ? `+` : '-'} (${value[0]}){{\text{R}}_{\text{1}}}}`;
    let rowData = questionData;
    return [questionData, String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${rowData[0][0]} & ${rowData[0][1]} & ${rowData[0][2]} \\${rowData[1][0]} & ${rowData[1][1]} & ${rowData[1][2]} \\${rowData[2][0]} & ${rowData[2][1]} & ${rowData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${rowData[0][3]} \\${rowData[1][3]} \\${rowData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + reason];
}
// This function will reduce the given row to the lowest possible row by finding th GCD using findGCDForFour
// and divide all the row terms using the GCD value


