// import findGCDForFour from './shared_functions.js';
import { findGCDForFour } from './shared_functions.js';
// Fundamental step is the starting step, it reduces all the rows to the smallest possible
// by dividng each row with its own GCD
const fundamentalStep = (questionData) => {
    let reason = [];
    let returnObject = {
        latexArray: [],
        questionData: questionData
    };

    for (let row = 0; row < 3; row++) {
        let GCD = findGCDForFour(returnObject.questionData[row][0], returnObject.questionData[row][1], returnObject.questionData[row][2], returnObject.questionData[row][3]);
        if (GCD != 0 && GCD > 1) {
            returnObject.questionData[row] = [returnObject.questionData[row][0] / GCD, returnObject.questionData[row][1] / GCD, returnObject.questionData[row][2] / GCD, returnObject.questionData[row][3] / GCD]
            reason.push(String.raw`\small{{{\text{R}}_{\text{${row + 1}}}}\to \dfrac{{{\text{R}}_{\text{${row + 1}}}}}{${GCD}}}`);
        }

    }
    if (reason.length != 0) {
        let commaValue = String.raw`\text{, }`;
        let rowData = returnObject.questionData;
        let combinedReason = String.raw` `;
        reason.map((data, index) => {

            combinedReason = combinedReason + data + (index === (reason.length - 1) ? String.raw`` : commaValue);

        })
        returnObject.latexArray.push(String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${rowData[0][0]} & ${rowData[0][1]} & ${rowData[0][2]} \\${rowData[1][0]} & ${rowData[1][1]} & ${rowData[1][2]} \\${rowData[2][0]} & ${rowData[2][1]} & ${rowData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${rowData[0][3]} \\${rowData[1][3]} \\${rowData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + combinedReason);
    }
    return returnObject;
}

// In the first step, we will try to make A11 as 1
const firstStep = ({ latexArray, questionData }) => {
    let reason;
    let returnObject = {
        latexArray: latexArray,
        questionData: questionData
    };

    // If the A11 has -1 then it will be simply converted to 1 by multiplying with -1
    if (returnObject.questionData[0][0] === -1) {
        returnObject.questionData[0] = [returnObject.questionData[0][0] * (-1), returnObject.questionData[0][1] * (-1), returnObject.questionData[0][2] * (-1), returnObject.questionData[0][3] * (-1)];
        reason = String.raw`\small{{{\text{R}}_{\text{${1}}}}\to {{\text{R}}_{\text{${1}}}} \times(-1)}`;
        let rowData = returnObject.questionData;
        returnObject.latexArray.push(String.raw`\sim \text{ }\left| \text{ }\begin{matrix}${rowData[0][0]} & ${rowData[0][1]} & ${rowData[0][2]} \\${rowData[1][0]} & ${rowData[1][1]} & ${rowData[1][2]} \\${rowData[2][0]} & ${rowData[2][1]} & ${rowData[2][2]} \\ \end{matrix}\text{ }\begin{matrix}: \\: \\: \\ \end{matrix} \right.\text{ }\left. \begin{matrix}${rowData[0][3]} \\${rowData[1][3]} \\${rowData[2][3]} \\ \end{matrix}\text{ } \right|\text{ }` + reason);
        return returnObject;
    }

    // If it's -1 then above if statement will run, else for every value that's not 1, we will make it 1 in the if
    // statement below
    if (returnObject.questionData[0][0] !== 1) {
        // R1 -> R1 + xR2 or R1 -> R1 - xR2, here R1 is to be made 1
        return returnObject;
    }
    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;
}

const secondStep = (returnObject) => {
    if (questionData[1][0] !== 0) {
        let reason = [];
        let returnObject = {
            latexArray: latexArray,
            questionData: questionData
        };
        return returnObject;
    }
    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;
}

const thirdStep = (returnObject) => {
    if (questionData[2][0] !== 0) {
        let reason = [];
        let returnObject = {
            latexArray: latexArray,
            questionData: questionData
        };
        return returnObject;
    }
    // If the A11 equals to 1 then, simply pass on the returnObject to another step
    return returnObject;
}


const fourthStep = (returnObject) => {
    if (questionData[1][1] !== 1) {

    }
    return returnObject;
}


export { fundamentalStep, firstStep, secondStep, thirdStep, fourthStep };