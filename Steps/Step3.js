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
export default thirdStep;