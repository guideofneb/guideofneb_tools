import { GaussSiedelQuestionParser } from "./GuassSiedelQuestionParser.js";
import grabAllVariables from "./grabAllVariables.js";
import addMissingVars from "./addMissingVars.js";
import EquationProcessLatex from "./equationProcessLatex.js";

// Takes three Raw String of equations and converts it to parsed Equation
const gaussSiedelQuestion = new GaussSiedelQuestionParser(
  "10x+2y=30",
  "x+5y+z=10",
  "10z=50"
);
const allVariables = grabAllVariables(gaussSiedelQuestion);

const STEP1 = (question, _allVars) => {
  //All three latex equations steps will be kept in this array
  const Step1LatexArrayLeftVarsAndRightConst = []
  //Set the equation no that is currently being iterated initially at 1
  let equationNo = 1;
  //Iterate over all the parsed equations in the Question
  for (const eq in question) {
    //Set the equation steps empty initially
    const EquationStepsLatex = [];
    //First step is going to be the question that is being enterd by the question and it is the index 0 of the latex array
    EquationStepsLatex.push(question[eq].parsedEq.latexArray[0]);
    if (
      question[eq].parsedEq.latexArray[1] !==
      question[eq].parsedEq.latexArray[0]
    ) {
      EquationStepsLatex.push(question[eq].parsedEq.latexArray[1]);
    }
    if (
      question[eq].parsedEq.latexArray[2] !==
      question[eq].parsedEq.latexArray[1]
    ) {
      EquationStepsLatex.push(question[eq].parsedEq.latexArray[2]);
    }
    const finalizedVars = addMissingVars(
      question[eq].parsedEq.leftVars,
      _allVars
    );
    if (finalizedVars !== question[eq].parsedEq.leftVars) {
      let finalLatex = "";
      finalizedVars.map((SignCoeffAndVar) => {
        finalLatex += String.raw`${SignCoeffAndVar.replace(
          /([A-Za-z])/,
          String.raw`\text{$1}`
        )}`;
      });
      finalLatex += String.raw`=${question[eq].parsedEq.rightConstant}`;
      EquationStepsLatex.push(finalLatex);
    }
        
      //FinalVars and RightConstant data and latex of the equation processed passed
      Step1LatexArrayLeftVarsAndRightConst.push({
          latex : String.raw`&\begin{aligned}${EquationProcessLatex(EquationStepsLatex, equationNo)}\end{aligned}\\`,
          leftVarAndRightConst : {
              leftVars : finalizedVars,
              rightConstant : question[eq].parsedEq.rightConstant
          }
    });
    //Increment the equationNo so that it can be passed into EquationProcessLatex function and it can label the equation
    equationNo++
    }
    return Step1LatexArrayLeftVarsAndRightConst;
};

console.log(STEP1(gaussSiedelQuestion, allVariables));
