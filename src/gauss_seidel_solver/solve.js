import { GaussSiedelQuestionParser } from "./shared/GuassSiedelQuestionParser.js";
import grabAllVariables from "./shared/grabAllVariables.js";
import STEP1 from "./steps/step1.js";
import STEP2 from "./steps/step2.js";
import STEP3 from './steps/step3.js';
// It takes question in raw form
// Eg. gauss_siedel_solve(""2x+10y=-19","10z+2y+x=5","30x+10y+z=-1")
const gauss_siedel_solve = (equation1, equation2, equation3) => {
  // pass the raw equation to GaussSiedelQuestionParser which will return the standard form and the latex to that process
  // Condition : raw equation must have only a character variable such as "x"  or "a" not like "xa" or "pq" and they should be a valid
  // equation 
  const parsedGuassSiedelQuestion = new GaussSiedelQuestionParser(equation1, equation2, equation3);
 
  // All the variables are then extracted using "grabAllVariables" method in sorted alphabetical order
  const allVariables = grabAllVariables(parsedGuassSiedelQuestion);
  let finalLatex = String.raw`\begin{aligned} &\text{Let the given equations be, } \\[3pt] &\begin{aligned}`;
  const step1Result = STEP1(parsedGuassSiedelQuestion, allVariables);
  const leftVarAndRightConst = [];
  step1Result.map((d) => {
    finalLatex += d.latex;
    leftVarAndRightConst.push(d.leftVarAndRightConst);
  });
  finalLatex += String.raw`\end{aligned}\\[-4pt]`;
  //Output from STEP2 is first stored in STEP2Resolved
  const STEP2Resolved = STEP2(leftVarAndRightConst)
  //The Output latex from STEP2Resolved is added to finalLatex and leftVarAndRightConst leftRightSide is passed to STEP3
  finalLatex += STEP2Resolved.finalLatex + String.raw`&\text{Initally, let ${allVariables[1]} = 0 and ${allVariables[2]} = 0}\\[3pt]`;
  const STEP3Resolved = STEP3(STEP2Resolved.leftRightSide);
  finalLatex += STEP3Resolved.finalLatex + String.raw`\end{aligned}`;
  return finalLatex;
};
export default gauss_siedel_solve;
console.log(gauss_siedel_solve("5z-y+2x=12","3z+8y-2x=-25", "z+y+4x=6"));
