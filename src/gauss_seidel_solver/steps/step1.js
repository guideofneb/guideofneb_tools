import addMissingVars from "../shared/addMissingVars.js";
import EquationProcessLatex from "../shared/equationProcessLatex.js";
// Step1 basically takes two things,
// 1 => It takes the question which is parsed using gauss siedel parser and it contains
// the equation solved in latex form and leftvars and right constant (question)
// 2 => It takes all the variables that are present in all three equations (_allVars)
//
// This function will return an array of three object that contains latex, final leftVars and rightConstant of each equation
const STEP1 = (question, _allVars) => {
  //All three latex equations steps will be kept in this array
  let Step1LatexArrayLeftVarsAndRightConst = [];
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
      latex: String.raw`${EquationProcessLatex(
        EquationStepsLatex,
        equationNo
      )}`,
      leftVarAndRightConst: {
        leftVars: finalizedVars,
        rightConstant: question[eq].parsedEq.rightConstant,
      },
    });
    //Increment the equationNo so that it can be passed into EquationProcessLatex function and it can label the equation
    equationNo++;
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
  let dominantArray = [null, null, null];
  allLeftVars.map((leftVarsArray, index) => {
    // Get the absolute value of the coefficient and it the coefficient is not present it means 1 is there
    // abs0 => Absolute value of Coefficient first i.e coefficient of x in x + y + z = 20
    // abs1 => Absolute value of Coefficient second i.e coefficient of y in x + y + z = 20
    // abs2 => Absolute value of Coefficient third i.e coefficient of z in x + y + z = 20
    let abs0 = parseInt((leftVarsArray[0].match(/[0-9]{1,}/) ?? [1])[0])
    let abs1 = parseInt((leftVarsArray[1].match(/[0-9]{1,}/) ?? [1])[0])
    let abs2 = parseInt((leftVarsArray[2].match(/[0-9]{1,}/) ?? [1])[0])
    //If the absolute value of coefficent of first is greater than equal to sum of absolute value of coefficent of second and third then its at first 
    if (abs0 >= (abs1 + abs2)) {
      dominantArray[0] = index;
    }
    //If the absolute value of coefficent of second is greater than equal to sum of absolute value of coefficent of first and third then its at first 
    if (abs1 >= (abs0 + abs2)) {
      dominantArray[1] = index;
    }
    //If the absolute value of coefficent of third is greater than equal to sum of absolute value of coefficent of first and second then its at first 
    if (abs2 >= (abs0 + abs1)) {
      dominantArray[2] = index;
    }
  });
  // Convert array into a set and store only unique value and check for length, if length is less than 3 then it means its not diagonally
  // dominant and throws error "Not Diagonally Dominant"
  const dominantArraySET = new Set();
  dominantArray.map((indexes) => {
    dominantArraySET.add(indexes);
  });
  // Reassign dominant array to the unique index array
  dominantArray = Array.from(dominantArraySET).filter((e)=> e !== null);
  if (dominantArray.length === 3) {
    // Change the order of "Step1LatexArrayLeftVarsAndRightConst" such that diagonally dominant form is present from the index of the elements in
    // the array "dominantArray"
    Step1LatexArrayLeftVarsAndRightConst = dominantArray.map(
      (equationIndex,index) => {
        //Fixing the equationNumbering
        const tobeReturnedLatexAndVarArray = Step1LatexArrayLeftVarsAndRightConst[equationIndex];
        const _equationNo  = index + 1;
        const equationNum =
        _equationNo === 1
        ? `i`
        : _equationNo === 2
        ? `ii`
        : _equationNo === 3
        ? `iii`
        : ``;
        tobeReturnedLatexAndVarArray.latex = tobeReturnedLatexAndVarArray.latex.replace(/\([i]{3}\)/,String.raw`(${equationNum})`)
       return tobeReturnedLatexAndVarArray;
      }
    );
  } else {
    //If not diagonally dominant then just throw an error stating "Not Diagonally Dominant"
    throw "Not Diagonally Dominant";
  }
  return Step1LatexArrayLeftVarsAndRightConst;
};
export default STEP1;
