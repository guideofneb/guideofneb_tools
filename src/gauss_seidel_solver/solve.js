import { GaussSiedelQuestionParser } from "./shared/GuassSiedelQuestionParser.js";
import grabAllVariables from "./shared/grabAllVariables.js";
import STEP1 from "./steps/step1.js";

/*
Example of Guass Siedel Question that needs to be passed i.e object of GaussSiedelQuestionParser should be passed inside gauss_siedel_solve
and rawstring of three equations should be passied inside GaussSiedelQuestionParser
const gaussSiedelQuestion = new GaussSiedelQuestionParser(
  "10z+2y=30",
  "x+5y+z=10",
  "20x=50"
)
Takes three Raw String of equations and converts it to parsed Equation
 */

const gaussSiedelQuestion = new GaussSiedelQuestionParser(
  "-10x=30-2z",
  "-10y=10",
  "+20z=50-2343"
);
export const gauss_siedel_solve = (question) => {
  const allVariables = grabAllVariables(gaussSiedelQuestion);
  let step1Latex = String.raw`\begin{aligned} &\text{Let the given equations be, }\\[3pt] &\begin{aligned}`;
  const step1Result = STEP1(question, allVariables);
  step1Result.map((d) => {
    step1Latex += d.latex;
  })
  step1Latex += String.raw`\end{aligned}\\ \end{aligned}`;
  return step1Latex;
};

console.log(gauss_siedel_solve(gaussSiedelQuestion));
