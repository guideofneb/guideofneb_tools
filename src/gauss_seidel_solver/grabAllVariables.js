
// Takes GuassSiedelQuestionParser object which is an object of questions and returns all the possible variables
const grabAllVariables = (question)=>{
    // Sets, so that only that same variable dont get inserted 
    const allVars = new Set();
    // Iterate over the question object
    for (const eq in question){
        // Grab the leftVars array from the parsedEquation add all its variables to the allVars set
        let a = question[eq].parsedEq.leftVars.map((SignCoeffAndVar)=>{
            // Regex used here to match only the variable out of the SignCoeffAndVar
            allVars.add(SignCoeffAndVar.match(/[A-Za-z]/)[0]);
        })
    }
    // Converts the set into array and returns it
    return Array.from(allVars).sort();
}

export default grabAllVariables;
