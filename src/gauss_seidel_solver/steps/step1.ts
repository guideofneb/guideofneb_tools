import {GaussSiedelQuestionParserType, KeyOfQuestion} from '../types.d.ts';
import addMissingVars from "../shared/addMissingVars.ts";
import EquationProcessLatex from "../shared/equationProcessLatex.js";
import areArrayEqual from '../shared/areArrayEqual.ts';
import * as ERRORS from '../shared/errors.ts';
import * as TYPES from '../types.d.ts';

// This function will return an array of three object that contains latex, final leftVars and rightConstant of each equation
const STEP1 = (question : GaussSiedelQuestionParserType, _allVars : string[]) => {
  //All three latex equations steps will be kept in this array and step1 will return this as its function return 
  let Step1LatexArrayLeftVarsAndRightConst : TYPES.STEP1 = []
  //Iterate over all the parsed equations in the Question
  for (const eq in question) {
  // Destructure the first item of question
  const {latexArray, leftVars , rightConstant} = question[eq as KeyOfQuestion];
    // Set the equation steps empty initially
    const EquationStepsLatex : string[]= [];
    // First element of EquationStepsLatex is going to be the question that is being enterd by the user and it is the index 0 of the latex array
    EquationStepsLatex.push(question[eq as KeyOfQuestion].latexArray[0]);
    // If second element is not same as first element then add it to the EquationStepsLatex
    if (latexArray[1] !== latexArray[0]) {
      EquationStepsLatex.push(latexArray[1]);
    }
    // Similarly, if second element is not same as first element then add it to the EquationStepsLatex
    if (latexArray[2] !== latexArray[1]) {
      EquationStepsLatex.push(latexArray[2]);
    }
    // Adds missing variables or aligns the array such that its arranged acoridng to the _allVars
    const finalizedVars : string[] = addMissingVars(leftVars, _allVars);
    // If leftVars and finalizedVars array aren't same then create a latex that basically means its arranged from previous state
    if (!areArrayEqual(finalizedVars,leftVars)) {
      let finalLatex = "";
      finalizedVars.map((SignCoeffAndVar) => {
        finalLatex += String.raw`${SignCoeffAndVar.replace(
          /([A-Za-z])/,
          String.raw`\text{$1}`
        )}`;
      });
      finalLatex += String.raw`=${rightConstant}`;
      EquationStepsLatex.push(finalLatex);
    }
    //finalVars and rightConstant data and latex of the equation processed passed to the final array that is used to return
    Step1LatexArrayLeftVarsAndRightConst.push({
      latex: String.raw`${EquationProcessLatex(EquationStepsLatex)}`,
      leftVarAndRightConst: {
        leftVars: finalizedVars,
        rightConstant: rightConstant,
      },
    });
  }


  /*
   * Align Step1LatexArrayLeftVarsAndRightConst in diagonal dominant form
   * What we'll do is store all the leftVars array in a array as "allLeftVars"
   * We'll build an array called "dominantArray" and store all indices of the allLeftVars that is diagonally dominant
   */
  const allLeftVars = [
    Step1LatexArrayLeftVarsAndRightConst[0].leftVarAndRightConst.leftVars,
    Step1LatexArrayLeftVarsAndRightConst[1].leftVarAndRightConst.leftVars,
    Step1LatexArrayLeftVarsAndRightConst[2].leftVarAndRightConst.leftVars,
  ];
  let dominantArray : number[] = [-1, -1, -1];
  allLeftVars.map((leftVarsArray,index) => {
    // Get the absolute value of the coefficient and it the coefficient is not present it means 1 is there
    // abs0 => Absolute value of Coefficient first i.e coefficient of x in x + y + z = 20
    // abs1 => Absolute value of Coefficient second i.e coefficient of y in x + y + z = 20
    // abs2 => Absolute value of Coefficient third i.e coefficient of z in x + y + z = 20
    const abs0 = parseInt((leftVarsArray[0].match(/[0-9]{1,}/) ?? ["1"])[0]);
    const abs1 = parseInt((leftVarsArray[1].match(/[0-9]{1,}/) ?? ["1"])[0]);
    const abs2 = parseInt((leftVarsArray[2].match(/[0-9]{1,}/) ?? ["1"])[0]);
    //If the absolute value of coefficent of first is greater than equal to sum of absolute value of coefficent of second and third then its at first
    if (abs0 > abs1 + abs2) {
      dominantArray[0] = index;
    }
    //If the absolute value of coefficent of second is greater than equal to sum of absolute value of coefficent of first and third then its at first
    if (abs1 > abs0 + abs2) {
        dominantArray[1] = index 
    }
    //If the absolute value of coefficent of third is greater than equal to sum of absolute value of coefficent of first and second then its at first
    if (abs2 > abs0 + abs1) {
        dominantArray[2] = index
    }
  });
  // Convert array into a set and store only unique value and check for length, if length is less than 3 then it means its not diagonally
  // dominant and throws error "Not Diagonally Dominant"
    // Index 0 is for firstOne i.e x in x + y + z i.e all the indexes where x is dominant and same goes for Index 1 and 2
  const dominantArraySET : Set<number> = new Set();
  dominantArray.map((data) => {
    dominantArraySET.add(data);
  });
  // Reassign dominant array to the unique index array
  dominantArray = Array.from(dominantArraySET).filter((e) => e !== -1) as number[];

  if (dominantArray.length === 3) {
    // Change the order of "Step1LatexArrayLeftVarsAndRightConst" such that diagonally dominant form is present from the index of the elements in
    // the array "dominantArray"
    Step1LatexArrayLeftVarsAndRightConst = dominantArray.map(
      (equationIndex, index) => {
        //Fixing the equationNumbering
        const tobeReturnedLatexAndVarArray =
          Step1LatexArrayLeftVarsAndRightConst[equationIndex];
        const _equationNo = index + 1;
        const equationNum =
          _equationNo === 1
            ? `i`
            : _equationNo === 2
            ? `ii`
            : _equationNo === 3
            ? `iii`
            : ``;
        tobeReturnedLatexAndVarArray.latex = tobeReturnedLatexAndVarArray.latex.replace(
          /\([i]{3}\)/,
          String.raw`(${equationNum})`
        );
        return tobeReturnedLatexAndVarArray;
      }
    );
  } else {
    //If not diagonally dominant then just throw an error stating "Not Diagonally Dominant"
    throw ERRORS.NOT_DIAGONALLY_DOMINANT;
  }

  return Step1LatexArrayLeftVarsAndRightConst;
};
export default STEP1;
