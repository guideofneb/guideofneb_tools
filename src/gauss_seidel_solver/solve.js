import { GaussSiedelQuestionParser } from "./shared/GuassSiedelQuestionParser.js";
import grabAllVariables from "./shared/grabAllVariables.js";
import STEP1 from "./steps/step1.js";
import STEP2 from "./steps/step2.js";

// It takes question in raw form
// Eg. gauss_siedel_solve(""2x+10y=-19","10z+2y+x=5","30x+10y+z=-1")
// It will return a raw string of latex that is the solved solution with process
export const gauss_siedel_solve = (equation1, equation2, equation3) => {
  //Converts the raw equations into parsed Equation
  const parsedGuassSiedelQuestion = new GaussSiedelQuestionParser(
    equation1,
    equation2,
    equation3
  );
  //Extracts all the unique variables from 3 equations
  const allVariables = grabAllVariables(parsedGuassSiedelQuestion);
  //Beginning phase of the final latex
  let finalLatex = String.raw`
    \begin{aligned}
    &\text{Let the given equations be, }\\[3pt] 
    &\begin{aligned}
    `;

  //STEP1{START}
  //This will return an array of object that contains latex and leftVars and rightConstant
  const step1Result = STEP1(parsedGuassSiedelQuestion, allVariables);
  let leftVarAndRightConst = [];
  //Add all the latex in the array in the latex to show the first step solved
  step1Result.map((d) => {
    //Add to the previous one with latex
    finalLatex += d.latex;
      leftVarAndRightConst.push(d.leftVarAndRightConst);
  });
  //Add last latex of the first step
  finalLatex += String.raw`\end{aligned}\\`;
  //STEP1_LATEX{END}
    console.log(leftVarAndRightConst);


  //STEP2{START}
    
  //STEP2{START}
  


  


  //Ending phase of the final latex
  finalLatex += String.raw`
  \end{aligned}`;
  return finalLatex;
};

console.log(gauss_siedel_solve("2x+10y=20", "10x+z+y=50", "10y+20z=-x"));
