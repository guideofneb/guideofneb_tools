import { GaussSiedelQuestionParser } from "./shared/GuassSiedelQuestionParser.js";
import grabAllVariables from "./shared/grabAllVariables.js";
import STEP1 from "./steps/step1.js";
import STEP2 from "./steps/step2.js";
import STEP3 from './steps/step3.js';
// It takes question in raw form
// Eg. gauss_siedel_solve(""2x+10y=-19","10z+2y+x=5","30x+10y+z=-1")
export const gauss_siedel_solve = (equation1, equation2, equation3) => {
  const parsedGuassSiedelQuestion = new GaussSiedelQuestionParser(
    equation1,
    equation2,
    equation3
  );
  const allVariables = grabAllVariables(parsedGuassSiedelQuestion);
  let finalLatex = String.raw`
    \begin{aligned}
    &\text{Let the given equations be, }\\[3pt] 
    &\begin{aligned}
    `;
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
  finalLatex += STEP2Resolved.finalLatex;

  const STEP3Resolved = STEP3(STEP2Resolved.leftRightSide);
  finalLatex += STEP3Resolved.finalLatex;


  finalLatex += String.raw`\end{aligned}`;
  return finalLatex;
};
console.log(gauss_siedel_solve("20x+y-2z=17","3x+20y-z=-18", "2x-3y+20z=25"));
