//import mathExpressionEvaluator from 'https://cdn.skypack.dev/math-expression-evaluator';
import mathExpressionEvaluator from '../math-expr_eval.js';
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
    operations,
    1
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
const Iterative = (varAndValue, iterationsFinalLatex, leftRightSide,operations,iterationNo) => {
    const varAndValueToPass = JSON.parse(JSON.stringify(varAndValue));
    operations.map((d,i)=>{
    varAndValueToPass[i].value = Number.parseFloat(mathExpressionEvaluator.eval(d.
                  replace(new RegExp(`${varAndValueToPass[0].var}`),`${varAndValueToPass[0].value}`)
                 .replace(new RegExp(`${varAndValueToPass[1].var}`),`${varAndValueToPass[1].value}`)
                 .replace(new RegExp(`${varAndValueToPass[2].var}`),`${varAndValueToPass[2].value}`)).toFixed(3));
    });

    let iterationStepsCompleteLatex = leftRightSide.map((d,i)=>{
        let oneEquation = String.raw`\hspace{8pt}&`;
        oneEquation += String.raw`\text{${d.leftSide[0]}}=`+
        String.raw`${d.rightSide.denom < 0 ? "-" : ""}\dfrac{1}{${Math.abs(d.rightSide.denom)}}`+
        String.raw`\left( ${d.rightSide.rightSide[0]}`+ 
        String.raw`${d.rightSide.rightSide[1]} ${d.rightSide.rightSide[2]}`.replace(/([A-Za-z])/g, String.raw`\text{$1}`)+ 
        String.raw`\right)`;

        oneEquation += String.raw`=`+
        String.raw`${d.rightSide.denom < 0 ? "-" : ""}\dfrac{1}{${Math.abs(d.rightSide.denom)}}`+
        String.raw`\left\{ ${d.rightSide.rightSide[0]}`+ 
        String.raw`${d.rightSide.rightSide[1]} ${d.rightSide.rightSide[2]}`
        .replace(new RegExp(`${varAndValue[0].var}`),`(${varAndValue[0].value})`)
        .replace(new RegExp(`${varAndValue[1].var}`),`(${varAndValue[1].value})`)
        .replace(new RegExp(`${varAndValue[2].var}`),`(${varAndValue[2].value})`)+
        String.raw`\right\}`;
        oneEquation += String.raw`= ${varAndValueToPass[i].value} \\ `;
        return oneEquation
    });
    iterationStepsCompleteLatex = iterationStepsCompleteLatex.reduce((a,b)=>{return a+b});
    iterationsFinalLatex += String.raw`&\begin{aligned}&`+`\\underline{\\text{Iteration : ${iterationNo}`+String.raw`}}\\`
    iterationsFinalLatex += iterationStepsCompleteLatex + String.raw`\end{aligned}\\ `;
   //Recursion if any of them becomes a non integer i.e a float value
  if(varAndValueToPass[0].value % 1 !== 0  || varAndValueToPass[1].value % 1 !==0 || varAndValueToPass[2].value % 1 !== 0) {
      iterationNo++;
     return Iterative(varAndValueToPass,iterationsFinalLatex,leftRightSide,operations,iterationNo);
  } else {
  // Return the finalized value if all are integer
      return {
         iterationsFinalLatex : iterationsFinalLatex,
        varAndValue : varAndValueToPass
       }
   }
};

export default STEP3;
