import { GaussSiedelQuestionParser } from "./GuassSiedelQuestionParser.js";
import grabAllVariables from "./grabAllVariables.js";
import addMissingVars from "./addMissingVars.js";
import EquationProcessLatex from "./equationProcessLatex.js";
import STEP1 from './steps/step1.js';

// Takes three Raw String of equations and converts it to parsed Equation
const gaussSiedelQuestion = new GaussSiedelQuestionParser(
  "10z+2y=30",
  "x+5y+z=10",
  "20x=50"
);
const allVariables = grabAllVariables(gaussSiedelQuestion);

console.log(STEP1(gaussSiedelQuestion, allVariables));
