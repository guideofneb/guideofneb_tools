import GaussSiedelQuestionParser from './shared/GuassSiedelQuestionParser.ts';
import {GaussSiedelQuestionParserType} from './types.d.ts';
import GrabAllVariables from "./shared/grabAllVariables.ts";
import STEP1 from "./steps/step1.ts";
import Step2 from "./steps/step2.js";
import Step3 from './steps/step3.js';
import * as TYPES from './types.d.ts';

// It takes question in raw form
// Eg. gauss_siedel_solve(""2x+10y=-19","10z+2y+x=5","30x+10y+z=-1")
const gaussSiedelSolver = (equation1 : string, equation2 : string, equation3: string) : string => {
  // pass the raw equation to GaussSiedelQuestionParser which will return the standard form and the latex to that process
  // Condition : raw equation must have only a character variable such as "x"  or "a" not like "xa" or "pq" and they should be a valid
  // equation 
  const question : GaussSiedelQuestionParserType = GaussSiedelQuestionParser(equation1, equation2, equation3);
  //Gets all the variables 
  const allVariables : string[] = GrabAllVariables(question);
  let retLatex = String.raw`\begin{aligned} &\text{Let the given equations be, } \\[3pt] &\begin{aligned}`;

  const STEP1RES : TYPES.STEP1 = STEP1(question, allVariables);
  const leftVarAndRightConst : {leftVars : string[],rightConstant : string []}[]= [];
  STEP1RES.map((d) => {
    retLatex += d.latex;
    leftVarAndRightConst.push(d.leftVarAndRightConst);
  });
  retLatex += String.raw`\end{aligned}\\[-3pt]`;

  //Output from STEP2 is first stored in STEP2Resolved
  const Step2Res = Step2(leftVarAndRightConst)
  //The Output latex from STEP2Resolved is added to finalLatex and leftVarAndRightConst leftRightSide is passed to STEP3
  retLatex += Step2Res.finalLatex + String.raw` &\text{Initally, let ${allVariables[1]} = 0 and ${allVariables[2]} = 0}\\[3pt]`;
  const Step3Res = Step3(Step2Res.leftRightSide);
  retLatex += Step3Res.finalLatex + String.raw`&\therefore\hspace{4pt}\text{The value of }\textbf{${Step3Res.finalValues[0].var}},\space \textbf{${Step3Res.finalValues[1].var}} \text{ and  }\textbf{${Step3Res.finalValues[2].var}}\text{ are }${Step3Res.finalValues[0].value},\space ${Step3Res.finalValues[1].value} \text{ and } ${Step3Res.finalValues[2].value} \text{ respectively}. \end{aligned}`;
  return retLatex
};

export default gaussSiedelSolver;
