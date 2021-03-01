import { findGCDForFour } from '../Shared/Operations.js';
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

export default fundamentalStep;