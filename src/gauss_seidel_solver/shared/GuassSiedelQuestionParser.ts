import makeItStandard from '../libs/oneDegreeEquationStandardizer.min.js';
import {ParsedEquationType, GaussSiedelQuestionParserType} from '../types.d.ts';

const GaussSiedelQuestionParser = (equation1 : string , equation2 : string, equation3 : string) : GaussSiedelQuestionParserType => {
    return {
        equation1 : ParsedEquation(equation1),
        equation2 : ParsedEquation(equation2),
        equation3 : ParsedEquation(equation3),
    }

}

const ParsedEquation = (equation : string) : ParsedEquationType => {
   return makeItStandard(equation);
}

export default GaussSiedelQuestionParser;

