//import mathExpressionEvaluator from 'https://cdn.skypack.dev/math-expression-evaluator';
import mathExpressionEvaluator from '../abc.js';
const STEP3 = (leftRightSide) => {
  /*
   * Iterative will take first parameter as varAndValue and it will me in the following form
   * varAndValue = [{var : "x",  value:"0"},{var : "y",  value:"0"},{var : "z",  value:"0"}]
   * Initally the value is set to 0 in the iterative method
   *
   * Second parameter is the final latex that it will add upon to insert to other iterations
   *
   * Third parameter is the leftRightSide, which contains all variable names and values including the denominator to
   * build latex
   *
   */
    const operations = [];
    leftRightSide.map((d)=>{
        operations.push(`(${d.rightSide.rightSide.reduce((a,b)=>a+b,"")})/${d.rightSide.denom}`
            .replace(/([A-Za-z])/g,"($1)")
        );
    });
  let value = Iterative(
    [
      { var: leftRightSide[0].leftSide[0], value: 0 },
      { var: leftRightSide[1].leftSide[0], value: 0 },
      { var: leftRightSide[2].leftSide[0], value: 0 },
    ],
    "",
    leftRightSide,
    operations
  );
  return {
    finalLatex: value.iterationsFinalLatex,
    finalValues: [{ x: 1 }, { y: 2 }, { z: 3 }],
  };
};
/*
 *
 * Iterative function takes paramter in following format
 * varAndValue = [{var : "x",  value:"0"},{var : "y",  value:"0"},{var : "z",  value:"0"}]
 * iterationsFinalLatex = ""
 * leftRightSide is an array of leftSide and rightSide object i.e 
 * leftRightSide = {
 *                leftSide : [], 
 *                rightSide : {
 *                       rightSide : [],
 *                       denom : Number
 *               }
 *       }
 */

const Iterative = (varAndValue, iterationsFinalLatex, leftRightSide,operations) => {
    operations.map((d,i)=>{
    varAndValue[i].value =Number.parseFloat(mathExpressionEvaluator.eval(d.replace(new RegExp(`${varAndValue[0].var}`),`${varAndValue[0].value}`)
                 .replace(new RegExp(`${varAndValue[1].var}`),`${varAndValue[1].value}`)
                 .replace(new RegExp(`${varAndValue[2].var}`),`${varAndValue[2].value}`)).toFixed(3));
    });
    
    console.log(varAndValue);
   //Recursion if any of them becomes a non integer i.e a float value
  if(varAndValue[0].value % 1 !== 0  || varAndValue[1].value % 1 !==0 || varAndValue[2].value % 1 !== 0) {
  return Iterative(varAndValue,iterationsFinalLatex,leftRightSide,operations);
  } else {
  // Return the finalized value if all are integer
      return {
         iterationsFinalLatex : iterationsFinalLatex,
        varAndValue : varAndValue
       }
   }
};

export default STEP3;
