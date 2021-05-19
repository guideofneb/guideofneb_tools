import * as ERRORS from './errors.ts';
import {GaussSiedelQuestionParserType} from '../types.d.ts';

// Takes GuassSiedelQuestionParser object which is an object of questions and returns all the possible variables
const grabAllVariables = (question : GaussSiedelQuestionParserType) : string[] =>{
    // Sets, so that that same variable dont get inserted 
    const allVars = new Set();
    // Iterate over the question object
    for (const eq in question){
        // Grab the leftVars array from the parsedEquation add all its variables to the allVars set
        question[eq as keyof GaussSiedelQuestionParserType].leftVars.map((SignCoeffAndVar : string)=>{
            // Regex used here to match only the variable out of the SignCoeffAndVar
            allVars.add((SignCoeffAndVar.match(/[A-Za-z]/) ?? [""])[0] );
        });
    }
    // Converts the set into array and returns it
    const returnArray = Array.from(allVars).sort();
    if(returnArray.length === 3) {
       return Array.from(allVars).sort() as string[]
    }else{
        throw ERRORS.THREE_UNIQUE_VARS_NOT_FOUND;
    }
}

export default grabAllVariables;
