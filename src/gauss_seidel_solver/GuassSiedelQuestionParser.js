import {makeItStandard} from './OneDegreeEquationStandardizer/oneDegreeEquationStandardizer.min.js';
class ParsedEquation{
    parsedEq;
    constructor(rawEqn){
    this.parsedEq = makeItStandard(rawEqn);
    }
}
// Takes three RawEquation String and converts them into parsed equation using the makeitstandard function
export class GaussSiedelQuestionParser{
    equation1;
    equation2;
    equation3;
    constructor(rawEq1,rawEq2,rawEq3){
        this.equation1  = new ParsedEquation(rawEq1);
        this.equation2  = new ParsedEquation(rawEq2);
        this.equation3  = new ParsedEquation(rawEq3);
    }
}


